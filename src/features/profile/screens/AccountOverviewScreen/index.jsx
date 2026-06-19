import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SkeletonBox } from "@shared/components/skeletons/common";
import { authService } from "@lib/services/auth.service";
import styles from "./styles";
import { useProfile } from "@features/profile/hooks/useProfile";

/* ------------------ Helpers ------------------ */

const getInitial = (email) => {
  if (typeof email !== "string" || email.length === 0) return "?";
  return email.charAt(0).toUpperCase();
};

/* ------------------ Component ------------------ */

const AccountOverviewScreen = () => {
  const navigation = useNavigation();
  const { user, loading: profileLoading } = useProfile();

  // const user = useSelector((state) => state.auth.user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = user?.email || profile?.email || "";

  const fetchProfile = useCallback(async () => {
    let isMounted = true;

    try {
      const response = await authService.getProfile();
      if (!isMounted) return;

      setProfile(response?.user || response || null);
    } catch (error) {
      console.warn("Profile fetch failed", error);
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchProfile();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [fetchProfile]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Account Overview</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatar}>
            {loading ? (
              <SkeletonBox width={40} height={40} borderRadius={99} />
            ) : (
              <Text style={styles.avatarText}>{getInitial(email)}</Text>
            )}
          </View>

          {/* Email */}
          {loading ? (
            <SkeletonBox width={190} height={24} borderRadius={8} />
          ) : (
            <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
              {email || "No email available"}
            </Text>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AccountOverviewScreen;
