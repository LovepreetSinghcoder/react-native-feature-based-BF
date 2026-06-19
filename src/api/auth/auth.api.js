// src/api/auth/auth.api.js

import apiClient from "@api/client";
import { API_ROUTES } from "@config/api.routes";

const get = (path) => apiClient.get(path);
const post = (path, data, config) => apiClient.post(path, data, config);

const del = (path) => apiClient.delete(path);

let lastCheck = 0;

export const checkServerHealth = async () => {
  if (Date.now() - lastCheck < 5000) return true;

  try {
    await apiClient.get("/");
    lastCheck = Date.now();
    return true;
  } catch {
    return false;
  }
};

export const authApi = {
  check: () => get(API_ROUTES.AUTH.CHECK),

  me: () => get(API_ROUTES.AUTH.ME),

  googleLogin: (googleIdToken) =>
    post(
      API_ROUTES.AUTH.GOOGLE.MOBILE,
      { idToken: googleIdToken },
      {
        headers: {
          Authorization: undefined,
        },
      },
    ),

  logout: () => post(API_ROUTES.AUTH.LOGOUT),

  refresh: () => post(API_ROUTES.AUTH.REFRESH),

  getProfile: () => get(API_ROUTES.AUTH.PROFILE.ME),

  setupProfile: (data) => post(API_ROUTES.AUTH.PROFILE.SETUP, data),

  setUpPreferences: (data) => post(API_ROUTES.AUTH.PROFILE.PREFERENCES, data),

  deleteAccount: () => del(API_ROUTES.AUTH.ACCOUNT_DELETE),
};
