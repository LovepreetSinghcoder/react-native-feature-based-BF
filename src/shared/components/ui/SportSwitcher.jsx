
import React, { useRef, useCallback, useMemo } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@theme/colors";
import { useTheme } from "@shared/hooks/useTheme";
import { logger } from "../../../lib/events/logger";

/* ─── Static sport definitions ─────────────────────────────────────────────
   icon      → Ionicons name (closest available match)
   comingSoon → greys out pill and blocks selection until sport goes live
────────────────────────────────────────────────────────────────────────── */
export const SPORTS = [
  { id: "cricket", label: "Cricket", icon: "baseball-outline" },
  {
    id: "football",
    label: "Football",
    icon: "football-outline",
    comingSoon: true,
  },
  {
    id: "basketball",
    label: "Basketball",
    icon: "basketball-outline",
    comingSoon: true,
  },
  { id: "kabaddi", label: "Kabaddi", icon: "body-outline", comingSoon: true },
  {
    id: "athletics",
    label: "Athletics",
    icon: "fitness-outline",
    comingSoon: true,
  },
];

/* ──────────────────────────────────────────────────────────────
   UI Config only
   Backend controls available sports dynamically
────────────────────────────────────────────────────────────── */
const SPORT_UI_CONFIG = {
  CRICKET: {
    icon: "baseball-outline",
  },
  FOOTBALL: {
    icon: "football-outline",
  },
  BASKETBALL: {
    icon: "basketball-outline",
    comingSoon: true,
  },
  KABADDI: {
    icon: "body-outline",
    comingSoon: true,
  },
  ATHLETICS: {
    icon: "fitness-outline",
    comingSoon: true,
  },
};

const DEFAULT_ICON = "apps-outline";

/* ─── Component ─────────────────────────────────────────────────────────── */
const SportSwitcher = ({
  selectedSport = "CRICKET",
  onSelect,
  sports = [],
}) => {
  const scrollRef = useRef(null);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const formattedSports = useMemo(() => {
    return sports.map((sport) => {
      const config = SPORT_UI_CONFIG[sport.code] || {};

      return {
        id: sport.id,
        code: sport.code,
        label: sport.name,
        icon: config.icon || DEFAULT_ICON,
        comingSoon: config.comingSoon || false,
      };
    });
  }, [sports]);

  const handlePress = useCallback(
    (sport) => {
      if (sport.comingSoon) return;

      onSelect?.(sport.code);
    },
    [onSelect],
  );

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {formattedSports.map((sport) => {
        const isActive = sport.code === selectedSport;

        const isDisabled = sport.comingSoon;

        return (
          <TouchableOpacity
            key={sport.id}
            activeOpacity={isDisabled ? 1 : 0.75}
            onPress={() => handlePress(sport)}
            style={[
              styles.pill,
              isActive && styles.pillActive,
              isDisabled && styles.pillDisabled,
            ]}
          >
            <Ionicons
              name={sport.icon}
              size={15}
              color={
                isDisabled
                  ? "rgba(255,255,255,0.25)"
                  : isActive
                    ? "#fff"
                    : "rgba(255,255,255,0.6)"
              }
            />
            <Text
              style={[
                styles.pillText,
                isActive && styles.pillTextActive,
                isDisabled && styles.pillTextDisabled,
              ]}
            >
              {sport.label}
            </Text>

            {/* "Soon" badge — shown only for coming-soon sports */}
            {isDisabled && (
              <View style={styles.soonBadge}>
                <Text style={styles.soonText}>Soon</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default React.memo(SportSwitcher);

/* ─── Styles ─────────────────────────────────────────────────────────────── */

const makeStyles = (colors) =>
  StyleSheet.create({
    // const styles = StyleSheet.create({
    scroll: {
      flexGrow: 0,
    },
    container: {
      flexDirection: "row",
      // paddingHorizontal: 16,
      paddingBottom: 14,
      paddingTop: 4,
      gap: 8,
    },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 99,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.18)",
      backgroundColor: "rgba(255,255,255,0.07)",
    },
    pillActive: {
      // Gradient-like look using a solid brand colour; swap to LinearGradient
      // wrapping if you want the exact purple→pink gradient.
      // backgroundColor: "#9810FA",
      backgroundColor: colors.primary,

      borderColor: "transparent",
    },
    pillDisabled: {
      opacity: 0.45,
    },
    pillText: {
      fontSize: 12,
      fontWeight: "600",
      color: "rgba(255,255,255,0.6)",
      letterSpacing: 0.3,
    },
    pillTextActive: {
      color: "#fff",
    },
    pillTextDisabled: {
      color: "rgba(255,255,255,0.3)",
    },
    soonBadge: {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 99,
      paddingHorizontal: 5,
      paddingVertical: 1,
      marginLeft: 2,
    },
    soonText: {
      fontSize: 9,
      color: "rgba(255,255,255,0.55)",
      fontWeight: "600",
      letterSpacing: 0.4,
    },
  });
