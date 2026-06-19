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
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#00d4ff",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 20,
  },

  avatarText: {
    color: "#ccc",
    fontSize: 14,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },

  avatarListContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
  },

  avatarItem: {
    marginRight: 12,
    padding: 4,
    borderRadius: 12,
  },

  selectedAvatarItem: {
    borderWidth: 2,
    borderColor: "#6c5ce7",
  },

  avatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  inputSection: {
    marginTop: 10,
  },

  label: {
    color: "#ccc",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    marginBottom: 10,
  },

  saveBtn: {
    marginTop: 30,
    backgroundColor: "#6c5ce7",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  disabledBtn: {
    opacity: 0.5,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
