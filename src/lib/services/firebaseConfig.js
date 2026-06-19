// src/lib/services/firebaseConfig.js

import { getApp } from "@react-native-firebase/app";

// RN Firebase auto-initializes from google-services.json
// Just return the default app instance
export const getFirebaseApp = () => getApp();
