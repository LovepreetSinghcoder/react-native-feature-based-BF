import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StatCard = React.memo(({ value, label }) => {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
});

export default StatCard

const styles = StyleSheet.create({

    statBox: {
    width: "31%",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    height: 67,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  statLabel: {
    fontSize: 13,
    fontWeight: "400",
    color: "#ffffff60",
  },
})