import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  headerText: { color: "#a0a0a0", marginBottom: 14 },
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
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  left: {
    // flexDirection: "row",
    // alignItems: "center",
    gap: 5,
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },

  bottomText: {
    color: "#707070",
    fontSize: 14,
    // paddingBottom: 18,
    // paddingHorizontal: 16,
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
