import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    text: "Transfers closing soon. Make your final changes",
    icon: "alarm-outline",
    colors: ["#ff9a00", "#ff6a00"],
    unread: true,
  },
  {
    id: "2",
    text: "Today's match is live. Check your team",
    icon: "flame-outline",
    colors: ["#ffcc00", "#ff8c00"],
  },
  {
    id: "3",
    text: "Boosters are live. Use them to maximize points.",
    icon: "flash-outline",
    colors: ["#ff2d95", "#ff0066"],
  },
  {
    id: "4",
    text: "Your captain is delivering big points.",
    icon: "star-outline",
    colors: ["#7b5cff", "#a066ff"],
  },
  {
    id: "5",
    text: "Match ended. You scored 112 points.",
    icon: "trending-up-outline",
    colors: ["#00c853", "#69f0ae"],
  },
  {
    id: "6",
    text: "Create your first team to get started",
    icon: "people-outline",
    colors: ["#4facfe", "#00f2fe"],
  },
  {
    id: "7",
    text: "Deadline near. Set your captain and vice-captain",
    icon: "alarm-outline",
    colors: ["#ff9a00", "#ff6a00"],
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      {/* unread dot */}
      {item.unread && <View style={styles.dot} />}

      <View style={styles.card}>
        {/* ICON */}
        <LinearGradient colors={item.colors} style={styles.iconBox}>
          <Ionicons name={item.icon} size={20} color="#fff" />
        </LinearGradient>

        {/* TEXT */}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#4a148c"]}
      style={{ flex: 1 }}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Notification</Text>

          <TouchableOpacity>
            <Text style={styles.mark}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {/* LIST */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </LinearGradient>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  mark: {
    color: "#ddd",
    fontSize: 14,
  },

  cardWrapper: {
    marginBottom: 16,
    position: "relative",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00e5ff",
    position: "absolute",
    left: -12,
    top: "50%",
    marginTop: -4,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 18,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  text: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
});
