// src/features/home/screens/components/UpcomingMatchCard.jsx
//
// Changes vs previous version:
//   • Header gradient now shows:
//       left  → "Transfers close in  {transferClosesIn}"  (red countdown)
//       right → match date string  e.g. "Sun, May 25"
//   • Falls back to the existing <CountdownTimer> when no transferClosesIn prop
//     is passed, so old callers don't break
//   • All other props (teamCount, isTeamLoading, onPress, match) unchanged

import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import TeamBlock from "./TeamBlock";
import CountdownTimer from "./CountdownTimer";
import GradientButton from "@ui/GradientButton";
import styles from "../styles";
import { logger } from "../../../../lib/events/logger";

const UpcomingMatchCard = React.memo(
  ({ match, teamCount, isTeamLoading = false, onPress }) => {
    if (!match) return null;

    /* ── Header: prefer transferClosesIn string; fall back to CountdownTimer ── */
    const renderHeader = () => {
      if (match.transferClosesIn) {
        return (
          <LinearGradient
            colors={["rgba(78,6,210,0.35)", "rgba(181,112,254,0.20)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={headerStyles.row}
          >
            <Text style={headerStyles.closesLabel}>
              Transfers close in{" "}
              <Text style={headerStyles.closesTime}>
                {match.transferClosesIn}
              </Text>
            </Text>
            {match.date ? (
              <Text style={headerStyles.dateText}>{match.date}</Text>
            ) : null}
          </LinearGradient>
        );
      }

      // Legacy fallback — existing CountdownTimer behaviour preserved
      return (
        <LinearGradient
          colors={["#4E06D230", "#B570FE30"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientUpComingCont}
        >
          <CountdownTimer targetDate={match.scheduledAt} />
        </LinearGradient>
      );
    };

    /* ── CTA button ── */
    const renderButton = () => {
      if (isTeamLoading) {
        return (
          <View style={[styles.teamBtn, styles.teamBtnLoading]}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        );
      }
      return (
        <GradientButton
          title={teamCount > 0 ? "Manage Team" : "Create Team"}
          onPress={onPress}
          colors={["#9810FA", "#E60076"]}
          style={styles.teamBtn}
        />
      );
    };

    return (
      <View style={[styles.card, { padding: 0, overflow: "hidden" }]}>
        {/* ── Header stripe ── */}
        <View style={styles.rowBetweenUpcomingCard}>{renderHeader()}</View>

        {/* ── Teams row ── */}
        <View
          style={[
            styles.matchRow,
            styles.matchRowUpComing,
            { paddingVertical: 16 },
          ]}
        >
          <TeamBlock
            team={match.teamA}
            img={match.teamAImg}
            fullName={match.teamAFullName}
            gradient={["#155DFC", "#51A2FF"]}
          />

          <View style={[styles.center, styles.upComingCenter]}>
            <Text style={styles.vs}>{match.day},</Text>
            <Text style={styles.vs}>{match.time}</Text>
          </View>

          <TeamBlock
            team={match.teamB}
            img={match.teamBImg}
            fullName={match.teamBFullName}
            gradient={["#F0B100", "#FFDF20"]}
            isRight={true}
          />
        </View>

        {/* ── CTA ── */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {renderButton()}
        </View>
      </View>
    );
  },
);

export default UpcomingMatchCard;

/* ─── Local header styles ────────────────────────────────────────────────── */
const headerStyles = {
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  closesLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  closesTime: {
    color: "#FF6467",
    fontWeight: "700",
  },
  dateText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
  },
};
