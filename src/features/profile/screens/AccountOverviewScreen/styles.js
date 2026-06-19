import { StyleSheet } from "react-native";
import colors from "@theme/colors";

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
    fontSize: 26,
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#3da9fc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  email: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
});
