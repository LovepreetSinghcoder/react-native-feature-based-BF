/**
 * ProfileScreen.jsx
 *
 * Displays the authenticated user's profile with:
 *  - Hero card  (avatar · name · badge · rank · quick stats)
 *  - Active-sport pill filter  (scrollable, theme-aware)
 *  - Menu sections  (Account / Preferences / Legal & Support)
 *  - Notification toggle  (local state; wire to a store when the API is ready)
 *  - Sign-out button
 *
 * Design reference: mpl_profile_screen_redesign-confirm.html
 *
 * Conventions
 * ─────────────────────────────────────────────────────────────────────────────
 *  • Colors come exclusively from useTheme() — never hardcoded hex values.
 *  • Static data is used wherever the API is not ready yet; each mock section
 *    is marked with  "TODO(api):"  so the BE team can swap it in.
 *  • Navigation uses ROUTES constants so screen names stay in sync.
 *  • Components are split by responsibility; heavy sub-components are memoised.
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenWrapper from "@shared/components/layout/ScreenWrapper";

import { useTheme } from "@shared/hooks/useTheme";
import { ROUTES } from "@navigation/routes";
import BottomSpacing from "@layout/BottomSpacing";
import { useProfile } from "@features/profile/hooks/useProfile";
import { logger } from "../../../../lib/events/logger";

// /* ------------------ Helpers ------------------ */

const getUserData = (user) => ({
  avatar:
    user?.avatarUrl ??
    user?.user?.avatarUrl ??
    "https://i.pravatar.cc/150?img=12",

  name: user?.displayName ?? user?.user?.displayName ?? "-",

  username: user?.username ?? user?.user?.username ?? "-",
});

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES  (JSDoc — keeps it readable without TypeScript overhead)
───────────────────────────────────────────────────────────────────────────── */

/**
 * @typedef {{ id: string, label: string, dotColor: string }} Sport
 *
 * @typedef {{
 *   iconName: string,
 *   iconColor: string,
 *   iconBg: string,
 *   title: string,
 *   subtitle?: string,
 *   badge?: string,
 *   route?: string,
 *   onPress?: () => void,
 * }} MenuItem
 *
 * @typedef {{ title: string, items: MenuItem[] }} MenuSection
 */

/* ─────────────────────────────────────────────────────────────────────────────
   HERO CARD
───────────────────────────────────────────────────────────────────────────── */

const HeroCard = React.memo(({ user, colors }) => {
  const styles = useHeroStyles(colors);

  return (
    <LinearGradient
      colors={["rgba(45,26,110,1)", "rgba(26,15,74,1)", "rgba(15,7,48,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Decorative blobs (purely visual) */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      {/* Top row: avatar · info · rank */}
      <View style={styles.topRow}>
        {/* Avatar with gradient ring */}
        <LinearGradient
          colors={colors.gradientBrand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarRing}
        >
          <View style={styles.avatarInner}>
            <Text style={styles.avatarInitial}>{user.initials}</Text>
          </View>
        </LinearGradient>

        {/* Name / username / tier badge */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userHandle}>@{user.username}</Text>
          <View style={styles.tierBadge}>
            <View style={styles.tierDot} />
            <Text style={styles.tierText}>{user.tier}</Text>
          </View>
        </View>

        {/* Global rank chip */}
        {user.globalRank !== null && (
          <View style={styles.rankChip}>
            <Text style={styles.rankText}>🏆 Rank #{user.globalRank}</Text>
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatCell label="Matches" value={user.stats.matches} />
        <View style={styles.statDivider} />
        <StatCell label="Wins" value={user.stats.wins} />
        <View style={styles.statDivider} />
        <StatCell label="Total pts" value={user.stats.totalPoints} />
      </View>
    </LinearGradient>
  );
});

const StatCell = React.memo(({ label, value }) => {
  const { colors } = useTheme();
  const s = useMemo(() => statCellStyles(colors), [colors]);
  return (
    <View style={s.cell}>
      <Text style={s.value}>{value}</Text>
      <Text style={s.label}>{label}</Text>
    </View>
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   SPORT PILLS
───────────────────────────────────────────────────────────────────────────── */

/** @param {{ sports: Sport[], selectedId: string, onSelect: (id:string) => void, colors: object }} props */
const SportPillRow = React.memo(
  ({ sports, selectedSport, onSelect, colors }) => {
    const s = useMemo(() => sportPillStyles(colors), [colors]);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.container}
      >
        {sports.map((sport) => {
          const isActive = sport.id === selectedSport?.id;

          const SPORT_ROW = {
            code: sport?.code,
            id: sport?.id,
            label: sport?.name,
            dotColor: "#60a5fa",
          };

          return (
            <Pressable
              key={SPORT_ROW.id}
              style={[s.pill, isActive && s.pillActive]}
              onPress={() => onSelect(SPORT_ROW.code)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Select ${SPORT_ROW.label}`}
            >
              <View style={[s.dot, { backgroundColor: SPORT_ROW.dotColor }]} />
              <Text style={[s.pillText, isActive && s.pillTextActive]}>
                {SPORT_ROW.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  },
);

/* ─────────────────────────────────────────────────────────────────────────────
   MENU
───────────────────────────────────────────────────────────────────────────── */

/**
 * A single tappable menu row.
 * Accepts an optional `rightElement` for custom right-side content (badge, toggle).
 *
 * @param {{ item: MenuItem, isLast: boolean, rightElement?: React.ReactNode, colors: object }} props
 */
const MenuRow = React.memo(({ item, isLast, rightElement, colors }) => {
  const s = useMemo(() => menuRowStyles(colors), [colors]);

  return (
    <Pressable
      style={({ pressed }) => [
        s.row,
        !isLast && s.rowBorder,
        pressed && s.rowPressed,
      ]}
      onPress={item.onPress}
      accessibilityRole="button"
      accessibilityLabel={item.title}
    >
      {/* Icon */}
      <View style={[s.iconWrap, { backgroundColor: item.iconBg }]}>
        <Ionicons name={item.iconName} size={18} color={item.iconColor} />
      </View>

      {/* Label + subtitle */}
      <View style={s.textWrap}>
        <Text style={s.title}>{item.title}</Text>
        {item.subtitle ? <Text style={s.subtitle}>{item.subtitle}</Text> : null}
      </View>

      {/* Right side: custom element or chevron */}
      <View style={s.rightWrap}>
        {rightElement ?? null}
        {!rightElement || item.badge ? (
          <>
            {item.badge ? (
              <Text style={[s.badge, { color: colors.success }]}>
                {item.badge}
              </Text>
            ) : null}
            <Ionicons
              name="chevron-forward"
              size={14}
              color={colors.textTertiary}
            />
          </>
        ) : null}
      </View>
    </Pressable>
  );
});

/**
 * A grouped card of MenuRows.
 * @param {{ section: MenuSection, colors: object, notifEnabled?: boolean, onToggleNotif?: () => void }} props
 */
const MenuCard = React.memo(
  ({ section, colors, notifEnabled, onToggleNotif }) => {
    const s = useMemo(() => menuCardStyles(colors), [colors]);

    return (
      <View style={s.card}>
        {section.items.map((item, idx) => {
          const isLast = idx === section.items.length - 1;

          // Notifications item gets a toggle
          const isNotifItem = item.id === "notifications";
          const rightEl = isNotifItem ? (
            <Switch
              value={notifEnabled}
              onValueChange={onToggleNotif}
              trackColor={{
                false: colors.surfaceLight,
                true: colors.primary,
              }}
              thumbColor="#fff"
              ios_backgroundColor={colors.surfaceLight}
              accessibilityLabel="Toggle notifications"
            />
          ) : undefined;

          return (
            <MenuRow
              key={item.id ?? item.title}
              item={item}
              isLast={isLast}
              rightElement={rightEl}
              colors={colors}
            />
          );
        })}
      </View>
    );
  },
);

/* ─────────────────────────────────────────────────────────────────────────────
   SIGN-OUT BUTTON
───────────────────────────────────────────────────────────────────────────── */

const SignOutButton = React.memo(({ onPress, colors }) => {
  const s = useMemo(() => signOutStyles(colors), [colors]);
  return (
    <Pressable
      style={({ pressed }) => [s.btn, pressed && s.btnPressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
    >
      <Ionicons name="log-out-outline" size={20} color={colors.error} />
      <Text style={s.label}>Sign Out</Text>
    </Pressable>
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────────────────────────────────────── */

const SectionLabel = React.memo(({ label, colors }) => {
  const s = useMemo(() => sectionLabelStyles(colors), [colors]);
  return <Text style={s.text}>{label.toUpperCase()}</Text>;
});

/* ─────────────────────────────────────────────────────────────────────────────
   SCREEN
───────────────────────────────────────────────────────────────────────────── */

/**
 * ProfileScreen
 *
 * @param {{ navigation: import('@react-navigation/native').NavigationProp<any> }} props
 */
const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, loading: profileLoading } = useProfile();
  const { myCareer, loadMyCareer } = {};
  useEffect(() => {
    loadMyCareer();
  }, []);

  const universal = myCareer?.data?.universal;

  const { avatar, name, username, initials } = getUserData(user);

  const { sports, selectedSport, selectSport, isPreferenceReady } = {};

  const handleSportSelect = useCallback(
    (code) => {
      // Build full sport object from the API list — never construct a partial object
      const sport = sports.find((s) => s.code === code);
      if (!sport) {
        logger.warn("[HomeScreen] handleSportSelect — unknown code:", code);
        return;
      }
      selectSport(sport);
    },
    [sports, selectSport],
  );

  const USER_DATA = {
    avatar: avatar ?? "https://i.pravatar.cc/150?img=12",
    displayName: name ?? "Pizza",
    username: username ?? "@lovepreet19738",
    initials: initials ?? "P",
    tier: "Pro Member",
    globalRank: universal?.globalRank ?? null,
    stats: {
      matches: universal?.matchesPlayed ?? "-",
      wins: universal?.contestWins ?? "-",
      totalPoints: universal?.totalPoints ?? "-",
    },
  };

  const [notifEnabled, setNotifEnabled] = useState(true);

  /* ── Handlers ── */
  const handleToggleNotif = useCallback(() => {
    setNotifEnabled((prev) => !prev);
    // TODO(api): persist via user-preferences endpoint
  }, []);

  const nav = useCallback(
    (route, params) => navigation.navigate(route, params),
    [navigation],
  );

  const handleSignOut = useCallback(() => {
    // TODO(api): call auth sign-out + clear stores, then navigate to Auth
    nav(ROUTES.AUTH);
  }, [nav]);

  //   CAREER_STATS:          "CareerStats",
  // CAREER_LEADERBOARD:    "CareerLeaderboard",
  // SNAPSHOT:              "Snapshot",
  // SNAPSHOT_DETAIL:       "SnapshotDetail",

  /* ── Menu configuration ── */

  /** @type {MenuSection[]} */
  const menuSections = useMemo(
    () => [
      {
        title: "Account",
        items: [
          {
            id: "my_profile",
            iconName: "person-outline",
            iconColor: colors.primaryLight,
            iconBg: `${colors.primary}26`,
            title: "My Profile",
            subtitle: "Edit info, avatar, bio",
            onPress: () => nav(ROUTES.MY_PROFILE),
          },
          {
            id: "career_stats",
            iconName: "trophy-outline",
            iconColor: "#00d4aa",
            iconBg: "rgba(0,212,170,0.10)",
            title: "Career Stats",
            subtitle: "All-time · per sport · seasons",
            badge: "NEW",

            onPress: () => nav(ROUTES.CAREER_STATS),
          },
          {
            id: "leaderboard",
            iconName: "bar-chart-outline",
            iconColor: colors.warning,
            iconBg: `${colors.warning}1A`,
            title: "Leaderboards",
            subtitle: "Room · season · global ranks",
            onPress: () => nav(ROUTES.LEADERBOARD),
          },
        ],
      },
      {
        title: "Preferences",
        items: [
          {
            id: "notifications",
            iconName: "notifications-outline",
            iconColor: "#38bdf8",
            iconBg: "rgba(56,189,248,0.10)",
            title: "Notifications",
            subtitle: "Match alerts, contest updates",
            // onPress handled by toggle; no nav needed
          },
          {
            id: "settings",
            iconName: "settings-outline",
            iconColor: colors.textSecondary,
            iconBg: colors.surface,
            title: "Settings",
            subtitle: "Language, theme, region",
            onPress: () => nav(ROUTES.SETTINGS),
          },
        ],
      },
      {
        title: "Legal & Support",
        items: [
          {
            id: "terms",
            iconName: "document-text-outline",
            iconColor: colors.textTertiary,
            iconBg: colors.surface,
            title: "Terms & Conditions",
            onPress: () => nav(ROUTES.TERMS),
          },
          {
            id: "privacy",
            iconName: "shield-outline",
            iconColor: colors.textTertiary,
            iconBg: colors.surface,
            title: "Privacy & Policy",
            onPress: () => nav(ROUTES.PRIVACY),
          },
          {
            id: "contact",
            iconName: "headset-outline",
            iconColor: colors.textTertiary,
            iconBg: colors.surface,
            title: "Contact Us",
            onPress: () => {
              // TODO(api): open support chat or mailto
            },
          },
        ],
      },
    ],
    [colors, nav],
  );

  const s = useMemo(() => screenStyles(colors), [colors]);

  return (
    <ScreenWrapper>
      {/* ── Header ── */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Profile</Text>
        {/* <Pressable
          style={s.headerIconBtn}
          accessibilityRole="button"
          accessibilityLabel="More options"
          onPress={() => {
          }}>
          <Ionicons
            name="ellipsis-horizontal"
            size={18}
            color={colors.textSecondary}
          />
        </Pressable> */}
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <HeroCard user={USER_DATA} colors={colors} />

        {/* Active sports */}
        <SectionLabel label="Active Sports" colors={colors} />
        <SportPillRow
          sports={sports}
          selectedSport={selectedSport}
          onSelect={handleSportSelect}
          colors={colors}
        />

        {/* Menu sections */}
        {menuSections.map((section) => (
          <React.Fragment key={section.title}>
            <SectionLabel label={section.title} colors={colors} />
            <MenuCard
              section={section}
              colors={colors}
              notifEnabled={notifEnabled}
              onToggleNotif={handleToggleNotif}
            />
          </React.Fragment>
        ))}

        {/* Sign out */}
        {/* <SignOutButton onPress={handleSignOut} colors={colors} /> */}

        <View style={s.bottomSpacer} />
        <BottomSpacing />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

/* ─────────────────────────────────────────────────────────────────────────────
   STYLES  (factory functions so they recompute only when colors change)
───────────────────────────────────────────────────────────────────────────── */

const screenStyles = (colors) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 0,
    },
    headerTitle: {
      fontFamily: "Syne-ExtraBold", // assumes Syne loaded via expo-font
      fontSize: 22,
      fontWeight: "800",
      color: colors.textPrimary,
      letterSpacing: -0.3,
    },
    headerIconBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 0.5,
      borderColor: colors.glassBorder,
      alignItems: "center",
      justifyContent: "center",
    },
    scrollView: { flex: 1 },
    scrollContent: { paddingBottom: 8 },
    bottomSpacer: { height: 4 },
  });

/* Hero card */
const useHeroStyles = (colors) =>
  useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginHorizontal: 16,
          marginTop: 14,
          borderRadius: 20,
          padding: 20,
          borderWidth: 0.5,
          borderColor: `${colors.primary}59`, // ~35% opacity
          overflow: "hidden",
        },
        blobTopRight: {
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: `${colors.primary}2E`, // ~18%
        },
        blobBottomLeft: {
          position: "absolute",
          bottom: -20,
          left: 20,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "rgba(0,212,170,0.08)",
        },
        topRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
          zIndex: 1,
        },
        avatarRing: {
          width: 58,
          height: 58,
          borderRadius: 29,
          padding: 2.5,
          flexShrink: 0,
        },
        avatarInner: {
          flex: 1,
          borderRadius: 27,
          backgroundColor: "#1a0f4a",
          alignItems: "center",
          justifyContent: "center",
        },
        avatarInitial: {
          fontFamily: "Syne-ExtraBold",
          fontSize: 20,
          fontWeight: "800",
          color: colors.textPrimary,
        },
        userInfo: { flex: 1 },
        userName: {
          fontFamily: "Syne-Bold",
          fontSize: 17,
          fontWeight: "700",
          color: colors.textPrimary,
          marginBottom: 2,
        },
        userHandle: {
          fontSize: 12,
          color: colors.textTertiary,
          fontWeight: "400",
        },
        tierBadge: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          alignSelf: "flex-start",
          backgroundColor: "rgba(0,212,170,0.12)",
          borderWidth: 0.5,
          borderColor: "rgba(0,212,170,0.35)",
          borderRadius: 100,
          paddingHorizontal: 9,
          paddingVertical: 3,
          marginTop: 5,
        },
        tierDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: "#00d4aa",
        },
        tierText: {
          fontSize: 10,
          fontWeight: "600",
          color: "#00d4aa",
        },
        rankChip: {
          backgroundColor: "rgba(255,215,0,0.12)",
          borderWidth: 0.5,
          borderColor: "rgba(255,215,0,0.3)",
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
        },
        rankText: {
          fontSize: 10,
          fontWeight: "700",
          color: "#ffd93d",
          fontFamily: "Syne-Bold",
        },
        divider: {
          height: 0.5,
          backgroundColor: colors.border,
          marginBottom: 14,
          zIndex: 1,
        },
        statsRow: {
          flexDirection: "row",
          zIndex: 1,
        },
        statDivider: {
          width: 0.5,
          backgroundColor: colors.border,
        },
      }),
    [colors],
  );

/* Stat cell */
const statCellStyles = (colors) =>
  StyleSheet.create({
    cell: { flex: 1, alignItems: "center", paddingHorizontal: 4 },
    value: {
      fontFamily: "Syne-ExtraBold",
      fontSize: 18,
      fontWeight: "800",
      color: colors.textPrimary,
    },
    label: {
      fontSize: 10,
      color: colors.textTertiary,
      fontWeight: "400",
      marginTop: 1,
    },
  });

/* Sport pills */
const sportPillStyles = (colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      gap: 8,
      flexDirection: "row",
    },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.surface,
      borderWidth: 0.5,
      borderColor: colors.border,
      borderRadius: 100,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    pillActive: {
      backgroundColor: `${colors.primary}33`,
      borderColor: `${colors.primary}80`,
    },
    dot: { width: 7, height: 7, borderRadius: 4 },
    pillText: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.textSecondary,
    },
    pillTextActive: {
      color: colors.primaryLight,
    },
  });

/* Section label */
const sectionLabelStyles = (colors) =>
  StyleSheet.create({
    text: {
      fontSize: 10,
      fontWeight: "600",
      color: colors.textTertiary,
      letterSpacing: 1.2,
      paddingHorizontal: 20,
      paddingTop: 14,
      paddingBottom: 8,
    },
  });

/* Menu card */
const menuCardStyles = (colors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 16,
      backgroundColor: colors.cardGlass,
      borderWidth: 0.5,
      borderColor: colors.glassBorder,
      borderRadius: 18,
      overflow: "hidden",
    },
  });

/* Menu row */
const menuRowStyles = (colors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
    },
    rowBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.surface,
    },
    rowPressed: { backgroundColor: colors.surface },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    textWrap: { flex: 1 },
    title: {
      fontSize: 14,
      fontWeight: "500",
      color: "#e2e8f0",
    },
    subtitle: {
      fontSize: 11,
      color: colors.textTertiary,
      marginTop: 1,
    },
    rightWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    badge: {
      fontSize: 11,
      fontWeight: "600",
    },
  });

/* Sign-out */
const signOutStyles = (colors) =>
  StyleSheet.create({
    btn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: 16,
      marginTop: 12,
      backgroundColor: "rgba(239,68,68,0.08)",
      borderWidth: 0.5,
      borderColor: "rgba(239,68,68,0.20)",
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    btnPressed: { backgroundColor: "rgba(239,68,68,0.13)" },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.error,
    },
  });
