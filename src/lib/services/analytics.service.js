// import analytics from "@react-native-firebase/analytics";
import { logger } from "../events/logger";

const testAnalytics = async () => {
  try {
    // await analytics().logEvent("test_event", {
    //   test: "working",
    // });

    logger.info("EVENT SENT SUCCESSFULLY");
  } catch (e) {
    logger.info("EVENT FAILED", e);
  }
};

testAnalytics();

const AnalyticsService = {
  // Log any custom event
  logEvent: async (eventName, params = {}) => {
    try {
      // await analytics().logEvent(eventName, params);
      logger.info("[Analytics] Event logged:", eventName, params);
    } catch (e) {
      logger.warn("[Analytics] logEvent failed:", e);
    }
  },

  // Screen tracking
  logScreenView: async (screenName, screenClass) => {
    try {
      // await analytics().logScreenView({
      //   screen_name: screenName,
      //   screen_class: screenClass ?? screenName,
      // });
      logger.info("[Analytics] Screen logged:", screenName);
    } catch (e) {
      logger.warn("[Analytics] logScreenView failed:", e);
    }
  },

  // Set user identity (call after login)
  setUserId: async (userId) => {
    try {
      // await analytics().setUserId(userId ? String(userId) : null);
      logger.info("[Analytics] User ID set:", userId);
    } catch (e) {
      logger.warn("[Analytics] setUserId failed:", e);
    }
  },

  // Set user properties (role, plan, etc.)
  setUserProperty: async (name, value) => {
    try {
      // await analytics().setUserProperty(name, value);
      logger.info("[Analytics] User ID set:", name, value);
    } catch (e) {
      logger.warn("[Analytics] setUserProperty failed:", e);
    }
  },

  // Predefined: login event
  logLogin: async (method = "email") => {
    try {
      // await analytics().logLogin({ method });
      logger.info("[Analytics] Login logged");
    } catch (e) {
      logger.warn("[Analytics] logLogin failed:", e);
    }
  },

  // Predefined: sign_up event
  logSignUp: async (method = "email") => {
    try {
      // await analytics().logSignUp({ method });
    } catch (e) {
      logger.warn("[Analytics] logSignUp failed:", e);
    }
  },
};

export default AnalyticsService;
