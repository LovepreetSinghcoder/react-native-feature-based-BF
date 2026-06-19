import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { cacheMiddleware } from "./middleware/cacheMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(cacheMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
