import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
// import colors from "@theme/colors";

const ScreenWrapper = ({ children, style, noPadding = false }) => {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    // paddingHorizontal: 20,

    flex: 1,
  },
});
