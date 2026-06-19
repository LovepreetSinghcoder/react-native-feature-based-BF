import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientWrapper = ({
  children,
  colors,
  style,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default React.memo(GradientWrapper);

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
  },
});