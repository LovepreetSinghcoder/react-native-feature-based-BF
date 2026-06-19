

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProfileTabs = ({ tabs = [], activeTab, onChange }) => {

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {

        const isActive = tab === activeTab;

        return (
          <LinearGradient
            key={tab}
            colors={
              isActive
                ? ["#AD46FF4D", "#F6339A4D"]
                : ["#ffffff02", "#ffffff02"]
            }
            style={styles.tab}
          >
            <Pressable
              onPress={() => onChange?.(tab)}
              style={styles.press}
            >
              <Text
                style={[
                  styles.text,
                  { color: isActive ? "#fff" : "#ffffff50" }
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          </LinearGradient>
        );

      })}
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 0.7,
    borderColor: "rgba(255,255,255,0.28)",
    borderRadius: 16,
    padding: 5,
    marginTop: 20
  },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: 16,
    marginHorizontal: 2
  },
  press: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 14,
    fontWeight: "500"
  }
});