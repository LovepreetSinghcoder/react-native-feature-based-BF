import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "@onboarding/screens/OnboardingScreen";
import { ROUTES } from "./routes";

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
