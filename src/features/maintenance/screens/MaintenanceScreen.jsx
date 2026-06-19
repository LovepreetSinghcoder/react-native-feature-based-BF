import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@theme/colors";
import spacing from "@theme/spacing";
import GradientButton from "@shared/components/ui/GradientButton";
import { useDispatch } from "react-redux";
import { setMaintenance } from "@store/slices/uiSlice";
import { useOfflineAlert } from "@shared/hooks/useOfflineAlert";
import { useAlert } from "../../../shared/feedback/alert/useAlert";

const MaintenanceScreen = ({ navigation }) => {
  const { showAlert } = useAlert();
  const dispatch = useDispatch();
  let test = false;
  const handleRetry = () => {
    dispatch(setMaintenance(false));
  };

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[colors.primary, colors.accent]}
                style={styles.iconGradient}>
                <MaterialIcons name="build" size={48} color={colors.white} />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Under Maintenance</Text>
            <Text style={styles.subtitle}>
              We're working hard to improve your experience
            </Text>
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <Text style={styles.message}>
              Our team is currently performing scheduled maintenance on our
              servers. This helps us bring you an even better fantasy cricket
              experience with improved performance and new features.
            </Text>

            <Text style={styles.sectionTitle}>What you can do:</Text>

            <View style={styles.tipsContainer}>
              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.tipText}>Check back in a few minutes</Text>
              </View>

              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Ionicons
                    name="wifi-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.tipText}>
                  Verify your internet connection
                </Text>
              </View>

              <View style={styles.tipItem}>
                <View style={styles.tipIcon}>
                  <Ionicons
                    name="refresh-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.tipText}>Try refreshing the app later</Text>
              </View>
            </View>
          </View>

          {/* Action Section */}
          <View style={styles.actionSection}>
            {/* <GradientButton
              title="Try Again"
              onPress={handleRetry}
              colors={[colors.primary, colors.accent]}
              style={styles.retryButton}
              styleTxt={styles.retryButtonText}
              icon={<Ionicons name="refresh" size={20} color={colors.white} />}
            /> */}

            <Text style={styles.footer}>Thank you for your patience! 🚀</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: "space-between",
    minHeight: "100%",
  },
  headerSection: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.textWhite,
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  contentSection: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textWhite,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  tipsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.overlayLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  tipText: {
    fontSize: 16,
    color: colors.textWhite,
    flex: 1,
    lineHeight: 22,
  },
  actionSection: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  retryButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    marginBottom: spacing.lg,
    paddingHorizontal: 10,
    paddingLeft: 15,
  },
  retryButtonText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    fontSize: 14,
    color: colors.textTertiary,
    textAlign: "center",
  },
});

export default MaintenanceScreen;
