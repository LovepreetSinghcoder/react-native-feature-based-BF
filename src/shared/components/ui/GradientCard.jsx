import React, { Children } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@theme/colors";

const GradientCard = ({
  children,
  onPress,
  style,
  shadowWrapper,
  isDisable = true,
  colors: gradientColors = [colors.primary, colors.accent],
}) => {
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        // paddingVertical: 15,
        borderRadius: 24,
        alignItems: "center",
        // width: "100%",
        borderWidth: 1,
        // marginTop: 30,
        ...style,
      }}>
      {children}
    </LinearGradient>
  );
};

export default GradientCard;

const styles = StyleSheet.create({
  shadowWrapper: {
    // Shadow for iOS
    // shadowColor: "#9810FA",
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.35,
    // shadowRadius: 20,
    // // Shadow for Android
    // elevation: 8,
    // borderRadius: 30,
    borderWidth: 1,
    borderColor: "red",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginRight: 10, // space between icon and text
  },
  iconWrapperRight: {
    marginLeft: 10, // space between icon and text
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
