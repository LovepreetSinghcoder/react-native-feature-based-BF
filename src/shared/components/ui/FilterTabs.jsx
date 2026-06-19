// FilterTabs.jsx

import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@theme/colors";

const FilterTabs = ({
  options = [],
  value,
  onChange,

  // Gradient customization
  activeGradientColors = [colors.primary, colors.accent],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },

  // Style overrides
  containerStyle,
  tabStyle,
  activeTabStyle,
  inactiveTabStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,

  // Layout
  scrollable = false,
  gap = 10,

  // Icon support
  renderIcon, // (item, isActive) => <Icon />
  iconPosition = "left", // 'left' | 'right'

  // Badge/count support
  renderBadge, // (item, isActive) => <Badge />
}) => {
  const Wrapper = scrollable ? ScrollView : View;
  const wrapperProps = scrollable
    ? {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: [styles.container, { gap }, containerStyle],
      }
    : {
        style: [styles.container, { gap }, containerStyle],
      };

  return (
    <Wrapper {...wrapperProps}>
      {options.map((item) => {
        const isActive = value === item.value;

        const icon = renderIcon ? renderIcon(item, isActive) : null;
        const badge = renderBadge ? renderBadge(item, isActive) : null;

        const content = (
          <View style={styles.tabContent}>
            {icon && iconPosition === "left" && (
              <View style={styles.iconLeft}>{icon}</View>
            )}

            <Text
              style={[
                styles.text,
                textStyle,
                isActive
                  ? [styles.activeText, activeTextStyle]
                  : inactiveTextStyle,
              ]}
            >
              {item.label}
            </Text>

            {icon && iconPosition === "right" && (
              <View style={styles.iconRight}>{icon}</View>
            )}

            {badge && <View style={styles.badge}>{badge}</View>}
          </View>
        );

        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            disabled={item.disabled}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            {isActive ? (
              <LinearGradient
                colors={item.gradientColors || activeGradientColors}
                start={gradientStart}
                end={gradientEnd}
                style={[styles.tab, tabStyle, activeTabStyle]}
              >
                {content}
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.tab,
                  styles.inactiveTab,
                  tabStyle,
                  inactiveTabStyle,
                  item.disabled && styles.disabledTab,
                ]}
              >
                {content}
              </View>
            )}
          </Pressable>
        );
      })}
    </Wrapper>
  );
};

export default React.memo(FilterTabs);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    // borderWidth: 1,
  },
  inactiveTab: {
    backgroundColor: colors.cardGlass,
    borderColor: colors.glassBorder,
  },
  disabledTab: {
    opacity: 0.4,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.textSecondary,
    fontWeight: "500",
    fontSize: 14,
  },
  activeText: {
    color: colors.textWhite,
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  badge: {
    marginLeft: 6,
  },
});
