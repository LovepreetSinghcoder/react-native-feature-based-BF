import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "@layout/ScreenWrapper";
import { ROUTES } from "../../../../navigation/routes";

const STATUS_CONFIG = {
  inactive: {
    icon: "pause-circle-outline",
    color: "#ffb020",
    title: "Account Inactive",
    description:
      "Your account is currently inactive. Please contact support if you believe this is a mistake.",
  },

  blocked: {
    icon: "ban-outline",
    color: "#ff5c5c",
    title: "Account Restricted",
    description:
      "Your account access has been temporarily restricted due to policy or security reasons.",
  },

  banned: {
    icon: "close-circle-outline",
    color: "#ff3b30",
    title: "Account Suspended",
    description:
      "Your account has been suspended. Please contact support for additional information.",
  },

  under_review: {
    icon: "time-outline",
    color: "#8b5cf6",
    title: "Account Under Review",
    description:
      "Your account is currently being reviewed. This process may take some time.",
  },
};

const AccountStateScreen = ({
  status = "blocked",
  onContactSupport,
  onClose,
}) => {
  const config = useMemo(() => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.blocked;
  }, [status]);

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        {/* CLOSE */}
        {!!onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        )}

        {/* ICON */}
        <View style={styles.iconWrapper}>
          <Ionicons name={config.icon} size={64} color={config.color} />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{config.title}</Text>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>{config.description}</Text>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buttonWrapper}
          onPress={onContactSupport}
        >
          <LinearGradient
            colors={["#7c3aed", "#9333ea"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Contact Support</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* FOOTER */}
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.link}>Terms & Policies</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default AccountStateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 32,
    paddingHorizontal: 28,
    paddingVertical: 36,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    padding: 6,
  },

  iconWrapper: {
    marginBottom: 24,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  desc: {
    color: "#a1a1aa",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 34,
  },

  buttonWrapper: {
    width: "100%",
    marginBottom: 22,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  link: {
    color: "#8b8b93",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
