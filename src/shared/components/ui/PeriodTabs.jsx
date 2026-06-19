import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";

/* ─── Period tabs sub-component ─────────────────────────────────────────── */
const PeriodTabs = memo(({ options, value, onChange, colors }) => {
  const styles = makeStyles(colors);

  return (
    <View style={styles.tabsWrap}>
      {options.map((opt) => {
        const isActive = opt.value === value;

        return isActive ? (
          <LinearGradient
            key={opt.value}
            colors={colors.gradientBrand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tab}>
            <Text style={[styles.tabText, styles.tabTextActive]}>
              {opt.label}
            </Text>
          </LinearGradient>
        ) : (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={({ pressed }) => [
              styles.tab,
              styles.tabInactive,
              pressed && styles.tabPressed,
            ]}>
            <Text style={styles.tabText}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
});

export default PeriodTabs;

const makeStyles = (colors) =>
  StyleSheet.create({
    iconBtn: {
      // width: 36,
      height: 36,
      borderRadius: 18,
      // backgroundColor: "rgba(255,255,255,0.10)",
      alignItems: "center",
      justifyContent: "center",
    },

    iconBtnPressed: {
      // backgroundColor: "rgba(255,255,255,0.18)",
    },

    // Period filter pill tabs row
    tabsWrap: {
      flexDirection: "row",
      marginHorizontal: 0,
      marginBottom: 16,
      backgroundColor: "rgba(255,255,255,0.07)",
      borderRadius: 12,
      padding: 3,
      gap: 0,
    },

    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      borderRadius: 9,
    },

    tabInactive: {
      backgroundColor: "transparent",
    },

    tabPressed: {
      backgroundColor: "rgba(255,255,255,0.06)",
    },

    tabText: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.45)",
    },

    tabTextActive: {
      color: "#fff",
    },
  });
