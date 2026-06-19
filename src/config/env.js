const required = (value, name) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const ENV = {
  APP_ENV: process.env.APP_ENV,

  API_URL: required(process.env.EXPO_PUBLIC_API_URL, "EXPO_PUBLIC_API_URL"),

  RAPID_API_KEY: process.env.EXPO_PUBLIC_RAPIDAPI_KEY,

  WEB_CLIENT_ID: required(
    process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    "EXPO_PUBLIC_WEB_CLIENT_ID",
  ),

  TEST: required(process.env.TEST, "Failed To fetch Test"),

  ENABLE_LOGS: process.env.ENABLE_LOGS === "true",
};

export default ENV;
