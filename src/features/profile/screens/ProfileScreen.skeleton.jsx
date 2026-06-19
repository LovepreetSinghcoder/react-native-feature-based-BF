import React, { memo, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import TopSpacing from "@shared/components/layout/TopSpacing";
import BottomSpacing from "@shared/components/layout/BottomSpacing";
import Header from "@shared/components/layout/Header";

import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonBox,
} from "@shared/components/skeletons/common";
import SkeletonCircle from "@shared/components/skeletons/common/SkeletonCircle";

import colors from "@theme/colors";
import styles from "./ProfileScreen";

/* ------------------ Reusable Blocks ------------------ */

const RowPlaceholders = memo(({ count, width, height }) => {
  const items = useMemo(() => Array.from({ length: count }), [count]);

  return items.map((_, i) => (
    <SkeletonBox key={i} width={width} height={height} borderRadius={12} />
  ));
});

/* ------------------ Main ------------------ */

const ProfileScreenSkeleton = () => {
  const tabPlaceholders = useMemo(() => Array.from({ length: 3 }), []);
  const statsPlaceholders = useMemo(() => Array.from({ length: 4 }), []);
  const accountRows = useMemo(() => Array.from({ length: 4 }), []);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <StatusBar style="light" />

        <TopSpacing />

        <Header
          title=""
          rightIcons={[
            <SkeletonCircle key="icon1" size={24} />,
            <SkeletonCircle key="icon2" size={24} />,
          ]}
        />

        {/* Profile Header */}
        <View style={[styles.performanceSection, localStyles.mt20]}>
          <SkeletonAvatar size={80} style={localStyles.centeredAvatar} />

          <View style={localStyles.rowSpace}>
            <RowPlaceholders count={3} width={60} height={40} />
          </View>

          <SkeletonText lines={1} width="80%" style={localStyles.center} />
        </View>

        {/* Tabs */}
        <View style={localStyles.tabsContainer}>
          {tabPlaceholders.map((_, i) => (
            <SkeletonBox key={i} width={80} height={40} borderRadius={20} />
          ))}
        </View>

        {/* Performance Stats */}
        <View style={styles.performanceSection}>
          <View style={styles.sectionHeaderRow}>
            <SkeletonCircle size={24} />
            <SkeletonBox width={120} height={20} />
          </View>

          <View style={styles.statsContent}>
            <View style={styles.statsRow}>
              <RowPlaceholders count={2} width="48%" height={84} />
            </View>

            <View style={[styles.statsRow, styles.statsBottomRow]}>
              <RowPlaceholders count={2} width="48%" height={84} />
            </View>
          </View>
        </View>

        {/* Account Info */}
        <View style={styles.accountSection}>
          <View style={styles.sectionHeaderRow}>
            <SkeletonCircle size={24} />
            <SkeletonBox width={100} height={20} />
          </View>

          <View style={styles.accountSectionContent}>
            {accountRows.map((_, i) => (
              <View key={i} style={styles.infoRow}>
                <SkeletonText lines={1} width="50%" />
                <SkeletonText lines={1} width="30%" />
              </View>
            ))}
          </View>
        </View>

        {/* Logout (non-interactive skeleton) */}
        <View style={styles.logoutButton}>
          <SkeletonBox height={20} width="50%" borderRadius={10} />
        </View>

        <BottomSpacing />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default memo(ProfileScreenSkeleton);

/* ------------------ Local Styles ------------------ */

const localStyles = StyleSheet.create({
  mt20: {
    marginTop: 20,
  },

  centeredAvatar: {
    alignSelf: "center",
    marginBottom: 16,
  },

  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },

  center: {
    alignSelf: "center",
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
