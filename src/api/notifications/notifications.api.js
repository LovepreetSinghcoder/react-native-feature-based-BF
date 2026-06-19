// src/api/notifications/notifications.api.js
import apiClient from "@api/client";
import { API_ROUTES } from "@config/api.routes";

export const notificationsApi = {
  // ─── TOKENS ───────────────────────────────────────────
  registerToken: (data) =>
    apiClient.post(API_ROUTES.NOTIFICATIONS.TOKENS.REGISTER, data),
  // data: { token, platform, deviceName, topics? }

  updateToken: (data) =>
    apiClient.patch(API_ROUTES.NOTIFICATIONS.TOKENS.UPDATE, data),
  // data: { token, oldToken, platform, deviceName, topics? }

  removeToken: (data) =>
    apiClient.delete(API_ROUTES.NOTIFICATIONS.TOKENS.REMOVE, { data }),
  // data: { token }
  // Note: axios wraps body in { data } for DELETE requests

  // ─── TOPICS ───────────────────────────────────────────
  subscribeToTopics: (data) =>
    apiClient.post(API_ROUTES.NOTIFICATIONS.TOKENS.TOPICS.SUBSCRIBE, data),
  // data: { token, topics: [] }

  unsubscribeFromTopics: (data) =>
    apiClient.delete(API_ROUTES.NOTIFICATIONS.TOKENS.TOPICS.UNSUBSCRIBE, {
      data,
    }),
  // data: { token, topics: [] }
};
