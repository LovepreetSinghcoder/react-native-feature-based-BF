import React from "react";
import { FlatList, StatusBar, View } from "react-native";
import ScreenWrapper from "@layout/ScreenWrapper";
import BottomSpacing from "@layout/BottomSpacing";
import TopSpacing from "@layout/TopSpacing";

// import HomeSkeleton from "@skeletons/homeScreen/HomeSkeleton"; // Existing, but create new for consistency
import SkeletonBox from "../../../shared/components/skeletons/common/SkeletonBox";

const HomeScreenSkeleton = () => {
  const HomeTitleSkeleton = () => (
    <SkeletonBox
      width={150}
      height={30}
      borderRadius={12}
      style={{ marginBottom: 18, marginHorizontal: 20 }}
    />
  );

  const HomeCardSkeleton = ({
    width = "90%",
    height = 160,
    borderRadius = 24,
    marginBottom = 25,
  }) => (
    <SkeletonBox
      width={width}
      height={height}
      borderRadius={borderRadius}
      style={{ marginBottom, marginHorizontal: 20 }}
    />
  );

  return (
    <>
      <StatusBar style="light" />
      <TopSpacing style={{ paddingTop: 35 }} />

      <HomeTitleSkeleton />

      <HomeCardSkeleton />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          // paddingHorizontal: 20,
        }}>
        <HomeCardSkeleton
          width={100}
          height={30}
          borderRadius={18}
          marginBottom={18}
        />
        <HomeCardSkeleton
          width={70}
          height={20}
          borderRadius={18}
          marginBottom={18}
        />
      </View>
      <HomeCardSkeleton
        width={"90%"}
        height={100}
        borderRadius={18}
        marginBottom={18}
        style={{ marginHorizontal: 20 }}
      />
      {/* <HomeCardSkeleton /> */}

      <HomeCardSkeleton
        width={100}
        height={30}
        borderRadius={18}
        marginBottom={18}
      />
      <HomeCardSkeleton />
      <HomeCardSkeleton />

      <HomeTitleSkeleton />
    </>
  );
};

export default HomeScreenSkeleton;
