import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "@theme/colors";

export default function ActivityLoader({
  visible = false,
  size = "large",
  color = colors.primary,
}) {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.cardGlass,
    // backgroundColor: "transparent",
    // backgroundColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(0,0,0,0.2)",

    zIndex: 999,
  },
});
