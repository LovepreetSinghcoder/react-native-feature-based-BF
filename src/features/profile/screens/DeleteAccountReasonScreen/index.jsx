import React, { useCallback, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import styles from "./styles";
import { ROUTES } from "../../../../navigation/routes";

const REASONS = [
  "I need a break",
  "Too busy right now",
  "Hard to play",
  "Technical issues",
  "Other",
];

const CheckboxItem = React.memo(({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.checkboxRow}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Ionicons name="checkmark" size={18} color="#fff" />}
      </View>

      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
});

const DeleteAccountReasonScreen = () => {
  const navigation = useNavigation();

  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleReason = useCallback((reason) => {
    setSelectedReasons((prev) => {
      if (prev.includes(reason)) {
        return prev.filter((item) => item !== reason);
      }

      return [...prev, reason];
    });
  }, []);

  const isDisabled = useMemo(
    () => selectedReasons.length === 0,
    [selectedReasons],
  );

  const handleContinue = useCallback(() => {
    navigation.navigate(ROUTES.CONFIRM_DELETE_ACCOUNT);
  }, [navigation]);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Confirm Account Removal</Text>
        </View>

        {/* CONTENT */}
        <View style={styles.section}>
          <Text style={styles.heading}>Delete Account Permanently?</Text>

          <Text style={styles.description}>
            This action is permanent. All progress, rewards, NFTs, wallet
            balance, transactions, and account data will be deleted forever.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Help Us to Get Better</Text>

          <Text style={styles.description}>
            Your feedback helps us enhance your experience. Feel free to skip if
            you'd like.
          </Text>

          <View style={styles.checkboxContainer}>
            {REASONS.map((reason) => (
              <CheckboxItem
                key={reason}
                label={reason}
                selected={selectedReasons.includes(reason)}
                onPress={() => toggleReason(reason)}
              />
            ))}
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.8}
            style={[styles.primaryButton, isDisabled && styles.disabledButton]}
            onPress={handleContinue}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DeleteAccountReasonScreen;
