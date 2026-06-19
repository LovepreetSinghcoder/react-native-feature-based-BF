// shared/hooks/useNotifications.js

import { useEffect, useRef, useCallback } from "react";
import { AppState, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessaging,
  onMessage,
  onTokenRefresh,
  getInitialNotification,
  onNotificationOpenedApp,
} from "@react-native-firebase/messaging";
import { getFirebaseApp } from "@lib/services/firebaseConfig";
import { openNotificationSettings } from "@lib/services/notifications.service";
import {
  initNotifications,
  rotateToken,
  syncPermissionStatus,
} from "@store/slices/notificationsSlice";
import { logger } from "@lib/events/logger";

// ─────────────────────────────────────────────────────────────────────────────
// Types (JSDoc — no TS dependency)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {object} UseNotificationsOptions
 * @property {string}   [deviceName=""]      - Human-readable device label forwarded to backend.
 * @property {string[]} [topics=[]]          - Extra backend topics to subscribe on first register.
 * @property {function} [onForeground]       - Called with the RemoteMessage when app is foregrounded.
 *                                             Return `true` to suppress the default Alert.
 * @property {function} [onBackgroundTap]    - Called when user taps a notification while app is backgrounded.
 * @property {function} [onQuitTap]          - Called when user taps a notification that launched the app.
 * @property {boolean}  [showForegroundAlert=true] - Whether to show a default Alert for foreground messages.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useNotifications
 *
 * One hook to rule them all for push notifications in React Native.
 *
 * Responsibilities:
 *  1. Bootstrap  — dispatches `initNotifications` (slice guards duplicates / TTL).
 *  2. Token rotation  — wires `onTokenRefresh` → dispatches `rotateToken`.
 *  3. Foreground messages  — shows a default Alert or delegates to `onForeground`.
 *  4. Background tap  — delegates to `onBackgroundTap` for navigation.
 *  5. Quit-state tap  — delegates to `onQuitTap` for cold-start deep linking.
 *  6. App-foreground resume  — re-syncs OS permission so the slice reflects
 *     any changes the user made in device Settings.
 *  7. Permission denied  — surfaces an actionable Alert with a Settings deep-link.
 *
 * All Firebase listeners are torn down on unmount.
 *
 * @param {UseNotificationsOptions} [options={}]
 */
const useNotifications = ({
  deviceName = "",
  topics = [],
  onForeground,
  onBackgroundTap,
  onQuitTap,
  showForegroundAlert = true,
} = {}) => {
  const dispatch = useDispatch();

  const prevPermissionStatus = useRef(null);

  // Read slice state so we can react to permission changes downstream
  // const { permissionStatus, token } = useSelector((s) => s.notifications);
  const { permissionStatus, token } = useSelector(
    (s) => s.notifications ?? { permissionStatus: null, token: null },
  );

  // Stable ref to the messaging instance — created once, never re-created
  const messagingRef = useRef(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  /**
   * Prompts the user to open device Settings when permission is denied.
   * Only shown once per mount; the slice's `permissionStatus === "denied"`
   * guard in `initNotifications` prevents re-triggering on every render.
   */
  const promptSettingsAlert = useCallback(() => {
    // Alert.alert(
    //   "Notifications Disabled",
    //   "Enable notifications in Settings to receive the latest updates.",
    //   [
    //     { text: "Not Now", style: "cancel" },
    //     {
    //       text: "Open Settings",
    //       onPress: () => {
    //         openNotificationSettings();
    //         logger.info("[useNotifications] User directed to Settings");
    //       },
    //     },
    //   ],
    //   { cancelable: true },
    // );
  }, []);

  /**
   * Default foreground alert handler.
   * Callers can override per-notification via `onForeground` returning true.
   */
  const handleForegroundMessage = useCallback(
    (remoteMessage) => {
      logger.info("[useNotifications] Foreground message:", remoteMessage);

      // Let the consumer intercept first; returning true suppresses the Alert
      if (typeof onForeground === "function") {
        const handled = onForeground(remoteMessage);
        if (handled) return;
      }

      if (!showForegroundAlert) return;

      Alert.alert(
        remoteMessage.notification?.title ?? "New Notification",
        remoteMessage.notification?.body ?? "",
        [{ text: "OK" }],
        { cancelable: true },
      );
    },
    [onForeground, showForegroundAlert],
  );

  // ── Effect: bootstrap + listeners ────────────────────────────────────────

  useEffect(() => {
    // Initialise (or re-use) the messaging singleton
    const messaging = getMessaging(getFirebaseApp());
    messagingRef.current = messaging;

    // ── 1. Bootstrap ──────────────────────────────────────────────────────
    // Slice condition() guards: skips if token is fresh / already loading /
    // permission denied. No extra guards needed here.
    dispatch(initNotifications({ deviceName, topics }))
      .unwrap()
      .catch((reason) => {
        logger.warn("[useNotifications] Init failed:", reason);

        // Surface Settings prompt only on explicit permission denial
        if (
          typeof reason === "string" &&
          reason.toLowerCase().includes("permission")
        ) {
          promptSettingsAlert();
        }
      });

    // ── 2. Token rotation ─────────────────────────────────────────────────
    // Firebase calls this when it silently rotates the FCM token.
    // We capture `token` from slice state at the time the listener fires via
    // a ref so the closure always holds the latest value without re-subscribing.
    const tokenRef = { current: token };

    const unsubTokenRefresh = onTokenRefresh(messaging, async (newToken) => {
      logger.info("[useNotifications] Token rotated");

      dispatch(
        rotateToken({
          oldToken: tokenRef.current ?? "", // may be null if init hadn't finished
          newToken,
          deviceName,
        }),
      )
        .unwrap()
        .catch((err) =>
          logger.error("[useNotifications] Token rotation failed:", err),
        );
    });

    // ── 3. Foreground messages ────────────────────────────────────────────
    const unsubForeground = onMessage(messaging, handleForegroundMessage);

    // ── 4. Background tap (app was backgrounded, not quit) ────────────────
    const unsubBackground = onNotificationOpenedApp(
      messaging,
      (remoteMessage) => {
        logger.info("[useNotifications] Background tap:", remoteMessage);
        if (typeof onBackgroundTap === "function") {
          onBackgroundTap(remoteMessage);
        }
      },
    );

    // ── 5. Quit-state tap (cold start) ────────────────────────────────────
    // `getInitialNotification` is a one-shot promise; no teardown needed.
    getInitialNotification(messaging)
      .then((remoteMessage) => {
        if (!remoteMessage) return;
        logger.info("[useNotifications] Quit-state tap:", remoteMessage);
        if (typeof onQuitTap === "function") {
          onQuitTap(remoteMessage);
        }
      })
      .catch((err) =>
        logger.error("[useNotifications] getInitialNotification error:", err),
      );

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      unsubForeground();
      unsubBackground();
      unsubTokenRefresh();
    };

    // Intentionally omit `token` and callbacks from deps:
    //  • Callbacks are expected to be stable (wrap in useCallback at call site).
    //  • `token` is read through a ref inside the refresh closure.
    //  • Re-running the effect on every token change would re-subscribe all
    //    listeners unnecessarily.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceName]);

  // ── Effect: update tokenRef whenever slice token changes ─────────────────
  // Keeps the onTokenRefresh closure up-to-date without re-subscribing listeners.
  const tokenRefInternal = useRef(token);
  useEffect(() => {
    tokenRefInternal.current = token;
  }, [token]);

  // ── Effect: re-sync permission on app foreground ──────────────────────────
  // The user can toggle notifications in device Settings while the app is
  // backgrounded.  We poll on resume so the slice reflects reality.
  useEffect(() => {
    const handleAppStateChange = (nextState) => {
      if (nextState === "active") {
        dispatch(syncPermissionStatus());
      }
    };

    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [dispatch]);

  // ── Effect: react to permission going from granted → denied post-mount ───
  // If `syncPermissionStatus` discovers the user revoked permission,
  // surface the Settings prompt automatically.
  // useEffect(() => {
  //   if (permissionStatus === "denied") {
  //     promptSettingsAlert();
  //   }
  //   // Only fire when permissionStatus transitions to "denied", not on every render
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [permissionStatus]);

  useEffect(() => {
    // Skip the very first render — initNotifications hasn't resolved yet.
    // Only alert when status *transitions into* "denied" from something else.
    if (
      prevPermissionStatus.current !== null && // not the initial mount
      prevPermissionStatus.current !== "denied" && // was previously ok
      permissionStatus === "denied" // now explicitly denied
    ) {
      promptSettingsAlert();
    }

    prevPermissionStatus.current = permissionStatus;
  }, [permissionStatus, promptSettingsAlert]);
};

export default useNotifications;
