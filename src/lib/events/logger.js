const isDev = typeof __DEV__ !== "undefined" && __DEV__;

const formatMessage = (level, message, meta) => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  };
};

export const logger = {
  info: (message, meta = null) => {
    if (isDev) {
      console.log(formatMessage("INFO", message, meta));
    }
  },

  warn: (message, meta = null) => {
    if (isDev) {
      console.warn(formatMessage("WARN", message, meta));
    }
  },

  error: (message, meta = null) => {
    if (isDev) {
      console.error(formatMessage("ERROR", message, meta));
    }

    // future:
    // Sentry.captureException(...)
    // Crashlytics.recordError(...)
  },
};
