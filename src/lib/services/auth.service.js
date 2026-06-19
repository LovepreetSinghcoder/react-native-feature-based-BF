import { saveAuthData, clearAuthData, getAuthData } from "../storage/storage";

import { authApi } from "../../api/auth/auth.api";
import ENV from "@config/env";
import AnalyticsService from "./analytics.service";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { logger } from "../events/logger";

GoogleSignin.configure({
  webClientId: ENV.WEB_CLIENT_ID,
  offlineAccess: true,
});

/* -------------------------------------------------------------------------- */
/*                                  AUTH SERVICE                              */
/* -------------------------------------------------------------------------- */

export const authService = {
  /* ------------------------------- CHECK AUTH ------------------------------ */
  async checkAuth() {
    try {
      return await authApi.check();
    } catch (error) {
      throw error;
    }
  },

  /* --------------------------- GOOGLE LOGIN FLOW --------------------------- */
  async loginWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;

      if (!idToken) {
        throw new Error("Google authentication failed. Please try again...");
      }

      const resData = await authApi.googleLogin(idToken);
      await AnalyticsService.setUserId(resData.uid);
      await AnalyticsService.logLogin("google");

      if (resData?.accessToken) {
        await saveAuthData(
          resData.accessToken,
          resData.user,
          resData.refreshToken,
          resData.isNewUser,
        );
      }

      return {
        user: resData.user,
        accessToken: resData.accessToken,
        refreshToken: resData.refreshToken,
        isNewUser: resData.isNewUser,
      };
    } catch (error) {
      logger.info("this is from auth service e ", error, error?.message);

      throw new Error(error?.message || "Google login failed");
    }
  },

  /* ------------------------------- LOGOUT ---------------------------------- */
  async logout() {
    try {
      await GoogleSignin.signOut();
      const res = await AnalyticsService.setUserId(null);
      logger.info("Check analytics ", res);
    } catch (_) {
      // ignore google logout failure
    }

    try {
      await authApi.logout();
    } catch (_) {
      // ignore backend logout failure
    } finally {
      await clearAuthData();
    }
  },

  /* ------------------------------ STORAGE OPS ------------------------------ */
  async getStoredAuth() {
    return await getAuthData();
  },

  async getProfile() {
    return await authApi.getProfile();
  },

  async setupProfile(data) {
    return await authApi.setupProfile(data);
  },

  async setupPreferences(data) {
    return await authApi.setUpPreferences(data);
  },

  /* ------------------------------ DELETE ACCOUNT OPS ------------------------------ */
  async deleteAccount() {
    return await authApi.deleteAccount();
  },
};
