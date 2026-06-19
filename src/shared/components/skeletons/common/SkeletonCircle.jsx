import React from "react";
import SkeletonBox from "./SkeletonBox";
import colors from "@theme/colors";

const SkeletonCircle = ({ size = 40, style }) => {
  return (
    <SkeletonBox
      width={size}
      height={size}
      borderRadius={size / 2}
      style={[{ backgroundColor: "rgba(255,255,255,0.12)" }, style]}
    />
  );
};

export default SkeletonCircle;
