import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@theme/colors";

const OfflineBanner = ({
  title = "You are offline",
  subtitle = "Waiting for internet to reconnect and reload the app.",
}) => (
  <SafeAreaView edges={["top"]} style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </SafeAreaView>
);

export default OfflineBanner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: colors.primaryDark,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.25,
  },
  subtitle: {
    marginTop: 4,
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },
});
