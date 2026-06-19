import React, { memo, useCallback } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";

const SettingsItem = ({
  icon,
  title,
  subtitle,
  rightContent,
  onPress,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
  disabled = false,
}) => {
  const handlePress = useCallback(() => {
    if (!disabled && !isSwitch && onPress) {
      onPress();
    }
  }, [disabled, isSwitch, onPress]);

  const handleSwitchChange = useCallback(
    (value) => {
      if (!disabled && onSwitchChange) {
        onSwitchChange(value);
      }
    },
    [disabled, onSwitchChange],
  );

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={handlePress}
      activeOpacity={isSwitch ? 1 : 0.7}
      accessibilityRole={isSwitch ? "switch" : "button"}
      accessibilityState={{
        disabled,
        checked: isSwitch ? switchValue : undefined,
      }}
    >
      {/* LEFT */}
      <View style={styles.leftContent}>
        <Ionicons
          name={icon}
          size={24}
          color={disabled ? colors.textTertiary : colors.primary}
          style={styles.icon}
        />

        <View style={styles.textContent}>
          <Text style={[styles.titleText, disabled && styles.disabledText]}>
            {title}
          </Text>

          {!!subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
      </View>

      {/* RIGHT */}
      <View style={styles.rightContent}>
        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={handleSwitchChange}
            disabled={disabled}
            trackColor={{
              false: colors.textTertiary,
              true: colors.primary,
            }}
            thumbColor={colors.white}
          />
        ) : rightContent ? (
          rightContent
        ) : (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(SettingsItem);

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },

  disabled: {
    opacity: 0.5,
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    marginRight: 16,
  },

  textContent: {
    flex: 1,
  },

  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },

  subtitleText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  disabledText: {
    color: colors.textTertiary,
  },

  rightContent: {
    paddingLeft: 8,
    justifyContent: "center",
  },
});
