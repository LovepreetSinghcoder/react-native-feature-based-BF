// src/storage/storage.js

import EncryptedStorage from "react-native-encrypted-storage";
import { logger } from "../events/logger";

const KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  USER: "USER_DATA",
};

export const saveAuthData = async (accessToken, user, refreshToken) => {
  try {
    await Promise.all([
      EncryptedStorage.setItem(KEYS.ACCESS_TOKEN, accessToken),
      EncryptedStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken),
      EncryptedStorage.setItem(KEYS.USER, JSON.stringify(user)),
    ]);
  } catch (e) {
    logger.error("saveAuthData failed: ", e);
  }
};

export const getAuthData = async () => {
  try {
    const [accessToken, refreshToken, userRaw] = await Promise.all([
      EncryptedStorage.getItem(KEYS.ACCESS_TOKEN),
      EncryptedStorage.getItem(KEYS.REFRESH_TOKEN),
      EncryptedStorage.getItem(KEYS.USER),
    ]);

    return {
      accessToken,
      refreshToken,
      user: userRaw ? JSON.parse(userRaw) : null,
    };
  } catch (e) {
    logger.error("getAuthData failed:", e);
    return { accessToken: null, refreshToken: null, user: null };
  }
};

export const clearAuthData = async () => {
  try {
    await Promise.all([
      EncryptedStorage.removeItem(KEYS.ACCESS_TOKEN),
      EncryptedStorage.removeItem(KEYS.REFRESH_TOKEN),
      EncryptedStorage.removeItem(KEYS.USER),
    ]);
  } catch (e) {
    logger.error("clearAuthData failed:", e);
  }
};
