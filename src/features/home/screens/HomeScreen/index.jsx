import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ScreenWrapper from "@layout/ScreenWrapper";
import BottomSpacing from "@layout/BottomSpacing";
import HomeScreenSkeleton from "../HomeScreen.skeleton";
import { logger } from "../../../../lib/events/logger";

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  // ── Sport preference ────────────────────────────────────────────────────
  const { sports, selectedSport, selectSport, isPreferenceReady } = {};

  // Use code as the canonical identifier — matches what SportSwitcher compares
  const selectedSportCode = selectedSport?.code ?? null;

  const navigateTo = useCallback(
    (screen, params) => navigation.navigate(screen, params),
    [navigation],
  );

  // Show skeleton only on true first load, not on pull-to-refresh
  const showSkeleton = homeData.isLoading && !homeData.refreshing && isFocused;

  const handleSportSelect = useCallback(
    (code) => {
      // Build full sport object from the API list — never construct a partial object
      const sport = sports.find((s) => s.code === code);
      if (!sport) {
        console.warn("[HomeScreen] handleSportSelect — unknown code:", code);
        return;
      }
      selectSport(sport);
    },
    [sports, selectSport],
  );

  return (
    <ScreenWrapper>
      <StatusBar style="light" />
      {showSkeleton && !isPreferenceReady ? (
        <HomeScreenSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              // refreshing={homeData.refreshing}
              // onRefresh={homeData.onRefresh}
              tintColor="#fff"
              colors={["#AD46FF", "#00B8DB"]}
            />
          }
        >
          <Text>Home Body</Text>
          <BottomSpacing />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;
