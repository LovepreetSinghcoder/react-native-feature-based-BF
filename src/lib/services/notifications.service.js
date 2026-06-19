// src/services/notifications/notifications.service.js

import { Platform } from "react-native";
import { notificationsApi } from "@api/notifications/notifications.api";
import {
  requestNotificationPermission,
  checkNotificationPermission,
  getFCMToken,
  subscribeToBroadcast,
  unsubscribeFromBroadcast,
  openNotificationSettings,
} from "./notifications.firebase";
import { logger } from "@lib/events/logger";

const PLATFORM = Platform.OS.toUpperCase(); // "IOS" | "ANDROID"

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Full bootstrap flow:
 *  1. Silently check current OS permission (no prompt).
 *  2. If undetermined → request (shows system prompt once).
 *  3. If denied → return null immediately; caller surfaces Settings alert.
 *  4. Get FCM token and register with backend.
 *
 * Separating check from request is critical — calling requestPermission on
 * every cold start re-prompts the user (Android) or wastes a native call (iOS).
 *
 * @param {object}   options
 * @param {string}   [options.deviceName=""]
 * @param {string[]} [options.topics=[]]
 * @returns {Promise<string|null>} FCM token or null
 */
export const initAndRegister = async ({
  deviceName = "",
  topics = [],
} = {}) => {
  try {
    // Step 1: silent check — avoid prompting if already determined
    let permissionStatus = await checkNotificationPermission();

    if (permissionStatus === "undetermined") {
      // Step 2: first time — show the system prompt
      permissionStatus = await requestNotificationPermission();
    }

    if (permissionStatus !== "granted") {
      logger.warn("[Notifications] Permission not granted:", permissionStatus);
      return null;
    }

    // Step 3: get token and register
    const token = await getFCMToken();
    if (!token) {
      logger.error(
        "[Notifications] FCM token unavailable after permission granted",
      );
      return null;
    }

    await notificationsApi.registerToken({
      token,
      // platform: PLATFORM,
      platform: "MOBILE",

      deviceName,
      topics,
    });

    logger.info("[Notifications] initAndRegister success");
    return token;
  } catch (e) {
    logger.error("[Notifications] initAndRegister error:", e);
    return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Token lifecycle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Called when Firebase rotates the FCM token.
 * Migrates backend subscriptions from old → new token.
 */
export const refreshToken = async (oldToken, newToken, deviceName = "") => {
  try {
    await notificationsApi.updateToken({
      token: newToken,
      oldToken,
      platform: PLATFORM,
      deviceName,
    });
    logger.info("[Notifications] refreshToken success");
  } catch (e) {
    logger.error("[Notifications] refreshToken error:", e);
    throw e; // re-throw so the thunk's .unwrap() can catch it
  }
};

/**
 * Logout / cleanup: removes token from backend and unsubscribes broadcast.
 */
export const deregister = async (token) => {
  try {
    await Promise.all([
      notificationsApi.removeToken({ token }),
      unsubscribeFromBroadcast(),
    ]);
    logger.info("[Notifications] deregister success");
  } catch (e) {
    logger.error("[Notifications] deregister error:", e);
    throw e;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Topics
// ─────────────────────────────────────────────────────────────────────────────

export const subscribeToTopics = async (token, topics) => {
  try {
    await notificationsApi.subscribeToTopics({ token, topics });
    logger.info("[Notifications] subscribeToTopics:", topics);
  } catch (e) {
    logger.error("[Notifications] subscribeToTopics error:", e);
    throw e;
  }
};

export const unsubscribeFromTopics = async (token, topics) => {
  try {
    await notificationsApi.unsubscribeFromTopics({ token, topics });
    logger.info("[Notifications] unsubscribeFromTopics:", topics);
  } catch (e) {
    logger.error("[Notifications] unsubscribeFromTopics error:", e);
    throw e;
  }
};

// Re-export so consumers never import from two files
export {
  checkNotificationPermission,
  openNotificationSettings,
  subscribeToBroadcast,
  unsubscribeFromBroadcast,
};
