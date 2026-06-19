import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  initAndRegister,
  refreshToken,
  deregister,
  subscribeToTopics,
  unsubscribeFromTopics,
  checkNotificationPermission,
} from "../../lib/services/notifications.service";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * How long (ms) before a stored FCM token is considered stale and must be
 * refreshed against the backend. Default: 7 days.
 *
 * Firebase itself rotates tokens infrequently, but re-validating weekly
 * ensures the backend record stays alive (some backends expire tokens on
 * inactivity) and catches any silent rotation we may have missed.
 */
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Guard: returns true when the stored token is still fresh. */
const isTokenFresh = (registeredAt) =>
  registeredAt != null && Date.now() - registeredAt < TOKEN_TTL_MS;

// ─────────────────────────────────────────────────────────────────────────────
// Thunks
// ─────────────────────────────────────────────────────────────────────────────

/**
 * initNotifications
 *
 * Full bootstrap sequence:
 *   1. Checks OS permission status first (no-op if already denied).
 *   2. Skips registration when a fresh token already exists in state —
 *      avoids hammering the backend on every app cold-start.
 *   3. On success, stamps `registeredAt` so TTL-based refresh works.
 *
 * Call once at app startup (e.g. in App.jsx useEffect or an auth listener).
 */
// export const initNotifications = createAsyncThunk(
//   "notifications/init",
//   async ({ deviceName = "", topics = [] } = {}, { rejectWithValue }) => {
//     try {
//       const token = await initAndRegister({ deviceName, topics });
//       if (!token) {
//         return rejectWithValue("Permission denied or token unavailable");
//       }
//       return { token, registeredAt: Date.now() };
//     } catch (err) {
//       return rejectWithValue(
//         err?.message || "Failed to initialise notifications",
//       );
//     }
//   },
//   {
//     /**
//      * Skip dispatch entirely when:
//      *  • We already have a live, non-stale token  →  no Redux noise, no network call.
//      *  • The OS permission is explicitly "denied"  →  nothing we can do without the user
//      *    visiting Settings; don't loop on every mount.
//      */
//     condition: (_, { getState }) => {
//       const { token, registeredAt, permissionStatus, initStatus } =
//         getState().notifications;

//       if (initStatus === "loading") return false; // prevent concurrent inits
//       if (permissionStatus === "denied") return false; // user-denied; bail silently
//       if (token && isTokenFresh(registeredAt)) return false; // token still valid
//     },
//   },
// );

// In notificationsSlice.js — replace the initNotifications thunk

export const initNotifications = createAsyncThunk(
  "notifications/init",
  async ({ deviceName = "", topics = [] } = {}, { rejectWithValue }) => {
    try {
      const token = await initAndRegister({ deviceName, topics });
      if (!token) {
        // initAndRegister already logged the reason; surface it to the slice
        return rejectWithValue("Permission denied or token unavailable");
      }
      return { token, registeredAt: Date.now() };
    } catch (err) {
      return rejectWithValue(
        err?.message ?? "Failed to initialise notifications",
      );
    }
  },
  {
    /**
     * Skip dispatch when we're confident re-init is unnecessary.
     *
     * IMPORTANT: We do NOT guard on `permissionStatus === "denied"` from Redux
     * alone here, because that state can be stale (e.g. user re-enabled in Settings
     * between sessions). `initAndRegister` does a live OS check internally, so
     * we only guard on things that are reliably stable across sessions:
     *
     *  1. Already loading → prevent concurrent inits.
     *  2. Token is fresh (within TTL) → no network call needed.
     *
     * The "denied" short-circuit is handled inside `initAndRegister` itself,
     * which checks the OS directly, not Redux.
     */
    condition: (_, { getState }) => {
      const { token, registeredAt, initStatus } = getState().notifications;

      if (initStatus === "loading") return false; // already in-flight
      if (token && isTokenFresh(registeredAt)) return false; // token still valid
      // fall through → proceed with init (service will do live permission check)
    },
  },
);

/**
 * rotateToken
 *
 * Triggered by Firebase's `onTokenRefresh` listener (wire this up in your
 * firebase setup file, then dispatch from there).
 *
 * Sends old + new token to the backend so existing topic subscriptions
 * are migrated without loss.
 *
 * No caching guard here — Firebase only fires this when the token genuinely
 * changed, so we always want to propagate the update.
 */
export const rotateToken = createAsyncThunk(
  "notifications/rotateToken",
  async ({ oldToken, newToken, deviceName = "" }, { rejectWithValue }) => {
    try {
      await refreshToken(oldToken, newToken, deviceName);
      return { token: newToken, registeredAt: Date.now() };
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to rotate FCM token");
    }
  },
);

/**
 * deregisterNotifications
 *
 * Logout / account cleanup.  Removes the token from the backend and
 * unsubscribes from the broadcast topic.  After this succeeds the slice
 * resets to its idle state so `initNotifications` will re-run on next login.
 *
 * Guard: if there is no token in state there is nothing to deregister.
 */
export const deregisterNotifications = createAsyncThunk(
  "notifications/deregister",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().notifications;
    if (!token) return; // nothing to do — reducer will still run, state stays clean

    try {
      await deregister(token);
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to deregister token");
    }
  },
  {
    condition: (_, { getState }) => {
      // Prevent double-deregister if a logout fires twice (e.g. auth + manual)
      if (getState().notifications.deregisterStatus === "loading") return false;
    },
  },
);

/**
 * addTopicSubscriptions
 *
 * Subscribes the current token to one or more backend topics.
 * Guard: skips if any of the requested topics are already subscribed,
 * and skips entirely when there is no registered token.
 *
 * @param {string[]} topics  — topic slugs to subscribe to
 */
export const addTopicSubscriptions = createAsyncThunk(
  "notifications/addTopics",
  async (topics, { getState, rejectWithValue }) => {
    const { token } = getState().notifications;
    try {
      await subscribeToTopics(token, topics);
      return topics; // reducer merges into subscribedTopics[]
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to subscribe to topics");
    }
  },
  {
    condition: (topics, { getState }) => {
      const { token, subscribedTopics } = getState().notifications;
      if (!token) return false; // not registered — nothing to subscribe

      // Only proceed if at least one topic is genuinely new
      const hasNew = topics.some((t) => !subscribedTopics.includes(t));
      if (!hasNew) return false;
    },
  },
);

/**
 * removeTopicSubscriptions
 *
 * Unsubscribes the current token from one or more backend topics.
 * Guard: skips if none of the requested topics are currently subscribed.
 *
 * @param {string[]} topics  — topic slugs to unsubscribe from
 */
export const removeTopicSubscriptions = createAsyncThunk(
  "notifications/removeTopics",
  async (topics, { getState, rejectWithValue }) => {
    const { token } = getState().notifications;
    try {
      await unsubscribeFromTopics(token, topics);
      return topics; // reducer filters out of subscribedTopics[]
    } catch (err) {
      return rejectWithValue(
        err?.message || "Failed to unsubscribe from topics",
      );
    }
  },
  {
    condition: (topics, { getState }) => {
      const { token, subscribedTopics } = getState().notifications;
      if (!token) return false;

      // Only proceed if at least one topic is actually subscribed
      const hasExisting = topics.some((t) => subscribedTopics.includes(t));
      if (!hasExisting) return false;
    },
  },
);

/**
 * syncPermissionStatus
 *
 * Queries the OS for the current notification permission status without
 * triggering a system prompt.  Call on app foreground / resume so the
 * UI can reflect permission changes the user made in device Settings.
 *
 * No caching guard — this is a cheap local check, not a network call.
 */
export const syncPermissionStatus = createAsyncThunk(
  "notifications/syncPermission",
  async (_, { rejectWithValue }) => {
    try {
      // checkNotificationPermission returns 'granted' | 'denied' | 'undetermined'
      const status = await checkNotificationPermission();
      return status;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to check permission");
    }
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// Reducer case factories  (mirrors the pattern in catalogSlice)
// ─────────────────────────────────────────────────────────────────────────────

const onPending = (statusKey) => (state) => {
  state[statusKey] = "loading";
  state.error = null;
};

const onRejected =
  (statusKey) =>
  (state, { payload }) => {
    state[statusKey] = "failed";
    state.error = payload ?? null;
  };

// ─────────────────────────────────────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────────────────────────────────────

const initialState = {
  // ── Core token data ──────────────────────────────────────────────────────
  /** The currently registered FCM token, or null when not registered. */
  token: null,

  /**
   * Unix timestamp (ms) of the last successful backend registration.
   * Used with TOKEN_TTL_MS to decide if we need to re-register on cold start.
   */
  registeredAt: null,

  // ── Permission ───────────────────────────────────────────────────────────
  /** 'granted' | 'denied' | 'undetermined' | null (not yet checked) */
  permissionStatus: null,

  // ── Topics ───────────────────────────────────────────────────────────────
  /** Slugs of topics the current token is subscribed to. */
  subscribedTopics: [],

  // ── Operation statuses ───────────────────────────────────────────────────
  initStatus: "idle", // initNotifications
  rotateStatus: "idle", // rotateToken
  deregisterStatus: "idle", // deregisterNotifications
  addTopicsStatus: "idle", // addTopicSubscriptions
  removeTopicsStatus: "idle", // removeTopicSubscriptions
  permissionSyncStatus: "idle", // syncPermissionStatus

  // ── Shared error ─────────────────────────────────────────────────────────
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    /**
     * Hard-reset everything — typically called after a full logout when
     * you also need to wipe any persisted slice state (e.g. redux-persist).
     */
    resetNotifications: () => initialState,

    /**
     * Optimistically mark a topic as subscribed when you've done a local
     * Firebase `subscribeToTopic()` without a backend call (broadcast topic).
     * Use `addTopicSubscriptions` for backend-managed topics instead.
     */
    markTopicSubscribed: (state, { payload: topic }) => {
      if (!state.subscribedTopics.includes(topic)) {
        state.subscribedTopics.push(topic);
      }
    },

    /**
     * Optimistically remove a topic from local state (broadcast unsubscribe).
     */
    markTopicUnsubscribed: (state, { payload: topic }) => {
      state.subscribedTopics = state.subscribedTopics.filter(
        (t) => t !== topic,
      );
    },

    /**
     * Allows other slices / middleware to write the permission status
     * synchronously when they already have it (e.g. from a cached check).
     */
    setPermissionStatus: (state, { payload }) => {
      state.permissionStatus = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // ── Init / Register ────────────────────────────────────────────────────
      .addCase(initNotifications.pending, onPending("initStatus"))
      .addCase(initNotifications.fulfilled, (state, { payload }) => {
        state.initStatus = "succeeded";
        state.token = payload.token;
        state.registeredAt = payload.registeredAt;
        state.permissionStatus = "granted"; // if we got a token, permission is granted
        state.error = null;
      })
      //   .addCase(initNotifications.rejected, (state, { payload }) => {
      //     state.initStatus = "failed";
      //     state.error = payload ?? null;
      //     // If rejected due to permission denial, surface that explicitly
      //     if (typeof payload === "string" && payload.includes("Permission")) {
      //       state.permissionStatus = "denied";
      //     }
      //   })

      .addCase(initNotifications.rejected, (state, { payload }) => {
        state.initStatus = "failed";
        state.error = payload ?? null;

        // Service returns null (→ rejectWithValue message) when permission is not granted.
        // Don't assume "denied" here — the live check may return "undetermined" (dismissible).
        // syncPermissionStatus (called on every foreground) will set the accurate status.
      })

      // ── Token rotation (Firebase-initiated) ───────────────────────────────
      .addCase(rotateToken.pending, onPending("rotateStatus"))
      .addCase(rotateToken.fulfilled, (state, { payload }) => {
        state.rotateStatus = "succeeded";
        state.token = payload.token;
        state.registeredAt = payload.registeredAt;
        state.error = null;
      })
      .addCase(rotateToken.rejected, onRejected("rotateStatus"))

      // ── Deregister ────────────────────────────────────────────────────────
      .addCase(deregisterNotifications.pending, onPending("deregisterStatus"))
      .addCase(deregisterNotifications.fulfilled, (state) => {
        // Token cleared; reset all runtime state but keep permission status
        // so the UI can still show "notifications are disabled" accurately.
        const preservedPermission = state.permissionStatus;
        Object.assign(state, {
          ...initialState,
          permissionStatus: preservedPermission,
          deregisterStatus: "succeeded",
        });
      })
      .addCase(deregisterNotifications.rejected, onRejected("deregisterStatus"))

      // ── Add topic subscriptions ────────────────────────────────────────────
      .addCase(addTopicSubscriptions.pending, onPending("addTopicsStatus"))
      .addCase(
        addTopicSubscriptions.fulfilled,
        (state, { payload: newTopics }) => {
          state.addTopicsStatus = "succeeded";
          // Merge without duplicates
          const merged = new Set([...state.subscribedTopics, ...newTopics]);
          state.subscribedTopics = Array.from(merged);
          state.error = null;
        },
      )
      .addCase(addTopicSubscriptions.rejected, onRejected("addTopicsStatus"))

      // ── Remove topic subscriptions ─────────────────────────────────────────
      .addCase(
        removeTopicSubscriptions.pending,
        onPending("removeTopicsStatus"),
      )
      .addCase(
        removeTopicSubscriptions.fulfilled,
        (state, { payload: removedTopics }) => {
          state.removeTopicsStatus = "succeeded";
          state.subscribedTopics = state.subscribedTopics.filter(
            (t) => !removedTopics.includes(t),
          );
          state.error = null;
        },
      )
      .addCase(
        removeTopicSubscriptions.rejected,
        onRejected("removeTopicsStatus"),
      )

      // ── Permission sync ────────────────────────────────────────────────────
      .addCase(syncPermissionStatus.pending, onPending("permissionSyncStatus"))
      .addCase(syncPermissionStatus.fulfilled, (state, { payload: status }) => {
        state.permissionSyncStatus = "succeeded";
        state.permissionStatus = status;

        /**
         * If the user revoked permission in Settings while the app was in the
         * background, invalidate the stored token so `initNotifications` will
         * attempt re-registration (which will fail gracefully and surface the
         * denied state) instead of treating the stale token as valid.
         */
        if (status === "denied") {
          state.token = null;
          state.registeredAt = null;
        }
      })
      .addCase(
        syncPermissionStatus.rejected,
        onRejected("permissionSyncStatus"),
      );
  },
});

export const {
  resetNotifications,
  markTopicSubscribed,
  markTopicUnsubscribed,
  setPermissionStatus,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
