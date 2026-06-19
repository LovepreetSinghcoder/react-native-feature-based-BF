import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LevelBadge = React.memo(({ level }) => {
  return (
    <LinearGradient
      colors={["#F0B10033", "#FF690033"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.levelBadge}
    >
      <MaterialCommunityIcons name="crown" size={16} color="#FDC700" />
      <Text style={styles.levelText}>Level {level}</Text>
    </LinearGradient>
  );
});

export default LevelBadge

const styles = StyleSheet.create({

     levelBadge: {
    width: 90,
    height: 30,
    borderColor: "#F0B10070",
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },

  levelText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "700",
    color: "#FDC700",
  },
})