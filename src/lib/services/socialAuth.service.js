// src/services/socialAuthService.js

import * as authApi from "@api/auth/auth.api";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

export const loginWithGoogle = async () => {
  try {
    // 🔥 Step 1: Get token from Google SDK (mock for now)
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "<EXPO_CLIENT_ID>",
      iosClientId: "<IOS_CLIENT_ID>",
      androidClientId: "<ANDROID_CLIENT_ID>",
    });

    if (response?.type === "success") {
      const { authentication } = response;
      // send authentication.accessToken to your backend API
      return authApi.loginWithGoogle(authentication.accessToken);
    }
  } catch (error) {
    throw error;
  }
};

export const loginWithTwitter = async () => {
  try {
    const twitterToken = "mock_twitter_token";

    const response = await authApi.loginWithTwitter(twitterToken);

    return response.data;
  } catch (error) {
    throw error;
  }
};
