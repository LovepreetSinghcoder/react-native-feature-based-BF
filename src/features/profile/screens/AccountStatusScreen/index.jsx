import React, { useCallback, useState, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@store/slices/authSlice";
import { useAlert } from "@shared/feedback/alert/useAlert";
import { ROUTES } from "../../../../navigation/routes";
import styles from "./styles";

/* ------------------ Reusable Item ------------------ */

const MenuItem = memo(({ icon, label, onPress, isDanger }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button">
    <View style={styles.left}>
      <Text style={[styles.text, isDanger && styles.dangerText]}>{label}</Text>
      <Text style={styles.bottomText}>This will erase all data forever</Text>
    </View>

    {!isDanger && <Ionicons name="chevron-forward" size={20} color="#aaa" />}
  </TouchableOpacity>
));

/* ------------------ Screen ------------------ */

const AccountStatusScreen = () => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToAccountDeleteReason = useCallback(() => {
    navigation.navigate(ROUTES.DELETE_ACCOUNT_REASON);
  }, [navigation]);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Account Status</Text>
        </View>

        <Text style={styles.headerText}>
          Manage your data, update legacy contacts, and control account or
          profile deletion.
        </Text>

        {/* CARD */}
        <View style={styles.card}>
          {/* <View style={styles.divider} /> */}

          <MenuItem label="Delete Account" onPress={goToAccountDeleteReason} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AccountStatusScreen;
