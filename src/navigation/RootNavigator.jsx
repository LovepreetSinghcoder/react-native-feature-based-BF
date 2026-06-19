import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigators
import OnboardingStack from "@navigation/OnboardingNavigator";
import AppNavigator from "@navigation/AppNavigator";
import AuthStack from "@navigation/AuthNavigator";

// Shared
import ActivityLoader from "@shared/components/loaders/ActivityLoader";
import ScreenWrapper from "@layout/ScreenWrapper";

import { useDispatch, useSelector } from "react-redux";
import { loadAuth, logout } from "@store/slices/authSlice";
import { checkFirstLaunch } from "@store/slices/appSlice";

import MaintenanceScreen from "../features/maintenance/screens/MaintenanceScreen";
import BlockedScreen from "../features/blocked/screens/BlockedScreen";

import { authService } from "@lib/services/auth.service";
import { setLogoutHandler } from "@lib/events/auth.events";

import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import { ROUTES } from "./routes";

import { cacheGet } from "@lib/storage/mmkv";

import { CACHE_KEYS } from "@lib/storage/cacheKeys";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();

  const { isFirstLaunch, checkedFirstLaunch } = useSelector((s) => s.app);
  const { isMaintenance, isUserBanned } = useSelector((s) => s.ui);
  const { accessToken, authChecked } = useSelector((s) => s.auth);

  const [profileLoading, setProfileLoading] = useState(false);
  const [isUserBlocked, setIsUserBlocked] = useState(false);

  /* ------------------------------------------------------------------ */
  /* Wire triggerLogout → Redux logout thunk                             */
  /* This is the fix: without this, triggerLogout() was a silent no-op  */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    setLogoutHandler(() => {
      dispatch(logout());
    });

    // Clean up on unmount so stale handlers don't linger
    return () => setLogoutHandler(null);
  }, [dispatch]);

  /* ------------------------------------------------------------------ */
  /* Bootstrap on mount                                                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    dispatch(checkFirstLaunch());
    dispatch(loadAuth());
  }, [dispatch]);

  /* ------------------------------------------------------------------ */
  /* Profile fetch — only when authenticated                             */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!accessToken) {
      setProfileLoading(false);
      setIsUserBlocked(false);
      return;
    }

    let cancelled = false;

    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        const response = await authService.getProfile();
        const profile = response?.user ?? response;

        if (!cancelled) {
          setIsUserBlocked(profile?.accountStatus === "BLOCKED");
        }
      } catch (error) {
        // Profile fetch failing after a valid token usually means the
        // session is gone — the api client will have already called
        // triggerLogout(), so no extra action needed here.
        if (!cancelled) {
          setIsUserBlocked(false);
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  /* ------------------------------------------------------------------ */
  /* Gate: don't render navigation until everything is ready            */
  /* ------------------------------------------------------------------ */
  const isAppReady =
    checkedFirstLaunch &&
    authChecked &&
    // sportsPreferenceReady &&
    (accessToken ? !profileLoading : true);

  if (!isAppReady) {
    return (
      <ScreenWrapper>
        <StatusBar style="light" />
        <ActivityLoader visible={true} />
      </ScreenWrapper>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Priority order:                                                      */
  /*  1. Blocked user (profile-level)                                    */
  /*  2. Server-triggered ban (403 event)                                */
  /*  3. Maintenance                                                      */
  /*  4. Onboarding                                                       */
  /*  5. Authenticated app                                               */
  /*  6. Auth screens                                                     */
  /* ------------------------------------------------------------------ */
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "default",
        presentation: "card",
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      {isUserBlocked || isUserBanned ? (
        <Stack.Screen name={ROUTES.ACCESSDENIED} component={BlockedScreen} />
      ) : isMaintenance ? (
        <Stack.Screen name={ROUTES.MAINTENANCE} component={MaintenanceScreen} />
      ) : isFirstLaunch ? (
        <Stack.Screen
          name={ROUTES.ONBOARDING_STACK}
          component={OnboardingStack}
        />
      ) : accessToken ? (
        <Stack.Screen name={ROUTES.APP} component={AppNavigator} />
      ) : (
        <Stack.Screen name={ROUTES.AUTH} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
