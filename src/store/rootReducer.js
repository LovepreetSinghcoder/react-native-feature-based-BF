import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { logout } from "./slices/authSlice";
import appSliceReducer from "./slices/appSlice";
import uiReducer from "./slices/uiSlice";

import notificationsReducer from "./slices/notificationsSlice";
import profileReducer from "./slices/profileSlice";

import networkReducer from "./slices/networkSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  app: appSliceReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  ui: uiReducer,
  network: networkReducer,
});

const rootReducer = (state, action) => {
  if (
    action.type === logout.fulfilled.type ||
    action.type === logout.rejected.type
  ) {
    state = {
      app: state?.app,
    };
  }

  return combinedReducer(state, action);
};

export default rootReducer;
