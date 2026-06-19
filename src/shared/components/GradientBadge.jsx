import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@theme/colors";

const GradientBadge = React.memo(
  ({
    text,
    icon = null,
    colors: gradientColors = [colors.warning, colors.primary],
  }) => {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.badge}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    );
  },
);

export default GradientBadge;

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: "600",
  },
});
