import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@lib/services/auth.service";

/* -------------------------------------------------------------------------- */
/*                                ERROR PARSER                                */
/* -------------------------------------------------------------------------- */

const parseError = (err) => {
  if (!err) return "Something went wrong";

  if (typeof err === "string") return err;

  if (err?.type === "RATE_LIMIT") {
    return err.message || "Too many requests. Please try again later.";
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.message) {
    return err.message;
  }

  return "Something went wrong";
};

/* -------------------------------------------------------------------------- */
/*                              AUTH THUNKS                                   */
/* -------------------------------------------------------------------------- */

/**
 * 🔁 Auto login + backend validation
 */
export const loadAuth = createAsyncThunk(
  "auth/loadAuth",
  async (_, { rejectWithValue }) => {
    try {
      const stored = await authService.getStoredAuth();

      if (!stored?.accessToken) {
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
        };
      }

      // 🔥 Validate token with backend
      const user = await authService.checkAuth();

      return {
        user,
        accessToken: stored.accessToken,
        refreshToken: stored.refreshToken,
      };
    } catch (err) {
      try {
        await authService.logout();
      } catch (_) {}

      return rejectWithValue(parseError(err));
    }
  },
);

/**
 * 🔑 Google login
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.loginWithGoogle();
      return {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isNewUser: data.isNewUser,
      };
    } catch (err) {
      // console.log("this is the error from the login ", err, err.message);
      return rejectWithValue(parseError(err));
    }
  },
);

/**
 * ⚙️ Update Preferences
 */
export const updatePreferences = createAsyncThunk(
  "auth/updatePreferences",
  async (preferencesData, { rejectWithValue }) => {
    try {
      const { fantasyTeamName, favoriteTeamId, favoriteTeamTournamentCode } =
        preferencesData;

      const hasTeamId = !!favoriteTeamId;
      const hasTournamentCode = !!favoriteTeamTournamentCode;

      /**
       * backend validation mirror
       */

      if (hasTeamId !== hasTournamentCode) {
        return rejectWithValue("Team and tournament must be selected together");
      }

      await authService.setupPreferences({
        fantasyTeamName,
        favoriteTeamId,
        favoriteTeamTournamentCode,
      });

      return preferencesData;
    } catch (err) {
      return rejectWithValue(parseError(err));
    }
  },
);

/**
 * 🚪 Logout
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authService.logout();
  } catch (_) {
    // logout should NEVER fail UI flow
  }
});

/**
 * 🚪 Delete Account
 */

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("this is from the delete account");
      const response = await authService.deleteAccount();

      // optional local cleanup
      await authService.logout();
      // return [];
      return response.data ?? [];
    } catch (err) {
      return rejectWithValue(parseError(err));
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                                 INITIAL STATE                              */
/* -------------------------------------------------------------------------- */

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isNewUser: false,
  authChecked: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  preferencesUpdating: false,
};

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    resetAuthState: () => initialState,
    updateUser: (state, action) => {
      // console.log("UPDATING USER IN STORE", action.payload);
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ------------------------------ LOAD AUTH ------------------------------ */
      .addCase(loadAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loadAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.authChecked = true;
      })

      .addCase(loadAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;

        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.authChecked = true;
      })

      /* --------------------------- GOOGLE LOGIN ----------------------------- */
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isNewUser = action.payload.isNewUser;
        state.authChecked = true;
      })

      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.authChecked = true;
      })

      /* ------------------------------ LOGOUT ------------------------------- */
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.authChecked = true;
      })

      /* -------------------------- DELETE ACCOUNT --------------------------- */
      .addCase(deleteAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteAccount.fulfilled, (state) => {
        Object.assign(state, initialState);

        state.authChecked = true;
        state.status = "succeeded";
      })

      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ---------------------- UPDATE PREFERENCES ---------------------- */
      .addCase(updatePreferences.pending, (state) => {
        state.status = "loading";
        state.preferencesUpdating = true;
        state.error = null;
      })

      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.preferencesUpdating = false;

        /**
         * merge preferences into existing user
         */

        if (state.user) {
          state.user = {
            ...state.user,

            fantasyTeamName: action.payload.fantasyTeamName,

            favoriteTeamId: action.payload.favoriteTeamId,

            favoriteTeamTournamentCode:
              action.payload.favoriteTeamTournamentCode,
          };
        }
      })

      .addCase(updatePreferences.rejected, (state, action) => {
        state.status = "failed";
        state.preferencesUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
