import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  useColorScheme,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, spacing } from "@theme";

const { width, height } = Dimensions.get("window");

const AppAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
  variant = "info",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, opacityAnim]);

  const getVariantConfig = (variant) => {
    const configs = {
      success: {
        icon: "checkmark-circle",
        color: colors.success,
        backgroundColor: isDark
          ? "rgba(40, 167, 69, 0.15)"
          : "rgba(40, 167, 69, 0.1)",
        borderColor: colors.success,
      },
      error: {
        icon: "close-circle",
        color: colors.error,
        backgroundColor: isDark
          ? "rgba(220, 53, 69, 0.15)"
          : "rgba(220, 53, 69, 0.1)",
        borderColor: colors.error,
      },
      warning: {
        icon: "warning",
        color: colors.warning,
        backgroundColor: isDark
          ? "rgba(255, 193, 7, 0.15)"
          : "rgba(255, 193, 7, 0.1)",
        borderColor: colors.warning,
      },
      info: {
        icon: "information-circle",
        color: colors.primary, // Use app's primary color for info
        backgroundColor: isDark
          ? "rgba(108, 59, 170, 0.15)" // primary color with opacity
          : "rgba(108, 59, 170, 0.1)",
        borderColor: colors.primary,
      },
    };
    return configs[variant] || configs.info;
  };

  const variantConfig = getVariantConfig(variant);

  const themeColors = {
    background: isDark ? colors.surface : colors.background,
    textPrimary: isDark ? colors.textWhite : colors.black,
    textSecondary: isDark ? colors.textSecondary : colors.black, // Use secondary text for dark theme for better contrast
    overlay: isDark ? "rgba(2, 6, 24, 0.8)" : "rgba(0,0,0,0.5)",
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={[styles.overlay, { backgroundColor: themeColors.overlay }]}>
        <BlurView
          intensity={isDark ? 40 : 20}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
              borderColor: isDark ? colors.glassBorder : "rgba(0,0,0,0.1)",
            },
          ]}>
          <LinearGradient
            colors={
              isDark
                ? [colors.surface, colors.surfaceLight] // Use surface colors for better contrast in dark mode
                : ["rgba(255,255,255,0.95)", "rgba(255,255,255,0.95)"] // Semi-transparent white
            }
            style={styles.gradient}>
            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: variantConfig.backgroundColor },
              ]}>
              <Icon
                name={variantConfig.icon}
                size={32}
                color={variantConfig.color}
              />
            </View>

            {/* Title */}
            {title && (
              <Text style={[styles.title, { color: themeColors.textPrimary }]}>
                {title}
              </Text>
            )}

            {/* Message */}
            <Text
              style={[styles.message, { color: themeColors.textSecondary }]}>
              {message}
            </Text>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              {onCancel && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelBtn]}
                  onPress={onCancel}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.cancelText,
                      { color: themeColors.textSecondary },
                    ]}>
                    {cancelText}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.confirmBtn,
                  { borderColor: variantConfig.borderColor },
                ]}
                onPress={onConfirm}
                activeOpacity={0.8}>
                <Text
                  style={[styles.confirmText, { color: variantConfig.color }]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.85,
    maxWidth: 320,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  gradient: {
    padding: spacing.lg,
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  cancelBtn: {
    backgroundColor: "transparent",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
  confirmBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
