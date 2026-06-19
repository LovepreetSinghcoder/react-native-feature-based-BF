import React from "react";
import SkeletonCircle from "./SkeletonCircle";

const SkeletonAvatar = ({ size = 60, style }) => {
  return <SkeletonCircle size={size} style={style} />;
};

export default SkeletonAvatar;
