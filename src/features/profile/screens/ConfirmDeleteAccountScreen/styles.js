import { StyleSheet } from "react-native";
import colors from "@theme/colors";

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingBottom: 40,
  },

  confirmContainer: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 30,
  },

  backButton: {
    height: 48,
    width: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#b57a00",
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },

  section: {
    marginBottom: 38,
  },

  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  description: {
    color: "#9f9f9f",
    fontSize: 16,
    lineHeight: 34,
  },

  checkboxContainer: {
    marginTop: 30,
    gap: 22,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    height: 36,
    width: 36,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#6b6b6b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkboxLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },

  footer: {
    marginTop: 30,
    gap: 22,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 3,
    borderColor: "#7c2cff",
    borderRadius: 999,
    paddingVertical: 18,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  disabledButton: {
    opacity: 0.5,
  },

  confirmContent: {
    flex: 1,
    marginTop: 20,
  },

  confirmHeading: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 15,
  },

  confirmDescription: {
    color: "#c2c2c2",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 20,
  },

  inputWrapper: {
    gap: 14,
  },

  inputLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  required: {
    color: "#ff4d4d",
  },

  input: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#4d4d4d",
    paddingHorizontal: 22,
    color: "#fff",
    fontSize: 18,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  deleteButton: {
    // width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#e8e8e8",
    fontSize: 20,
    fontWeight: "800",
  },

  cancelText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
