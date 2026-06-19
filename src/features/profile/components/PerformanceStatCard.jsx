// components/PerformanceStatCard.js

import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import StatBox from "./StatBox";
import colors from "@theme/colors";

const PerformanceStatCard = React.memo(({ stats }) => {
  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <MaterialIcons name="show-chart" size={22} color="green" />
        <Text style={styles.title}>Performance Stats</Text>
      </View>

      <View style={styles.grid}>
        {stats.map((stat) => (
          <StatBox
            key={stat.id}
            value={stat.value}
            label={stat.title}
          />
        ))}
      </View>

    </View>
  );
});

export default PerformanceStatCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,

    backgroundColor: colors.cardGlass,
    borderColor: colors.glassBorder,
    borderRadius: 16,
    padding: 20,
    marginTop: 20
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 6,
    color: "#fff"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10
  }
});