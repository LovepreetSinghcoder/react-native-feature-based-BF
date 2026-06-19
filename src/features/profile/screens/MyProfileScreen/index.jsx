import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";
import { useProfile } from "../../hooks/useProfile";
import { useAlert } from "@shared/feedback/alert/useAlert";
import ActivityLoader from "@shared/components/loaders/ActivityLoader";
import { PermissionsAndroid, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "./styles";
import { useAppSelector } from "../../../../store/hooks";
import { useIsOffline } from "../../../../shared/utils/offlineGuard";

const getUserData = (user) => ({
  avatar:
    user?.avatarUrl ||
    user?.user?.avatarUrl ||
    "https://i.pravatar.cc/150?img=12",

  name: user?.displayName || user?.user?.displayName || "Player",

  username: user?.username || user?.user?.username || "username",
});

/* ------------------ Constants ------------------ */

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
];

const requestGalleryPermission = async () => {
  if (Platform.OS === "android") {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  }

  return true;
};

/* ------------------ Component ------------------ */

const MyProfileScreen = ({ navigation }) => {
  const { showAlert } = useAlert();
  const user = useAppSelector((state) => state.auth.user);
  const { avatar, name, username } = getUserData(user);

  const { tournamentCode, isReady } = {};
  const isOffline = useIsOffline();

  /**
   * Single boolean all queries and effects consult.
   *
   * False when:
   *  - Tournament context hasn't resolved yet
   *  - Device is offline
   *  - tournamentCode is missing (defensive; isReady should cover this)
   */
  const isQueryEnabled = isReady && !isOffline && !!tournamentCode;

  /**
   * Pass `undefined` when not ready so React Query doesn't cache
   * results under an empty / stale tournament key.
   */
  const code = isQueryEnabled ? tournamentCode : undefined;

  const {
    user: updatedUser,
    loading,
    updateProfile,
    getTeamName,
    createTeamName,
    updateTeamName,
  } = useProfile();

  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [displayName, setDisplayName] = useState(name);
  const [teamName, setTeamName] = useState("Pizza");
  const [originalTeamName, setOriginalTeamName] = useState("");
  const [teamExists, setTeamExists] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ------------------ Init from user ------------------ */

  useEffect(() => {
    if (updatedUser) {
      setDisplayName(updatedUser?.displayName || "");
      setTeamName(updatedUser?.teamName || "Pizza");
      setSelectedAvatar(updatedUser?.avatarUrl || avatars[0]);
    }
  }, [updatedUser]);

  useEffect(() => {
    if (!isQueryEnabled) return;
    const loadTeamName = async () => {
      try {
        const res = await getTeamName(code);

        const name = res?.teamName || "";
        setTeamName(name || "Pizza");
        setOriginalTeamName(name);
        setTeamExists(!!name);
      } catch (err) {
        setTeamName("Pizza");
        setOriginalTeamName("");
        setTeamExists(false);
      }
    };

    loadTeamName();
  }, [isQueryEnabled]);

  /* ------------------ Handlers ------------------ */

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const validate = () => {
    if (!displayName.trim()) {
      showAlert({ title: "Error", message: "Display name is required" });
      return false;
    }
    if (!teamName.trim()) {
      showAlert({ title: "Error", message: "Team name is required" });
      return false;
    }
    return true;
  };

  const handleSave = useCallback(async () => {
    if (saving || loading) return;
    if (!validate()) return;

    try {
      setSaving(true);

      await updateProfile({
        displayName: displayName.trim(),
        teamName: teamName.trim(),
        avatarUrl: selectedAvatar,
      });

      showAlert({
        title: "Updated",
        message: "Profile updated successfully!",
        confirmText: "Ok",
        variant: "success",
      });

      navigation.goBack();
    } catch (err) {
      showAlert({
        title: "Error",
        message: "Failed to update profile. Try again.",
        variant: "error",
      });
    } finally {
      setSaving(false);
    }
  }, [displayName, teamName, selectedAvatar, saving, loading]);

  const pickImage = useCallback(async () => {
    try {
      const hasPermission = await requestGalleryPermission();

      if (!hasPermission) {
        showAlert({
          title: "Permission Required",
          message: "Please allow gallery access to select a profile picture.",
        });
        return;
      }

      launchImageLibrary(
        {
          mediaType: "photo",
          quality: 0.8,
        },
        (response) => {
          if (response?.didCancel) return;

          if (response?.errorCode) {
            showAlert({
              title: "Error",
              message: "Failed to pick image",
            });
            return;
          }

          const uri = response?.assets?.[0]?.uri;
          if (uri) setSelectedAvatar(uri);
        },
      );
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Something went wrong",
      });
    }
  }, [showAlert, setSelectedAvatar]);

  /* ------------------ Render ------------------ */

  return (
    <ScreenWrapper style={{ paddingHorizontal: 16 }}>
      {(loading || saving) && <ActivityLoader visible />}

      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="light" />

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} hitSlop={10}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* AVATAR */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: selectedAvatar }}
              style={styles.avatar}
              onError={() => setSelectedAvatar(avatars[0])}
            />

            <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
              <Ionicons name="camera-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.avatarText}>Tap to change avatar</Text>
        </View>

        {/* AVATAR LIST */}
        <Text style={styles.sectionTitle}>Select Quick Avatar</Text>

        <View style={styles.avatarListContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((item, index) => {
              const isSelected = selectedAvatar === item;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAvatar(item)}
                  style={[
                    styles.avatarItem,
                    isSelected && styles.selectedAvatarItem,
                  ]}
                >
                  <Image source={{ uri: item }} style={styles.avatarSmall} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* INPUTS */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Display Name*</Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
            placeholder="Enter display name"
            placeholderTextColor="#aaa"
          />

          {/* <Text style={styles.label}>Team Name*</Text>
          <TextInput
            value={teamName}
            onChangeText={setTeamName}
            style={styles.input}
            placeholder="Enter team name"
            placeholderTextColor="#aaa"
          /> */}
        </View>

        {/* SAVE */}
        <TouchableOpacity
          style={[styles.saveBtn, (loading || saving) && styles.disabledBtn]}
          onPress={handleSave}
          disabled={loading || saving}
        >
          <Text style={styles.saveText}>
            {saving ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MyProfileScreen;
