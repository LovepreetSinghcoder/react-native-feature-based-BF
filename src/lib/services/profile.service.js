// src/services/profile/profile.service.js

import { userUpdateApi } from "@api/profile/user.api";
import { logger } from "../events/logger";

export const profileService = {
  /* -------------------------- UPDATE PROFILE -------------------------- */
  async updateProfile(data) {
    try {
      // Only send allowed fields
      const payload = {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
      };

      const res = await userUpdateApi.updateProfile(payload);

      return res; // already response.data because of interceptor
    } catch (error) {
      logger.info("Profile update error:");

      throw new Error(error?.message || "Failed to update profile");
    }
  },
};
