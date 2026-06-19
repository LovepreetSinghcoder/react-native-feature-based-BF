import { StyleSheet } from "react-native";
import colors from "@theme/colors";

// export const makeStyles = (colors) =>
//   StyleSheet.create({
export default StyleSheet.create({
  /* ---------- SCREEN ---------- */
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },

  /* ---------- HEADER ---------- */

  headerBgContainer: {
    height: 161, // visible area
    overflow: "hidden",
    borderRadius: 18,
    marginVertical: 15,
    marginHorizontal: 16,
  },
  headerBg: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    height: 250, // bigger than container
    resizeMode: "cover",
    position: "absolute",
    bottom: 0,
  },
  headerTitle: {
    fontSize: 35,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    paddingBottom: 10,
  },

  /* ---------- STATS CARD ---------- */
  statsCard: {
    backgroundColor: colors.cardGlass,
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    height: 80,
    borderRadius: 16,
    gap: 10,
    justifyContent: "space-around",
    marginHorizontal: 16,
  },
  centerText: {
    textAlign: "center",
    fontWeight: "600",
    color: colors.textPrimary,
  },

  statBoxCont: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  statBox: {
    // width: "48%",
    // alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textTertiary,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  /* ---------- BUTTONS ---------- */
  boosterBtn: {
    borderRadius: 11,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    gap: 10,
    borderWidth: 0,
    marginHorizontal: 16,
  },
  boosterContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  boosterInnerCont: {
    width: "90%",
    justifyContent: "space-between",
  },
  boosterText: {
    color: colors.textPrimary,
    color: colors.black,

    marginRight: 6,
    fontSize: 14,
    fontWeight: "400",
  },
  boosterIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  spacing: {
    marginVertical: 10,
  },

  /* ---------- SECTION ---------- */
  sectionTitleCont: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  sectionTitleContChild: {
    flexDirection: "row",

    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.textPrimary,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionTitleSmall: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  /* ---------- CARD ---------- */
  card: {
    backgroundColor: colors.cardGlass,
    borderRadius: 24,
    padding: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    gap: 16,
    marginHorizontal: 16,
  },

  /* ---------- MATCH ---------- */
  matchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchRowUpComing: {
    paddingHorizontal: 16,
  },
  statusStyle: {
    borderRadius: 5,
    opacity: 1,
    borderWidth: 0.64,
    borderColor: "#5DEB80BF",
    padding: 10,
    paddingVertical: 5,
    marginVertical: 8,
    alignSelf: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5DEB80",
    alignItems: "center",
  },

  boosterCard: {
    marginVertical: 5,
    alignItems: "center",
  },
  boosterGradient: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  boosterText: {
    // color: "#000",
    // color: colors.boosterText,
    color: "green",

    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  vs: {
    fontSize: 14,
    color: colors.textTertiary,
  },

  matchTime: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 5,
  },

  time: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  /* ---------- TEAM ---------- */
  teamRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    padding: 10,
  },
  teamFull: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textTertiary,
    textAlign: "center",
  },

  teamImg: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  teamBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  teamBadgeText: {
    fontSize: 12,
    color: colors.textPrimary,
  },

  /* ---------- LOCATION ---------- */
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  matchCardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  stadium: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  earnedPoints: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  transferCont: {
    borderRadius: 100,
    alignItems: "center",
  },
  transferButtonStyle: {
    padding: 12,
    paddingVertical: 7,
    marginBottom: 0,
    borderColor: "#B66BFC",
    borderWidth: 0.7,
  },
  transfersText: {
    color: "#fff",
    fontSize: 12,
    opacity: 1,
    fontSize: 13,
  },
  boosterUsedText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  teamBtn: {
    borderRadius: 16,
  },
  arrow: {
    color: colors.textSecondary,
    marginRight: 10,
  },

  /* ---------- LIVE TAG ---------- */
  liveTag: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 35,
    borderColor: colors.errorBorder,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: "700",
    color: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  transfersCloseIn: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textSecondary,
  },

  /* ---------- LIVE TIMER ---------- */
  timerCard: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  timer: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.error,
  },

  /* ---------- QUICK ACTION ---------- */
  quickCard: {
    backgroundColor: colors.cardGlass,
    borderRadius: 24,
    padding: 25,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    gap: 10,
    flex: 1,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  quickSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
  },

  /* ---------- HELPERS ---------- */
  rowBetween: {
    flexDirection: "row",
    justifyContent: "center",

    gap: 15,
  },
  rowBetweenUpcomingCard: {
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: colors.glassBorder,
  },
  gradientUpComingCont: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  divider: { borderRightWidth: 0.5, borderColor: colors.textTertiary },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  upComingCenter: {
    flexDirection: "row",
    gap: 10,
  },
});

// export default StyleSheet.create({

export const makeStyles = (colors) =>
  StyleSheet.create({
    /* ---------- SCREEN ---------- */
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },

    /* ---------- HEADER ---------- */

    headerBgContainer: {
      height: 161, // visible area
      overflow: "hidden",
      borderRadius: 24,
      marginVertical: 5,
      marginHorizontal: 16,
    },
    headerBg: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      height: 250, // bigger than container
      resizeMode: "cover",
      position: "absolute",
      bottom: 0,
    },
    headerTitle: {
      fontSize: 35,
      color: colors.textPrimary,
      fontWeight: "700",
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      paddingBottom: 10,
    },

    /* ---------- STATS CARD ---------- */
    statsCard: {
      backgroundColor: colors.cardGlass,
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      height: 80,
      borderRadius: 16,
      gap: 10,
      justifyContent: "space-around",
      marginHorizontal: 16,
    },
    centerText: {
      textAlign: "center",
      fontWeight: "600",
      color: colors.textPrimary,
    },

    statBoxCont: {
      flexDirection: "row",
      alignItems: "center",

      gap: 10,
    },

    statBox: {
      // width: "48%",
      // alignItems: "center",
    },
    statLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textTertiary,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.textPrimary,
    },

    /* ---------- BUTTONS ---------- */
    boosterBtn: {
      borderRadius: 11,
      marginVertical: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      gap: 10,
      borderWidth: 0,
      marginHorizontal: 16,
    },
    boosterContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    boosterInnerCont: {
      width: "90%",
      justifyContent: "space-between",
    },
    boosterText: {
      color: colors.boosterText,

      marginRight: 6,
      fontSize: 14,
      fontWeight: "400",
    },
    boosterIcon: {
      width: 20,
      height: 20,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    spacing: {
      marginVertical: 10,
    },

    /* ---------- SECTION ---------- */
    sectionTitleCont: {
      flexDirection: "row",
      justifyContent: "space-between",

      alignItems: "center",
    },
    sectionTitleContChild: {
      flexDirection: "row",

      alignItems: "center",
      gap: 5,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "500",
      color: colors.textPrimary,
      marginVertical: 10,
      marginHorizontal: 20,
    },
    sectionTitleSmall: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.textPrimary,
    },

    /* ---------- CARD ---------- */
    card: {
      backgroundColor: colors.cardGlass,
      borderRadius: 24,
      padding: 20,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      gap: 16,
      marginHorizontal: 16,
    },

    /* ---------- MATCH ---------- */
    matchRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    matchRowUpComing: {
      paddingHorizontal: 16,
    },
    statusStyle: {
      borderRadius: 5,
      opacity: 1,
      borderWidth: 0.64,
      borderColor: "#5DEB80BF",
      padding: 10,
      paddingVertical: 5,
      marginVertical: 8,
      alignSelf: "center",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#5DEB80",
      alignItems: "center",
    },

    boosterCard: {
      marginVertical: 5,
      alignItems: "center",
    },
    boosterGradient: {
      width: "100%",
      maxWidth: 360,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    boosterText: {
      // color: "#000",
      color: colors.boosterText,

      fontSize: 14,
      fontWeight: "700",
      letterSpacing: 0.3,
      // rightPadding: 2,
    },

    vs: {
      fontSize: 14,
      color: colors.textTertiary,
    },

    matchTime: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.textPrimary,
      marginTop: 5,
    },

    time: {
      fontSize: 14,
      color: colors.textSecondary,
    },

    /* ---------- TEAM ---------- */
    teamRow: {
      alignItems: "center",
      flexDirection: "row",
    },
    teamName: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: "700",
      padding: 10,
    },
    teamFull: {
      fontSize: 12,
      fontWeight: "400",
      color: colors.textTertiary,
      textAlign: "center",
    },

    teamImg: {
      width: 40,
      height: 40,
      borderRadius: 12,
    },
    teamBadge: {
      width: 40,
      height: 40,
      borderRadius: 12,
    },
    teamBadgeText: {
      fontSize: 12,
      color: colors.textPrimary,
    },

    /* ---------- LOCATION ---------- */
    bottomRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },

    matchCardBottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    stadium: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    earnedPoints: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    transferCont: {
      borderRadius: 100,
      alignItems: "center",
    },
    transferButtonStyle: {
      padding: 12,
      borderRadius: 12,
      paddingVertical: 7,
      marginBottom: 0,
      borderColor: "#a5a5a5",
      borderWidth: 0.2,
    },
    transfersText: {
      color: "#fff",
      fontSize: 12,
      opacity: 1,
      fontSize: 13,
    },
    boosterUsedText: {
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    },
    teamBtn: {
      borderRadius: 16,
    },
    arrow: {
      color: colors.textSecondary,
      marginRight: 10,
    },

    /* ---------- LIVE TAG ---------- */
    liveTag: {
      backgroundColor: colors.errorLight,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 35,
      borderColor: colors.errorBorder,
      borderWidth: 1,
      fontSize: 12,
      fontWeight: "700",
      color: colors.error,
      alignItems: "center",
      justifyContent: "center",
    },
    transfersCloseIn: {
      fontSize: 14,
      fontWeight: "400",
      color: colors.textSecondary,
    },

    /* ---------- LIVE TIMER ---------- */
    timerCard: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
    },

    timer: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.error,
    },

    /* ---------- QUICK ACTION ---------- */
    quickCard: {
      backgroundColor: colors.cardGlass,
      borderRadius: 24,
      padding: 25,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      gap: 10,
      flex: 1,
    },
    quickTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.textPrimary,
    },
    quickSubtitle: {
      fontSize: 12,
      color: colors.textTertiary,
    },

    /* ---------- HELPERS ---------- */
    rowBetween: {
      flexDirection: "row",
      justifyContent: "center",

      gap: 15,
    },
    rowBetweenUpcomingCard: {
      justifyContent: "center",
      borderBottomWidth: 1,
      borderColor: colors.glassBorder,
    },
    gradientUpComingCont: {
      flex: 1,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    divider: { borderRightWidth: 0.5, borderColor: colors.textTertiary },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    upComingCenter: {
      flexDirection: "row",
      gap: 10,
    },
  });
