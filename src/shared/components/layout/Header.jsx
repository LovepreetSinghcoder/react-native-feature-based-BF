import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@theme/colors";

const Header = ({
  userName,
  title,
  rightIcons = [],
  leftIcons = null,
  extraText = null,
  style = null,
}) => {
  const MAX_LENGTH = 15;

  const truncateText = (text) => {
    if (!text) return "";
    return text.length > MAX_LENGTH
      ? text.substring(0, MAX_LENGTH) + "..."
      : text;
  };

  const displayTitle = truncateText(title ? title : `Hello, ${userName}`);

  // const displayTitle = title ? title : `Hello, ${userName}`;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftCont}>
        {leftIcons}
        {extraText == null ? (
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {displayTitle}
          </Text>
        ) : (
          <View style={styles.extraTitleSec}>
            <Text style={styles.extraTitle}>{extraText}</Text>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {displayTitle}
            </Text>
          </View>
        )}
      </View>

      {rightIcons.length > 0 && (
        <View style={styles.actions}>
          {rightIcons.map((Icon, index) => (
            <View key={index} style={styles.iconWrapper}>
              {Icon}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  leftCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  extraTitleSec: { gap: 0 },
  extraTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    gap: 12,
    // letterSpacing: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.textPrimary,
    gap: 12,
    // letterSpacing: 15,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  action: {
    backgroundColor: colors.glassLight,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    color: colors.textWhite,
  },
  iconWrapper: {
    backgroundColor: colors.glassLight,
    borderRadius: 15,
    padding: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
});
