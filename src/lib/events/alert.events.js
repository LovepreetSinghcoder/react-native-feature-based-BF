// src/lib/events/alert.events.js

let _store = null;

const getStore = () => {
  if (!_store) {
    const storeModule = require("@store/index");
    _store = storeModule.default || storeModule.store; // ✅ handles default export
  }
  return _store;
};

export const triggerConnectionError = () => {
  const { setMaintenance } = require("@store/slices/uiSlice");
  getStore().dispatch(setMaintenance(true));
};

export const setConnectionErrorHandler = (_handler) => {
  // no-op
};

export const triggerUserBanned = () => {
  const { setUserBanned } = require("@store/slices/uiSlice");
  getStore().dispatch(setUserBanned(true));
};
