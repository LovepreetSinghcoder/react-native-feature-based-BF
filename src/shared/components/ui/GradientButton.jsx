import React from "react";
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

const GradientButton = ({
  title,
  onPress,
  style,
  innerStyle,
  icon,
  icon1,
  shadowWrapper,
  styleTxt,
  isDisable = false,
  colors: gradientColors = [colors.primary, colors.accent],
}) => {
  return (
    <View style={[styles.shadowWrapper, shadowWrapper]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={isDisable}
        style={{ flex: 1 }}>
        <LinearGradient
          colors={gradientColors} // left to right gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, style, isDisable && styles.disabled]}>
          <View style={[styles.content, innerStyle]}>
            {icon && <View style={styles.iconWrapper}>{icon}</View>}
            <Text style={[styles.title, styleTxt]}>{title}</Text>
            {icon && <View style={styles.iconWrapperRight}>{icon1}</View>}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  shadowWrapper: {
    //   // Shadow for iOS
    //   shadowColor: "#9810FA",
    //   shadowOffset: { width: 0, height: 10 },
    //   shadowOpacity: 0.35,
    //   shadowRadius: 20,
    //   // Shadow for Android
    //   elevation: 8,
    //   borderRadius: 30,
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",

    // paddingVertical: 15,
    //   borderRadius: 30,
    //   alignItems: "center",
    //   width: "100%",
    //   marginTop: 30,
    // NO marginTop here — removed permanently
  },
  iconWrapper: {
    marginRight: 10, // space between icon and text
  },
  iconWrapperRight: {
    marginLeft: 10, // space between icon and text
  },
  title: {
    color: colors.textWhite,
    fontWeight: "bold",
    fontSize: 16,
  },
  disabled: {
    opacity: 0.45,
  },
});
