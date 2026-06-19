const colors = {
  // Main Gradient Background
  backgroundGradient: ["#020618", "#3C0366", "#020618"],
  backgroundGradientFootball: ["#0a2c19", "#040F0A", "#0e1527"], // FIFA

  // Primary Brand
  primary: "#6C3BAA",
  primaryDark: "#4A2482",
  primaryLight: "#A67EDB",

  // ✅ NEW (missing from your file)
  accent: "#FF5EAA",
  accentLight: "#FF90D7",

  // Backgrounds
  background: "#FFFFFF",
  secondaryBackground: "#F5F5F5",
  tertiaryBackground: "#010104",

  // ✅ NEW (surface system)
  surface: "#0F152D",
  surfaceLight: "#161D36",

  // Test Colors
  testbg: "#a9a9a9",

  // Text
  textPrimary: "#1A1A1A",
  textSecondary: "#9F9DA3",
  textWhite: "#FFFFFF",
  textBlack: "#000",

  // Borders
  border: "#E5E5E5",

  // Status
  success: "#28A745",
  error: "#DC3545",
  warning: "#FFC107",

  // ✅ NEW
  info: "#3B82F6",

  // Social Login
  google: "#DB4437",
  twitter: "#1DA1F2",

  // Glass
  cardGlass: "rgba(255,255,255,0.09)",
  glassBorder: "rgba(255,255,255,0.18)",
  glassLight: "rgba(255,255,255,0.25)",

  // ✅ NEW (semantic overlays)
  overlayLight: "rgba(255,255,255,0.15)",
  errorLight: "rgba(220,53,69,0.20)",
  errorBorder: "rgba(220,53,69,0.30)",

  // ⚠️ Existing overrides (kept as-is)
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.70)",

  // ✅ NEW
  textTertiary: "rgba(255,255,255,0.50)",

  // ✅ NEW aliases
  white: "#FFFFFF",
  black: "#000000",

  // ✅ NEW semantic
  live: "#FF6467",

  // Gradients
  gradientPurple: ["#9810FA", "#E60076"],
  miGradient: ["#155DFC", "#51A2FF"],
  cskGradient: ["#F0B100", "#FFDF20"],
};

export default colors;

// New version of handling colors

export const sportPalettes = {
  CRICKET: {
    primary: "#8B5CF6",
    primaryDark: "#6D28D9",
    primaryLight: "#C4B5FD",
    accent: "#EC4899",
    // backgroundGradient: ["#130B28", "#0A0617", "#060A14"],
    backgroundGradient: ["#020618", "#3C0366", "#020618"],
    boosterGradient: ["#F3CF6F", "#FF5271"],
    lightGrad: ["rgba(152,16,250,0.20)", "rgba(230,0,118,0.12)"],
    // const grad2 : ["rgba(0, 200, 83, 0.22)", "rgba(0, 229, 204, 0.12)"];
    boosterText: "#191919",

    surface: "rgba(255,255,255,0.05)",
    surfaceLight: "rgba(255,255,255,0.08)",
    cardGlass: "rgba(255,255,255,0.055)",
    glassBorder: "rgba(255,255,255,0.14)",
    border: "rgba(255,255,255,0.09)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.60)",
    textTertiary: "rgba(255,255,255,0.35)",
    live: "#FF6467",
    success: "#22C55E",
    error: "#EF4444",
    warning: "#FFC107",
    spark: "#FFCB05",
    gradientBrand: ["#8B5CF6", "#EC4899"],
    navBg: "rgba(8,4,18,0.96)",
  },
  FOOTBALL: {
    primary: "#019f43",
    primaryDark: "#007A3D",
    primaryLight: "#C6F135",
    accent: "#00E5CC",
    // backgroundGradient: ["#061A0F", "#040F0A", "#060A14"],
    backgroundGradient: ["#0e3b22", "#040F0A", "#111b34"],
    boosterGradient: ["#532d01", "#7A3A00", "#ac5403", "#8f4602", "#532d01"],
    // linear-gradient(90deg, #3A1F00, #7A3A00, #3A1F00)
    lightGrad: ["rgba(0, 200, 83, 0.22)", "rgba(0, 229, 204, 0.12)"],
    boosterText: "#FFCB05",

    surface: "rgba(0,200,83,0.05)",
    surfaceLight: "rgba(0,200,83,0.08)",
    cardGlass: "rgba(255,255,255,0.055)",
    glassBorder: "rgba(0,200,83,0.25)",
    border: "rgba(255,255,255,0.09)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.60)",
    textTertiary: "rgba(255,255,255,0.35)",
    live: "#FF6467",
    success: "#22C55E",
    error: "#EF4444",
    warning: "#FFC107",
    spark: "#FFCB05",
    // gradientBrand: ["#00C853", "#C6F135"],
    gradientBrand: ["#005825", "#00C853"],

    navBg: "rgba(4,10,6,0.96)",
  },
  TENNIS: {
    primary: "#EAB308",
    primaryDark: "#A16207",
    primaryLight: "#FEF08A",
    accent: "#F97316",
    backgroundGradient: ["#1A1200", "#0F0C00", "#060A14"],
    boosterGradient: ["#F3CF6F", "#FF5271"],
    lightGrad: ["rgba(0, 200, 83, 0.22)", "rgba(0, 229, 204, 0.12)"],
    boosterText: "#FFCB05",

    surface: "rgba(234,179,8,0.05)",
    surfaceLight: "rgba(234,179,8,0.08)",
    cardGlass: "rgba(255,255,255,0.055)",
    glassBorder: "rgba(234,179,8,0.25)",
    border: "rgba(255,255,255,0.09)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.60)",
    textTertiary: "rgba(255,255,255,0.35)",
    live: "#FF6467",
    success: "#22C55E",
    error: "#EF4444",
    warning: "#FFC107",
    spark: "#FFCB05",
    gradientBrand: ["#EAB308", "#F97316"],
    navBg: "rgba(15,10,0,0.96)",
  },
  BASKETBALL: {
    primary: "#00BCD4",
    primaryDark: "#00838F",
    primaryLight: "#80DEEA",
    accent: "#FF5722",
    backgroundGradient: ["#001A1F", "#000F14", "#060A14"],
    boosterGradient: ["#F3CF6F", "#FF5271"],
    lightGrad: ["rgba(0, 200, 83, 0.22)", "rgba(0, 229, 204, 0.12)"],
    boosterText: "#FFCB05",
    surface: "rgba(0,188,212,0.05)",
    surfaceLight: "rgba(0,188,212,0.08)",
    cardGlass: "rgba(255,255,255,0.055)",
    glassBorder: "rgba(0,188,212,0.25)",
    border: "rgba(255,255,255,0.09)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.60)",
    textTertiary: "rgba(255,255,255,0.35)",
    live: "#FF6467",
    success: "#22C55E",
    error: "#EF4444",
    warning: "#FFC107",
    spark: "#FFCB05",
    gradientBrand: ["#00BCD4", "#FF5722"],
    navBg: "rgba(0,10,15,0.96)",
  },
};
