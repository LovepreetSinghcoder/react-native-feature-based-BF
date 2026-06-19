import { StyleSheet } from "react-native";
import colors from "../colors";

export const globalStyles = StyleSheet.create({
  screenCont: {
    flex: 1,
    // padding: 20,
    backgroundColor: colors.background,
    flex: 1,
    padding: 20,
    width: "100%",
    height: "100%",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "100%", // full width
    marginTop: 30,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: "bold",
  },

  cardBgColor:{
    backgroundColor: "rgba(255,255,255,0.08)",
  }
});
