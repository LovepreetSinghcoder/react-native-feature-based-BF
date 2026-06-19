import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import logo from "@assets/icons/logo.png";
import googlelogo from "@assets/icons/googlelogo.png";

import { useAuth } from "@features/auth/hooks/useAuth";
import { useAlert } from "../../../../shared/feedback/alert/useAlert";

import styles from "./styles";
import { useSelector } from "react-redux";
import ActivityLoader from "../../../../shared/components/loaders/ActivityLoader";

import { useTheme } from "../../../../shared/hooks/useTheme";

/* -------------------------------------------------------------------------- */

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const { showAlert } = useAlert();
  const isOffline = useSelector((state) => state.network.isOffline);

  const { loginWithGoogle, status, error, user, isNewUser } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);

  /* ---------------------- prevent duplicate side effects --------------------- */
  const hasHandledSuccess = useRef(false);
  const hasHandledError = useRef(false);

  /* -------------------------------------------------------------------------- */
  /*                                NAVIGATION                                  */
  /* -------------------------------------------------------------------------- */

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  const handleGoogle = async () => {
    if (isOffline) {
      showAlert({
        title: "Network Error",
        message: "Check your internet connection!",
        confirmText: "Ok",
        variant: "error",
      });
      return;
    }
    if (status === "loading") return; // prevent spam taps

    setAuthLoading(true);
    await loginWithGoogle();
    setAuthLoading(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                               ERROR HANDLING                               */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isOffline) {
      return;
    }
    if (status !== "failed" || !error) return;

    if (hasHandledError.current) return;
    hasHandledError.current = true;

    const t = setTimeout(() => {
      hasHandledError.current = false;
    }, 1500);

    return () => clearTimeout(t);
  }, [status, error]);

  /* -------------------------------------------------------------------------- */
  /*                              SUCCESS HANDLING                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (isOffline) {
      return;
    }
    if (status !== "succeeded" || !user) return;

    if (hasHandledSuccess.current) return;
    hasHandledSuccess.current = true;

    const t = setTimeout(() => {
      hasHandledSuccess.current = false;
    }, 1500);

    return () => clearTimeout(t);
  }, [status, user]);

  /* -------------------------------------------------------------------------- */

  return (
    <View style={styles.authCont}>
      <StatusBar style="light" />
      {status === "loading" && <ActivityLoader visible={true} />}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.authGradient}
      />

      {/* HEADER */}
      <View style={styles.authTxtCont}>
        <Image source={logo} style={{ width: 88, height: 62.86 }} />
        <Text style={[styles.authHeading, styles.heading]}>
          Sign up to build your squad
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.authBtnCont}>
        <TouchableOpacity
          onPress={handleGoogle}
          disabled={authLoading || status === "loading"}
        >
          <LinearGradient
            colors={[colors.primary, colors.accent]} // left to right gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.authBtn,
              styles.google_btn,
              { opacity: authLoading ? 0.5 : 1 },
            ]}
          >
            <Image source={googlelogo} style={{ width: 27, height: 28 }} />

            <Text style={styles.authBtnTxt}>Continue With Google</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* NAV TO LOGIN */}
      <TouchableOpacity
        style={styles.authChangebtn}
        onPress={handleNavigateToLogin}
      >
        <Text style={styles.authChangeBtnTxt}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to our{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate(ROUTES.TERMS)}
        >
          Terms of Use
        </Text>{" "}
        and{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate(ROUTES.PRIVACY)}
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );
};

export default SignUpScreen;
