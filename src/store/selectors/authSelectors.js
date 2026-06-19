import { AUTH_REVALIDATE_TTL_MS } from "@constants/auth.constants";
// src/store/selectors/authSelectors.js

/* -------------------------------------------------------------------------- */
/*                              AUTH SELECTORS                                 */
/* -------------------------------------------------------------------------- */

/** The full user object from auth slice */
export const selectUser = (state) => state.auth.user;

/** Auth load + check status */
export const selectAuthStatus = (state) => state.auth.status;

/** Has the initial auth check completed (cache or network) */
export const selectAuthChecked = (state) => state.auth.authChecked;

/** True only on very first login ever */
export const selectIsNewUser = (state) => state.auth.isNewUser;

/** Access token — read from Redux, written by loadAuth/loginWithGoogle */
export const selectAccessToken = (state) => state.auth.accessToken;

/** Any auth-layer error message */
export const selectAuthError = (state) => state.auth.error;

/** Preferences updating flag — used for loading state on preferences screen */
export const selectPreferencesUpdating = (state) =>
  state.auth.preferencesUpdating;

/* ── Derived ──────────────────────────────────────────────────────────────── */

/** True if user is logged in */
export const selectIsAuthenticated = (state) =>
  !!state.auth.user && !!state.auth.accessToken;

/** User's display name with a safe fallback */
export const selectDisplayName = (state) =>
  state.auth.user?.displayName ?? "Player";

/** Fantasy team name */
export const selectFantasyTeamName = (state) =>
  state.auth.user?.fantasyTeamName ?? null;

/** Has the user completed onboarding preferences */
export const selectHasPreferences = (state) =>
  !!state.auth.user?.favoriteTeamId;

/** Returns true when a network revalidation is needed */
export const selectNeedsRevalidation = (state) => {
  const { authChecked, accessToken, lastVerifiedAt } = state.auth;

  // Never been checked — always fetch
  if (!authChecked || !accessToken) return true;

  // No timestamp recorded — treat as stale
  if (!lastVerifiedAt) return true;

  return Date.now() - lastVerifiedAt > AUTH_REVALIDATE_TTL_MS;
};
