import {
  getMessaging,
  getToken,
  subscribeToTopic,
  unsubscribeFromTopic,
  requestPermission,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirebaseApp } from "./firebaseConfig";
import { logger } from "@lib/events/logger";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const BROADCAST_TOPIC = "broadcast";

/**
 * Persisted flag: have we ever shown the Android POST_NOTIFICATIONS prompt?
 * PermissionsAndroid.check() returns false for both "never asked" and "denied",
 * so we need this to tell them apart.
 */
const ANDROID_PERMISSION_REQUESTED_KEY =
  "@notifications/android_permission_requested";

/** @returns {import('@react-native-firebase/messaging').FirebaseMessagingTypes.Module} */
const getMessagingInstance = () => getMessaging(getFirebaseApp());

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

const markAndroidPermissionRequested = () =>
  AsyncStorage.setItem(ANDROID_PERMISSION_REQUESTED_KEY, "true").catch((e) =>
    logger.warn("[FCM] Failed to persist permission flag:", e),
  );

const wasAndroidPermissionEverRequested = async () => {
  try {
    const val = await AsyncStorage.getItem(ANDROID_PERMISSION_REQUESTED_KEY);
    return val === "true";
  } catch {
    return false; // safe default: treat as never requested
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Permission
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Silently checks OS permission WITHOUT showing a system prompt.
 *
 * Android caveat: PermissionsAndroid.check() returns false for both
 * "never asked" (undetermined) and "denied". We persist a flag after the
 * first request so we can correctly distinguish the two states.
 *
 * @returns {Promise<'granted' | 'denied' | 'undetermined'>}
 */
export const checkNotificationPermission = async () => {
  try {
    if (Platform.OS === "android") {
      // Below API 33 POST_NOTIFICATIONS didn't exist → always granted
      if (Platform.Version < 33) return "granted";

      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted) return "granted";

      // check() returned false — could be "denied" OR "never asked".
      // Use the persisted flag to tell them apart.
      const everRequested = await wasAndroidPermissionEverRequested();
      return everRequested ? "denied" : "undetermined";
    }

    if (Platform.OS === "ios") {
      const status = await getMessagingInstance().hasPermission();
      switch (status) {
        case AuthorizationStatus.AUTHORIZED:
        case AuthorizationStatus.PROVISIONAL:
          return "granted";
        case AuthorizationStatus.DENIED:
          return "denied";
        default:
          return "undetermined";
      }
    }

    return "undetermined";
  } catch (e) {
    logger.error("[FCM] checkPermission error:", e);
    return "undetermined"; // fail-safe: never block the app
  }
};

/**
 * Requests OS permission, showing a system prompt if not yet determined.
 * Persists a flag on Android so future check() calls can distinguish
 * "never asked" from "denied".
 *
 * @returns {Promise<'granted' | 'denied' | 'undetermined'>}
 */
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === "android") {
      if (Platform.Version < 33) return "granted";

      const alreadyGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (alreadyGranted) return "granted";

      // Mark BEFORE requesting — if the app is killed mid-prompt,
      // we still know a request was attempted on next launch.
      await markAndroidPermissionRequested();

      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      switch (result) {
        case PermissionsAndroid.RESULTS.GRANTED:
          return "granted";
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          return "denied"; // user checked "don't ask again" → send to Settings
        default:
          // RESULTS.DENIED = dismissed or tapped deny but CAN be asked again
          // Treat as "undetermined" so we don't wrongly surface the Settings alert
          return "undetermined";
      }
    }

    if (Platform.OS === "ios") {
      const status = await requestPermission(getMessagingInstance());
      switch (status) {
        case AuthorizationStatus.AUTHORIZED:
        case AuthorizationStatus.PROVISIONAL:
          return "granted";
        case AuthorizationStatus.DENIED:
          return "denied";
        default:
          return "undetermined";
      }
    }

    return "undetermined";
  } catch (e) {
    logger.error("[FCM] requestPermission error:", e);
    return "undetermined";
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Token
// ─────────────────────────────────────────────────────────────────────────────

export const getFCMToken = async () => {
  try {
    return await getToken(getMessagingInstance());
  } catch (e) {
    logger.error("[FCM] getToken error:", e);
    return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Topics
// ─────────────────────────────────────────────────────────────────────────────

export const subscribeToBroadcast = async () => {
  try {
    await subscribeToTopic(getMessagingInstance(), BROADCAST_TOPIC);
    logger.info("[FCM] Subscribed to:", BROADCAST_TOPIC);
  } catch (e) {
    logger.error("[FCM] subscribeToTopic error:", e);
  }
};

export const unsubscribeFromBroadcast = async () => {
  try {
    await unsubscribeFromTopic(getMessagingInstance(), BROADCAST_TOPIC);
    logger.info("[FCM] Unsubscribed from:", BROADCAST_TOPIC);
  } catch (e) {
    logger.error("[FCM] unsubscribeFromTopic error:", e);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

export const openNotificationSettings = () => Linking.openSettings();
