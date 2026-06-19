import { useThemeStore } from "@lib/storage/themeStore";

export const useTheme = () => {
  const { colors, activeSport } = useThemeStore();
  return { colors, activeSport };
};
