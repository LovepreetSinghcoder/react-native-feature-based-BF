// // src/lib/storage/cacheKeys.js

// export const CACHE_KEYS = {
//   SPORTS: "catalog:sports",
//   SELECTED_SPORT: "user:selectedSport", // persisted preference
//   TOURNAMENTS_BY_SPORT: (sportCode) => `catalog:tournaments:${sportCode}`,
//   SELECTED_TOURNAMENT: "user:selectedTournament", // ← ADD THIS LINE
// };

// src/lib/storage/cacheKeys.js

export const CACHE_KEYS = {
  // ── Catalog ──────────────────────────────────────────────────────────────
  SPORTS: "catalog:sports",
  TOURNAMENTS_BY_SPORT: (sportCode) => `catalog:tournaments:${sportCode}`,

  // ── User Preferences (non-sensitive) ─────────────────────────────────────
  SELECTED_SPORT: "user:selectedSport",
  SELECTED_TOURNAMENT: "user:selectedTournament",

  // ── Auth profile cache (non-sensitive display data only) ──────────────────
  // Tokens and credentials stay in EncryptedStorage — never here.
  AUTH_USER_PROFILE: "auth:user:profile",
};
