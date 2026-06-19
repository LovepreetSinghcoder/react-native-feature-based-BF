if (__DEV__) {
  require("./ReactotronConfig");
}

import React, { useCallback, useEffect, useRef } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
// import analytics from "@react-native-firebase/analytics";

// Navigation
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import RootNavigator from "@navigation/RootNavigator";

// State
import { Provider, useDispatch } from "react-redux";
import store from "./src/store/index";
import { checkFirstLaunch } from "@store/slices/appSlice";
import { loadAuth } from "@store/slices/authSlice";
import { setOffline } from "@store/slices/networkSlice";

// UI
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import GlobalAlert from "./src/shared/feedback/alert/GlobalAlert";
import OfflineBanner from "@feedback/OfflineBanner";
import { AlertProvider } from "./src/shared/feedback/alert/AlertContext";

// Hooks
import useNotifications from "@shared/hooks/useNotifications";

enableScreens(true);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default FCM topics the app subscribes to on first registration.
 * Extend this list as your backend topic taxonomy grows.
 */
const DEFAULT_TOPICS = ["general", "announcements"];

// ─────────────────────────────────────────────────────────────────────────────
// AppContent
// ─────────────────────────────────────────────────────────────────────────────

function AppContent() {
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const wasOffline = useRef(false);

  // Gives useNotifications callbacks a stable ref to navigate after cold start
  const navigationRef = useNavigationContainerRef();

  // ── Network state ─────────────────────────────────────────────────────────

  const isOffline =
    netInfo.isConnected === false || netInfo.isInternetReachable === false;

  useEffect(() => {
    dispatch(setOffline(isOffline));
  }, [dispatch, isOffline]);

  // Re-hydrate auth once connectivity is restored after an outage
  useEffect(() => {
    if (isOffline) {
      wasOffline.current = true;
      return;
    }
    if (wasOffline.current) {
      wasOffline.current = false;
      dispatch(loadAuth());
    }
  }, [dispatch, isOffline]);

  // ── App bootstrap ─────────────────────────────────────────────────────────

  useEffect(() => {
    dispatch(checkFirstLaunch());
    dispatch(loadAuth());
  }, [dispatch]);

  // ── Notification callbacks ────────────────────────────────────────────────
  // All three handlers are memoised so useNotifications never re-subscribes
  // its Firebase listeners due to a referential change in the callback props.

  /**
   * Foreground message handler.
   * Return `true` to suppress the default Alert (e.g. you show a custom toast).
   */
  const handleForeground = useCallback((remoteMessage) => {
    // Analytics ping — fire-and-forget, no await needed here
    // analytics().logEvent("notification_foreground", {
    //   messageId: remoteMessage.messageId,
    //   title: remoteMessage.notification?.title ?? "",
    // });
    return false;
  }, []);

  /**
   * Called when the user taps a notification while the app is backgrounded.
   * Use `navigationRef` for imperative navigation (safe because the
   * NavigationContainer is already mounted by this point).
   */
  const handleBackgroundTap = useCallback(
    (remoteMessage) => {
      const screen = remoteMessage.data?.screen;
      const params = remoteMessage.data?.params
        ? JSON.parse(remoteMessage.data.params)
        : undefined;

      if (screen && navigationRef.isReady()) {
        navigationRef.navigate(screen, params);
      }
    },
    [navigationRef],
  );

  /**
   * Cold-start / quit-state tap.
   * Navigation must be deferred until the NavigationContainer is ready,
   * so we poll `isReady()` in a short loop rather than navigating blindly.
   */
  const handleQuitTap = useCallback(
    (remoteMessage) => {
      const screen = remoteMessage.data?.screen;
      const params = remoteMessage.data?.params
        ? JSON.parse(remoteMessage.data.params)
        : undefined;

      if (!screen) return;

      // Poll until NavigationContainer finishes mounting (usually < 3 ticks)
      const tryNavigate = () => {
        if (navigationRef.isReady()) {
          navigationRef.navigate(screen, params);
        } else {
          setTimeout(tryNavigate, 100);
        }
      };
      tryNavigate();
    },
    [navigationRef],
  );

  // ── Push notifications ────────────────────────────────────────────────────

  // useNotifications({
  //   topics: DEFAULT_TOPICS,
  //   onForeground: handleForeground,
  //   onBackgroundTap: handleBackgroundTap,
  //   onQuitTap: handleQuitTap,
  //   // showForegroundAlert defaults to true inside the hook
  // });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <NavigationContainer ref={navigationRef}>
      <AlertProvider>
        {isOffline && <OfflineBanner />}
        <RootNavigator />
        <GlobalAlert />
      </AlertProvider>
    </NavigationContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App (root)
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </Provider>
  );
}
