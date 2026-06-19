// src/api/client.js

import axios from "axios";
import ENV from "@config/env";
import { ApiError } from "./apiError";

import { getAuthData, saveAuthData, clearAuthData } from "@lib/storage/storage";
import { API_ROUTES } from "@config/api.routes";

import { triggerLogout } from "@lib/events/auth.events";
import {
  triggerConnectionError,
  triggerUserBanned,
} from "@lib/events/alert.events";
import { logger } from "../lib/events/logger";

/* -------------------------------------------------------------------------- */
/*                                AXIOS CLIENTS                               */
/* -------------------------------------------------------------------------- */

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  // baseURL: "https://stopwatch-chapped-abiding.ngrok-free.dev",
  // baseURL: "https://api-mpl.ashontech.in",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Dedicated client for token refresh — intentionally bypasses the main
 * interceptor so a failing refresh never triggers another refresh loop.
 */
const refreshClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

/* -------------------------------------------------------------------------- */
/*                            REFRESH STATE CONTROL                           */
/* -------------------------------------------------------------------------- */

let isRefreshing = false;

/** @type {{ resolve: (token: string) => void; reject: (err: unknown) => void }[]} */
let failedQueue = [];

/**
 * After a refresh attempt, replay or reject every queued request.
 * Each queued entry owns its own re-dispatch — the queue only carries tokens.
 */
const processQueue = (error, token = null) => {
  const queue = [...failedQueue];
  failedQueue = [];

  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
};

/* -------------------------------------------------------------------------- */
/*                             CONNECTION DETECTOR                            */
/* -------------------------------------------------------------------------- */

let connectionErrorShown = false;

const isConnectionFailure = (err) => {
  if (!err) return false;
  const msg = String(err.message ?? "").toLowerCase();
  return (
    msg.includes("network error") ||
    msg.includes("refused") ||
    msg.includes("timeout") ||
    err.code === "ECONNABORTED" ||
    (!err.response && !!err.request)
  );
};

/* -------------------------------------------------------------------------- */
/*                            REQUEST INTERCEPTOR                             */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use(
  async (config) => {
    const auth = await getAuthData();
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    config.headers["X-Request-ID"] = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    return config;
  },
  (error) => Promise.reject(error),
);

/* -------------------------------------------------------------------------- */
/*                            RESPONSE INTERCEPTOR                            */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.response.use(
  (response) => {
    // Successful response — reset connection-error gate and unwrap data.
    connectionErrorShown = false;
    return response.data;
  },

  async (err) => {
    const originalRequest = err.config;

    if (!originalRequest) {
      return Promise.reject(err);
    }

    const status = err.response?.status;
    const responseData = err.response?.data;

    logger.error("API ERROR", {
      url: originalRequest.url,
      status,
      requestId: originalRequest.headers?.["X-Request-ID"],
    });

    /* ------------------------------------------------------------------ */
    /* 1. Network / timeout failures                                        */
    /* ------------------------------------------------------------------ */
    if (isConnectionFailure(err)) {
      if (!connectionErrorShown) {
        connectionErrorShown = true;
        triggerConnectionError();
      }
      return Promise.reject(
        new ApiError({
          status: 0,
          type: "NETWORK_ERROR",
          message: "No internet connection or server unreachable",
          originalError: err,
        }),
      );
    }

    /* ------------------------------------------------------------------ */
    /* 2. Rate limit (429)                                                 */
    /* ------------------------------------------------------------------ */
    if (status === 429) {
      const retryAfter = Number(
        err.response?.headers?.["retry-after"] ?? responseData?.retryAfter ?? 5,
      );

      return Promise.reject(
        new ApiError({
          status: 429,
          type: "RATE_LIMIT",
          message: `Too many requests. Retry in ${retryAfter}s`,
          data: { retryAfter },
          originalError: err,
        }),
      );
    }

    /* ------------------------------------------------------------------ */
    /* 3. Forbidden (403)                                                  */
    /* ------------------------------------------------------------------ */
    if (status === 403) {
      const message = responseData?.message;

      if (
        message === "User account is not active" ||
        message === "Account blocked"
      ) {
        await clearAuthData();
        triggerLogout();
      } else {
        triggerUserBanned();
      }

      return Promise.reject(
        new ApiError({
          status: 403,
          type: "FORBIDDEN",
          message: message ?? "Access denied",
          data: responseData,
          originalError: err,
        }),
      );
    }

    /* ------------------------------------------------------------------ */
    /* 4. Unauthorized (401) — token refresh with queue                   */
    /* ------------------------------------------------------------------ */
    if (status === 401) {
      // Prevent refresh loops: if the failing request was itself the
      // refresh endpoint, or we already retried this request, hard-logout.
      const isRefreshEndpoint = originalRequest.url?.includes(
        API_ROUTES.AUTH.REFRESH,
      );

      if (isRefreshEndpoint || originalRequest._retry) {
        await clearAuthData();
        triggerLogout();
        return Promise.reject(
          new ApiError({
            status: 401,
            type: "SESSION_EXPIRED",
            message: "Your session has expired. Please log in again.",
            originalError: err,
          }),
        );
      }

      originalRequest._retry = true;

      // If a refresh is already in flight, queue this request.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(apiClient(originalRequest));
            },
            reject: (refreshErr) => reject(refreshErr),
          });
        });
      }

      isRefreshing = true;

      try {
        const latestAuth = await getAuthData();

        if (!latestAuth?.refreshToken) {
          throw new ApiError({
            status: 401,
            type: "NO_REFRESH_TOKEN",
            message: "No refresh token available",
          });
        }

        const refreshResponse = await refreshClient.post(
          API_ROUTES.AUTH.REFRESH,
          { refreshToken: latestAuth.refreshToken },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // Persist both tokens — rotate refresh token if the server sends one.
        await saveAuthData(
          newAccessToken,
          latestAuth.user,
          newRefreshToken ?? latestAuth.refreshToken,
        );

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        await clearAuthData();
        triggerLogout();

        return Promise.reject(
          new ApiError({
            status: 401,
            type: "SESSION_EXPIRED",
            message: "Your session has expired. Please log in again.",
            originalError: refreshError,
          }),
        );
      } finally {
        isRefreshing = false;
      }
    }

    /* ------------------------------------------------------------------ */
    /* 5. Other 4xx client errors — surface as-is, do not retry           */
    /* ------------------------------------------------------------------ */
    if (status >= 400 && status < 500) {
      return Promise.reject(
        new ApiError({
          status,
          type: "CLIENT_ERROR",
          message:
            responseData?.message ?? `Request failed with status ${status}`,
          data: responseData,
          originalError: err,
        }),
      );
    }

    /* ------------------------------------------------------------------ */
    /* 6. 5xx server errors — single retry after brief back-off           */
    /* ------------------------------------------------------------------ */
    originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

    if (originalRequest._retryCount > 1) {
      return Promise.reject(
        new ApiError({
          status,
          type: "SERVER_ERROR",
          message:
            responseData?.message ?? "An unexpected server error occurred",
          data: responseData,
          originalError: err,
        }),
      );
    }

    // Wait 800 ms before the single retry.
    await new Promise((r) => setTimeout(r, 800));
    return apiClient(originalRequest);
  },
);

export default apiClient;
