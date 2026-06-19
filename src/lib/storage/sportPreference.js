// src/lib/storage/sportPreference.js

import { mmkv } from "./mmkv";
import { CACHE_KEYS } from "./cacheKeys";

// ─── Sport ────────────────────────────────────────────────────────────────────

export function readSelectedSport() {
  try {
    const raw = mmkv.getString(CACHE_KEYS.SELECTED_SPORT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSelectedSport(sport) {
  try {
    mmkv.set(CACHE_KEYS.SELECTED_SPORT, JSON.stringify(sport));
  } catch {
    // Redux still has it in memory — silent fail is acceptable
  }
}

export function clearSelectedSport() {
  mmkv.delete(CACHE_KEYS.SELECTED_SPORT);
}

// ─── Tournament ───────────────────────────────────────────────────────────────

/**
 * Read the persisted tournament preference synchronously.
 * Called once on app boot before Redux is ready.
 *
 * @returns {{ id: string, code: string, name: string, status: string } | null}
 */
export function readSelectedTournament() {
  try {
    const raw = mmkv.getString(CACHE_KEYS.SELECTED_TOURNAMENT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Persist the selected tournament.
 * We only store the fields we actually need so the payload stays lean.
 *
 * @param {{ id: string, code: string, name: string, status: string }} tournament
 */
export function saveSelectedTournament(tournament) {
  try {
    const { id, code, name, status } = tournament;
    mmkv.set(
      CACHE_KEYS.SELECTED_TOURNAMENT,
      JSON.stringify({ id, code, name, status }),
    );
  } catch {
    // silent — Redux still has it
  }
}

/** Call on logout / account reset. */
export function clearSelectedTournament() {
  mmkv.delete(CACHE_KEYS.SELECTED_TOURNAMENT);
}
