import { registerRootComponent } from "expo";
// import {
//   getMessaging,
//   setBackgroundMessageHandler,
// } from "@react-native-firebase/messaging";
// import { getApp } from "@react-native-firebase/app";
import { name as appName } from "./app.json";
// import "@react-native-firebase/app";

import App from "./App";
import { logger } from "./src/lib/events/logger";

// setBackgroundMessageHandler(getMessaging(getApp()), async (remoteMessage) => {
//   logger.info("Background message received:", remoteMessage);
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
