import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ForgotPasswordScreen from "@screens/auth/ForgotPasswordScreen";
import LoginScreen from "@features/auth/screens/LoginScreen";
import SignUpScreen from "@features/auth/screens/SignupScreen";
import { ROUTES } from "./routes";
import TermsScreen from "../features/leagal/screens/TermsScreen";
import PrivacyScreen from "../features/leagal/screens/PrivacyScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP} component={SignUpScreen} />

      <Stack.Screen name={ROUTES.TERMS} component={TermsScreen} />

      <Stack.Screen name={ROUTES.PRIVACY} component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
