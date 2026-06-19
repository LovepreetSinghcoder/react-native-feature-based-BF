import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginWithGoogle,
  logout,
  updatePreferences,
} from "../../../store/slices/authSlice";
import { checkServerHealth } from "../../../api/auth/auth.api";
import { triggerConnectionError } from "@lib/events/alert.events";

/* -------------------------------------------------------------------------- */
/*                                  USE AUTH                                  */
/* -------------------------------------------------------------------------- */

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    accessToken,
    refreshToken,
    isNewUser,
    status,
    error,
    preferencesUpdating,
  } = useSelector((state) => state.auth);

  /* ------------------------------ ACTIONS --------------------------------- */

  const handleGoogleLogin = useCallback(async () => {
    // ❌ Step 2: Backend not reachable
    const isServerUp = await checkServerHealth();

    if (!isServerUp) {
      triggerConnectionError();
      return;
    }

    return dispatch(loginWithGoogle());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);

  /* ----------------------- UPDATE PREFERENCES ----------------------------- */

  const handleUpdatePreferences = useCallback(
    async (preferencesData) => {
      /**
       * optional backend availability check
       */

      const isServerUp = await checkServerHealth();

      if (!isServerUp) {
        triggerConnectionError();
        return;
      }

      return dispatch(updatePreferences(preferencesData));
    },
    [dispatch],
  );

  /* -------------------------------------------------------------------------- */

  return {
    /* -------------------------------- STATE -------------------------------- */

    user,
    accessToken,
    refreshToken,
    isNewUser,

    /**
     * generic auth loading
     */

    loading: status === "loading",

    /**
     * specific loading states
     */

    preferencesUpdating,

    status,
    error,

    /* ------------------------------- ACTIONS ------------------------------- */

    loginWithGoogle: handleGoogleLogin,

    logout: handleLogout,

    updatePreferences: handleUpdatePreferences,
  };
};
