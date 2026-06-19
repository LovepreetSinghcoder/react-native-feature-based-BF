import { StyleSheet } from "react-native";
import colors from "@theme/colors";

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 12,
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  username: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    paddingVertical: 10,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuText: {
    color: "#fff",
    fontSize: 16,
  },

  logoutBtn: {
    marginTop: 30,
    alignItems: "center",
  },
});
