import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

// import { View, Text, , StyleSheet } from "react-native";
import TopSpacing from "@layout/TopSpacing";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ onPress, title = "Back", stylesCont, styleTitleText }) => {
  return (
    <View>
      <TopSpacing />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressWrapper,
          stylesCont,
          pressed && styles.pressed,
        ]}>
        <Ionicons name="arrow-back" size={18} color="#ffffff50" />
        <Text style={[styles.backText, styleTitleText]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  pressWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  backArrow: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff50",
  },
  backText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff60",
  },
});
