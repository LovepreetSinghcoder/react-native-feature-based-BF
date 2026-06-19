import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AvatarBadge from "./AvatarBadge";
import LevelBadge from "./LevelBadge";
import StatCard from "./StatCard";
import colors from "@theme/colors";



const ProfileHeaderCard = ({
  name,
  username,
  level,
  rank,
  stats,
  onAvatarPress,
  onEditPress,
  avatarUrl
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AvatarBadge onAvatarPress={onAvatarPress} onEditPress={onEditPress} avatarUrl={avatarUrl}/>

         <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{username}</Text>

          <View style={styles.badgeRow}>
            <LevelBadge level={level} />

            <View style={styles.rankBox}>
              <Text style={styles.rankText}>Rank #{rank}</Text>
            </View>
          </View>
        </View>
      </View>

       <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </View>
    </View>
  );
};

export default ProfileHeaderCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: colors.cardGlass,
    borderColor: colors.glassBorder,
    borderRadius: 26,
    marginVertical: 5,
    padding: 25,
  },

  row: {
    flexDirection: "row",
  },

  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },

  avatarPress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  editBadge: {
    flex: 1,
    width: 28,
    height: 28,
    borderRadius: 10,
    position: "absolute",
    bottom: -5,
    right: -5,
  },

  editPress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  userInfo: {
    marginHorizontal: 20,
    flex: 1,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },

  username: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF99",
    paddingVertical: 10,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

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

  rankBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 0.7,
    borderColor: "rgba(255,255,255,0.28)",
    borderRadius: 26,
    marginVertical: 10,
    padding: 10,
  },

  rankText: {
    color: "#ffffff80",
    fontSize: 12,
    fontWeight: "500",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

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
});
