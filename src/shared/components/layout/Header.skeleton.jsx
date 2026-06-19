import React from "react";
import { View } from "react-native";
// import { SkeletonText, SkeletonCircle } from "../../skeletons/common";
import SkeletonText from "../skeletons/common/SkeletonText";
import SkeletonCircle from "../skeletons/common/SkeletonCircle";
import colors from "../../../theme/colors";

const HeaderSkeleton = ({ title = true }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}>
      {title && <SkeletonText width="40%" lines={1} />}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <SkeletonCircle size={32} />
        <SkeletonCircle size={32} />
      </View>
    </View>
  );
};

export default HeaderSkeleton;
