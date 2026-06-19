// src/api/profile/user.api.js

import apiClient from "@api/client";
import { API_ROUTES } from "@config/api.routes";

const get = (path) => apiClient.get(path);
const post = (path, data, config) => apiClient.post(path, data, config);
const put = (path, data, config) => apiClient.put(path, data, config);

export const userUpdateApi = {
  updateProfile: (data) => put(API_ROUTES.AUTH.PROFILE.UPDATE, data),
};
