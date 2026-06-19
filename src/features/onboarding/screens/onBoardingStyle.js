import { StyleSheet } from "react-native";
import colors from "@theme/colors";

export const onBoardingStyle = StyleSheet.create({
  backgroundImg: {
    flex: 1, // full screen
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },

  skipContainer: {
    position: "absolute",
    top: 50,
    right: 30,
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.cardGlass,
    borderColor: colors.glassBorder,
    justifyContent: "center",
    textAlign: "center",
  },
  skipText: {
    color: colors.textWhite,
    fontSize: 14,
  },
  textContainer: {
    position: "absolute",
    bottom: 0, // adjust distance from bottom
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 40,
    width: "100%",
  },
  heading: {
    color: colors.textWhite,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    width: "100%", // full width
    marginTop: 30,
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: "700",
  },
});
