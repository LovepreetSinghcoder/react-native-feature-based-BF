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

/* ------------------ Reusable Item ------------------ */

const MenuItem = memo(({ icon, label, onPress, isDanger }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
    accessibilityRole="button">
    <View style={styles.left}>
      <Ionicons name={icon} size={20} color={isDanger ? "#ff3b30" : "#fff"} />
      <Text style={[styles.text, isDanger && styles.dangerText]}>{label}</Text>
    </View>

    {!isDanger && <Ionicons name="chevron-forward" size={20} color="#aaa" />}
  </TouchableOpacity>
));

/* ------------------ Screen ------------------ */

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const [loggingOut, setLoggingOut] = useState(false);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const goToAccount = useCallback(() => {
    navigation.navigate(ROUTES.ACCOUNT_OVERVIEW);
  }, [navigation]);

  const goToAccountStatus = useCallback(() => {
    navigation.navigate(ROUTES.ACCOUNT_STATUS);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    if (loggingOut) return;

    showAlert({
      title: "Logout",
      message: "Are you sure you want to logout?",
      variant: "warning",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          setLoggingOut(true);
          await dispatch(logoutAction());
        } catch (err) {
          showAlert({
            title: "Error",
            message: "Logout failed",
            variant: "error",
          });
        } finally {
          setLoggingOut(false);
        }
      },
    });
  }, [dispatch, showAlert, loggingOut]);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <MenuItem
            icon="key-outline"
            label="Account Overview"
            onPress={goToAccount}
          />
          <View style={styles.divider} />

          <MenuItem
            icon="man"
            label="Account Status"
            onPress={goToAccountStatus}
          />

          <View style={styles.divider} />

          <MenuItem
            icon="log-out-outline"
            label={loggingOut ? "Logging out..." : "Logout"}
            onPress={handleLogout}
            isDanger
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SettingsScreen;

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 30,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },

  dangerText: {
    color: "#ff3b30",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 10,
  },
});
