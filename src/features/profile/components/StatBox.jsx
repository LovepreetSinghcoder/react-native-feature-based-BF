// components/StatBox.js

import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

const StatBox = React.memo(({ value, label }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
});

export default StatBox;

const styles = StyleSheet.create({
  box: {
    width: "31%",
    height: 67,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff"
  },
  label: {
    fontSize: 13,
    color: "#ffffff60"
  }
});