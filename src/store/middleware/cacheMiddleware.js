// src/store/middleware/cacheMiddleware.js

import { cacheSet, cacheDelete } from "@lib/storage/mmkv";
import { CACHE_KEYS } from "@lib/storage/cacheKeys";

import {
  loginWithGoogle,
  loadAuth,
  updatePreferences,
  logout,
  deleteAccount,
} from "../slices/authSlice";
import { updateProfile } from "../slices/profileSlice";

/* -------------------------------------------------------------------------- */
/*                         FIELDS SAFE TO CACHE IN MMKV                       */
/*                                                                            */
/*  Tokens and sensitive credentials stay in EncryptedStorage only.           */
/*  This picks only display/preference fields for fast UI hydration.          */
/* -------------------------------------------------------------------------- */

const extractCacheableProfile = (user) => {
  if (!user) return null;

  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    fantasyTeamName: user.fantasyTeamName,
    favoriteTeamId: user.favoriteTeamId,
    favoriteTeamTournamentCode: user.favoriteTeamTournamentCode,
  };
};

/* -------------------------------------------------------------------------- */
/*                            CACHE MIDDLEWARE                                 */
/* -------------------------------------------------------------------------- */

export const cacheMiddleware = (store) => (next) => (action) => {
  // Always let the action reach the reducer first
  const result = next(action);

  switch (action.type) {
    /* ── Write cache after successful login ─────────────────────────────── */
    case loginWithGoogle.fulfilled.type: {
      const user = action.payload?.user;
      if (user) {
        cacheSet(CACHE_KEYS.AUTH_USER_PROFILE, extractCacheableProfile(user));
      }
      break;
    }

    /* ── Write cache after auth check resolves ──────────────────────────── */
    case loadAuth.fulfilled.type: {
      const user = action.payload?.user;
      if (user) {
        cacheSet(CACHE_KEYS.AUTH_USER_PROFILE, extractCacheableProfile(user));
      }
      break;
    }

    /* ── Merge preference update into existing cache ────────────────────── */
    case updatePreferences.fulfilled.type: {
      const { auth } = store.getState();
      if (auth?.user) {
        cacheSet(
          CACHE_KEYS.AUTH_USER_PROFILE,
          extractCacheableProfile(auth.user),
        );
      }
      break;
    }

    /* ── Merge profile update into existing cache ───────────────────────── */
    case updateProfile.fulfilled.type: {
      const { auth } = store.getState();
      if (auth?.user) {
        cacheSet(
          CACHE_KEYS.AUTH_USER_PROFILE,
          extractCacheableProfile(auth.user),
        );
      }
      break;
    }

    /* ── Clear all auth cache on logout or account deletion ─────────────── */
    case logout.fulfilled.type:
    case deleteAccount.fulfilled.type: {
      cacheDelete(CACHE_KEYS.AUTH_USER_PROFILE);
      break;
    }

    default:
      break;
  }

  return result;
};
