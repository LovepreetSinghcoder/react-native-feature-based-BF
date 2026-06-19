module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
          alias: {
            // 🔹 Feature modules
            "@features": "./src/features",
            "@auth": "./src/features/auth",
            "@home": "./src/features/home",
            "@onboarding": "./src/features/onboarding",
            "@profile": "./src/features/profile",

            // 🔹 API layer
            "@api": "./src/api",

            // 🔹 Config
            "@config": "./src/config",

            // 🔹 Lib (services, events, storage)
            "@lib": "./src/lib",
            "@services": "./src/lib/services",

            // 🔹 Shared (reusable UI + utils)
            "@shared": "./src/shared",
            "@ui": "./src/shared/components/ui",
            "@layout": "./src/shared/components/layout",
            "@feedback": "./src/shared/components/feedback",
            "@loaders": "./src/shared/components/loaders",
            "@skeletons": "./src/shared/components/skeletons",
            "@utils": "./src/shared/utils",

            // 🔹 Navigation
            "@navigation": "./src/navigation",

            // 🔹 Store (Redux)
            "@store": "./src/store",

            // 🔹 Constants
            "@constants": "./src/constants",

            // 🔹 Theme
            "@theme": "./src/theme",
            "@styles": "./src/theme/styles",

            // 🔹 Assets
            "@assets": "./src/assets",

            // 🔹 Types
            "@types": "./src/types",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
