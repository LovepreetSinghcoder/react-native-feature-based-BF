import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@theme/colors";

const TeamBadge = ({ name, gradient, style = "", styleTxt = "" }) => {
  return (
    <LinearGradient colors={gradient} style={[styles.container, style]}>
      <Text style={[styles.text, styleTxt]}>{name}</Text>
    </LinearGradient>
  );
};

export default TeamBadge;

const styles = StyleSheet.create({
  container: {
    width: 53,
    height: 53,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.textWhite,
    fontWeight: "700",
    fontSize: 17,
  },
});
