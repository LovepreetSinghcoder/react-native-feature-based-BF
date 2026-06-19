import React, { useEffect } from "react";
import { Animated, Text, StyleSheet, Dimensions } from "react-native";
import colors from "@theme/colors";

const { width } = Dimensions.get("window");

const NotificationBanner = ({ message, visible, onHide }) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide && onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default NotificationBanner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    width: width - 40,
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 8,
    zIndex: 9999,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.textWhite,
    fontSize: 14,
  },
});
