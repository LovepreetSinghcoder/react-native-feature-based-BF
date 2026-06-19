import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "@navigation/TabNavigator";
import { withDeferredMount } from "@shared/components/hoc/withDeferredMount";

import SettingsScreen from "@features/profile/screens/SettingsScreen";
import MaintenanceScreen from "@features/maintenance/screens/MaintenanceScreen";
import MyProfileScreen from "@features/profile/screens/MyProfileScreen";
// imports to add at top

import AccountOverviewScreen from "@features/profile/screens/AccountOverviewScreen";
import NotificationScreen from "@features/notification/screens/notificationsScreen";

import { ROUTES } from "./routes";
import AccountStatusScreen from "@features/profile/screens/AccountStatusScreen";
import ConfirmDeleteAccountScreen from "@features/profile/screens/ConfirmDeleteAccountScreen";
import DeleteAccountReasonScreen from "@features/profile/screens/DeleteAccountReasonScreen";
import PrivacyScreen from "@features/leagal/screens/PrivacyScreen";
import TermsScreen from "@features/leagal/screens/TermsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#3C0366" },
      }}
    >
      <Stack.Screen name={ROUTES.MAIN_TABS} component={TabNavigator} />

      <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={ROUTES.MY_PROFILE} component={MyProfileScreen} />
      <Stack.Screen
        name={ROUTES.ACCOUNT_OVERVIEW}
        component={AccountOverviewScreen}
      />
      <Stack.Screen
        name={ROUTES.ACCOUNT_STATUS}
        component={AccountStatusScreen}
      />
      <Stack.Screen
        name={ROUTES.CONFIRM_DELETE_ACCOUNT}
        component={ConfirmDeleteAccountScreen}
      />
      <Stack.Screen
        name={ROUTES.DELETE_ACCOUNT_REASON}
        component={DeleteAccountReasonScreen}
      />
      <Stack.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} />

      <Stack.Screen name={ROUTES.PRIVACY} component={PrivacyScreen} />
      <Stack.Screen name={ROUTES.TERMS} component={TermsScreen} />
    </Stack.Navigator>
  );
}
