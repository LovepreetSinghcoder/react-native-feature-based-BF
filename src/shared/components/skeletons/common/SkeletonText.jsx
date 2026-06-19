import React from "react";
import { View, Text } from "react-native";
import SkeletonBox from "./SkeletonBox";
import colors from "@theme/colors";

const SkeletonText = ({ width = "60%", lines = 1, style }) => {
  return (
    <View style={[{ gap: 4 }, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          height={16}
          width={width}
          borderRadius={8}
          style={{ backgroundColor: colors.cardGlass }}
        />
      ))}
    </View>
  );
};

export default SkeletonText;
