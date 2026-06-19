import { create } from "zustand";
import { sportPalettes } from "@theme/colors";
import { readSelectedSport } from "@lib/storage/sportPreference";
import { logger } from "../events/logger";

// Hydrate from MMKV on app start (sportPreference.js already handles this)
const savedSport = readSelectedSport();
const initialSport = savedSport?.code ?? "CRICKET";

logger.info("[themeStore] -> ", initialSport);

export const useThemeStore = create((set) => ({
  activeSport: initialSport,
  colors: sportPalettes[initialSport] ?? sportPalettes.cricket,

  setSport: (sportCode) => {
    const palette = sportPalettes[sportCode] ?? sportPalettes.cricket;
    set({ activeSport: sportCode, colors: palette });
  },
}));
