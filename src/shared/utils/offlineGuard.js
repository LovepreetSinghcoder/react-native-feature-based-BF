import { useAppSelector } from "@store/hooks";

export const useIsOffline = () => {
  return useAppSelector((state) => state.network.isOffline);
};

export const safeDispatch = (dispatch, isOffline, thunkCreator, ...args) => {
  if (isOffline) {
    return {
      type: "OFFLINE_SKIP",
      meta: { offline: true },
    };
  }
  return dispatch(thunkCreator(...args));
};

// HOC for hooks
export const withOfflineGuard = (fn) => {
  return (isOffline, ...args) => {
    if (isOffline) return;
    return fn(...args);
  };
};
