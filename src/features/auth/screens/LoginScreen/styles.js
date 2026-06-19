import { StyleSheet } from "react-native";
import colors from "@theme/colors";

export default StyleSheet.create({
  authCont: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    paddingBottom: 40,
  },

  authGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },

  authTxtCont: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  authHeading: {
    color: colors.textWhite,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  authBtnCont: {
    width: "100%",
    paddingHorizontal: 20,
  },

  authBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%", // full width
    marginTop: 30,
  },
  authBtnTxt: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    paddingLeft: 10,
  },
  twitter_btn: {
    backgroundColor: colors.background,
  },
  authChangebtn: {
    marginTop: 20,
    color: colors.textWhite,
  },
  authChangeBtnTxt: {
    color: colors.textWhite,
    fontSize: 14,
  },

  twitter_btn: {
    backgroundColor: colors.background,
  },
  twitter_btn_text: {
    color: colors.textPrimary,
  },

  termsText: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 30,
  },

  linkText: {
    color: "#fff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
