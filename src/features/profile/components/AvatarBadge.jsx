import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";

const AvatarBadge = React.memo(({ onAvatarPress, onEditPress, avatarUrl }) => {
  return (
    <LinearGradient
      colors={["#AD46FF", "#F6339A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.avatarGradient}
    >
      <Pressable style={styles.avatarPress} onPress={onAvatarPress}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <Entypo name="user" size={34} color="#fff" />
        )}

        <LinearGradient
          colors={["#2B7FFF", "#00B8DB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.editBadge}
        >
          <Pressable style={styles.editPress} onPress={onEditPress}>
            <Feather name="edit-3" size={12} color="#fff" />
          </Pressable>
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
});

export default AvatarBadge;

const styles = StyleSheet.create({
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
   avatar: {
    width: 70,
    height: 70,
    width:'94%',
    height:'94%',

    borderRadius: 16,
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
});
