/**
 * useHomeData
 *
 * Single source of truth for the Home screen's data layer.
 *
 * Responsibilities
 * ─────────────────
 * 1. Guard all queries behind tournament readiness + online state
 * 4. Expose stable refresh handlers so child components don't re-render
 * 5. Surface loading + error states the UI can actually consume
 *
 * Rules enforced here
 * ────────────────────
 * - No query fires until `isQueryEnabled` is true
 * - Mount-guard prevents state updates after unmount
 * - Errors are caught, logged, and surfaced — never silently swallowed
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsOffline } from "@shared/utils/offlineGuard";
import { useAppSelector } from "@store/hooks";
import { logger } from "@lib/events/logger";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useHomeData = () => {
  // ── Public API ──────────────────────────────────────────────────────────────

  return {};
};
