import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import styles from "./styles";
import { safeDispatch } from "../../../../shared/utils/offlineGuard";
import { deleteAccount } from "../../../../store/slices/authSlice";
import { useAlert } from "../../../../shared/feedback/alert/useAlert";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ROUTES } from "../../../../navigation/routes";

import GradientButton from "@ui/GradientButton";

const getUserData = (user) => ({
  username: user?.username || user?.user?.username || "username",
});

const ConfirmDeleteAccountScreen = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { username: USERNAME } = getUserData(user);
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");

  const handleDelete = useCallback(() => {
    if (USERNAME !== username.trim()) {
      showAlert({
        title: "Invalid Username",
        message: "Entered username does not match your account username.",
        confirmText: "OK",
        variant: "error",
      });

      return;
    }
    showAlert({
      title: "Delete Account",
      message:
        "Are you sure you want to permanently delete your account? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "warning",

      onConfirm: async () => {
        try {
          const res = await dispatch(deleteAccount()).unwrap();

          showAlert({
            title: "Success",
            message: res.message || "Account deleted successfully.",
            confirmText: "Ok",
            variant: "success",
          });

          /**
           * OPTIONAL:
           * Navigate user to auth stack/login
           */

          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: "AuthStack" }],
          // });
        } catch (err) {
          showAlert({
            title: "Error",
            message: err || "Failed to delete account.",
            confirmText: "Ok",
            variant: "error",
          });
        }
      },
    });
  }, [dispatch, showAlert, username]);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <StatusBar style="light" />

      <View style={styles.confirmContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ACCOUNT_STATUS)}>
            {/* <Ionicons name="chevron-back" size={24} color="#fff" /> */}
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Confirm Account Removal</Text>
        </View>

        {/* BODY */}
        <View style={styles.confirmContent}>
          <Text style={styles.confirmHeading}>We are sorry to let you go!</Text>

          <Text style={styles.confirmDescription}>
            Please enter your username to delete your account.
          </Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>
              Username
              <Text style={styles.required}>*</Text>
            </Text>

            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#6f6f6f"
              style={styles.input}
            />
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!username}
            style={[styles.deleteButton, !username && styles.disabledButton]}
            onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ConfirmDeleteAccountScreen;
