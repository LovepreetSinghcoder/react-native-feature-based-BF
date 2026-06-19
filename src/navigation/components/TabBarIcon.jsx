import React, { memo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabBarIcon = ({ name, color, size }) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default memo(TabBarIcon);