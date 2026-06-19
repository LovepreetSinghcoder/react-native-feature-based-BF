// src/lib/storage/mmkv.js
import { MMKV } from "react-native-mmkv";

export const mmkv = new MMKV({ id: "app-cache" });

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours — tune as needed

/**
 * Writes a value with a timestamp so callers can check staleness.
 * @param {string} key
 * @param {*} value  — must be JSON-serialisable
 */
export function cacheSet(key, value) {
  mmkv.set(key, JSON.stringify({ data: value, cachedAt: Date.now() }));
}

/**
 * Reads a cached value.
 * @param {string} key
 * @returns {{ data: *, isStale: boolean } | null}
 */
export function cacheGet(key) {
  const raw = mmkv.getString(key);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const isStale = Date.now() - parsed.cachedAt > CACHE_TTL_MS;
    return { data: parsed.data, isStale };
  } catch {
    return null; // corrupted entry — treat as miss
  }
}

/** Removes a single cache entry. */
export function cacheDelete(key) {
  mmkv.delete(key);
}

/** Removes all entries that start with a given prefix. */
export function cacheDeleteByPrefix(prefix) {
  mmkv
    .getAllKeys()
    .filter((k) => k.startsWith(prefix))
    .forEach((k) => mmkv.delete(k));
}
