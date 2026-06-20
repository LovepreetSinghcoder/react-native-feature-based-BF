# React Native Starter (Expo Bare Workflow)

A feature-based, production-ready React Native starter — Google Sign-In, profile management, notifications, theming, and offline-aware networking wired up out of the box. Built on **Expo bare workflow**, so you get native module access (Firebase, Google Sign-In) without giving up Expo tooling.

This README is written for **the next person setting this up from a fresh clone** — including future-you on a new machine. Follow it top to bottom on first setup; after that, use it as a reference.

---

## Table of Contents

1. [Stack](#stack)
2. [Folder Structure & Architecture](#folder-structure--architecture)
3. [Prerequisites](#prerequisites)
4. [First-Time Setup](#first-time-setup)
5. [Renaming the App (Package Name / Bundle ID)](#renaming-the-app-package-name--bundle-id)
6. [Environment Variables (`.env`)](#environment-variables-env)
7. [Google Sign-In Setup (Avoiding `DEVELOPER_ERROR`)](#google-sign-in-setup-avoiding-developer_error)
8. [Firebase / `google-services.json` Setup](#firebase--google-servicesjson-setup)
9. [Android Signing — Debug & Release Keystores](#android-signing--debug--release-keystores)
10. [`gradle.properties` Signing Config](#gradleproperties-signing-config)
11. [`app.json` — When and What to Update](#appjson--when-and-what-to-update)
12. [Icons & Splash Screen](#icons--splash-screen)
13. [Notifications Setup](#notifications-setup)
14. [Analytics / Event Tracking Setup](#analytics--event-tracking-setup)
15. [State Management (Redux Toolkit)](#state-management-redux-toolkit)
16. [Caching & Local Storage (MMKV)](#caching--local-storage-mmkv)
17. [Theming](#theming)
18. [Running the App](#running-the-app)
19. [Common Errors & Fixes](#common-errors--fixes)
20. [Adding a New Feature](#adding-a-new-feature)
21. [Pre-Release Checklist](#pre-release-checklist)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | React Native (Expo **bare** workflow) |
| Language | JavaScript (JSX) |
| State | Redux Toolkit |
| Local storage / cache | MMKV |
| Auth | Firebase Auth + `@react-native-google-signin/google-signin` |
| Navigation | React Navigation (Stack-based: `RootNavigator` → `Auth` / `Onboarding` / `App`) |
| Push notifications | Firebase Cloud Messaging (`notifications.firebase.js`) |
| Styling | Custom theme system (`src/theme`) — no NativeWind/Tailwind despite the leftover `tailwind.config.js`; see [Theming](#theming) |
| Networking | Centralized Axios-style client (`src/api/client.js`) with offline detection |

> **Expo bare workflow**, not managed. That means `android/` is a real native project you can open in Android Studio and edit directly — `app.json` drives some of it, but native Java/Kotlin/Gradle files are the source of truth once you eject-equivalent changes are made (e.g., signing, manifest permissions).

---

## Folder Structure & Architecture

This is a **feature-based** structure, not a type-based one. Don't create global `screens/`, `components/`, `hooks/` folders for feature-specific things — they belong inside their feature.

```
src/
├── api/                  # Axios client + per-domain API modules (auth, profile, notifications)
├── assets/               # Feature-agnostic images/icons/fonts used app-wide
├── config/               # env.js (reads .env), api.routes.js (endpoint constants)
├── constants/             # App-wide constants (auth, boosters, team, transfer)
├── features/             # One folder per feature — THIS IS WHERE YOU WORK
│   └── <feature>/
│       ├── components/   # Components used only within this feature
│       ├── context/       # React Context, if the feature needs one
│       ├── hooks/         # Feature-specific hooks
│       ├── screens/       # One folder per screen: index.jsx + styles.js (+ .skeleton.jsx)
│       └── viewModels/    # Optional: screen-level business logic separated from UI
├── lib/
│   ├── events/            # Cross-feature event buses (alert, auth, logger)
│   ├── services/           # Firebase, analytics, auth, notifications, profile, social auth
│   └── storage/            # MMKV instance, cache keys, theme persistence
├── navigation/             # All navigators + tab config live here, nowhere else
├── shared/                 # Truly reusable across 2+ features (ui, layout, skeletons, hooks, utils)
├── store/                  # Redux: slices, selectors, middleware, root reducer
└── theme/                  # Colors, spacing, typography, global styles
```

### Rules to keep this scalable

- **If a component/hook is used by exactly one feature, it lives in that feature's folder.** It only graduates to `src/shared/` the second a different feature needs it too. Premature sharing creates tangled imports.
- **Every screen folder gets `index.jsx` + `styles.js`** (and `ScreenName.skeleton.jsx` if it has a loading state). Keeps screens predictable to navigate to.
- **API calls never happen directly in components.** Component → hook (or viewModel) → `api/` module → `client.js`. This is what makes screens testable and keeps Axios config in one place.
- **Redux slices live only in `store/slices/`.** Feature folders can have local `viewModels/` for screen-specific derived state, but global state (auth, network, notifications) stays centralized.
- New feature → copy the shape of an existing one (`profile/` is the most complete reference: components, hooks, screens, skeleton all present).

---

## Prerequisites

Install these before doing anything else:

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18.x or 20.x LTS | Check with `node -v` |
| pnpm | latest | `npm install -g pnpm` — this repo uses pnpm, don't mix in `npm install` (you'll get a stray `package-lock.json`, which is already a leftover in this repo — see note below) |
| Java JDK | 17 | Required for Gradle/Android builds |
| Android Studio | latest | For SDK, emulator, and `keytool` (bundled with the JDK it installs) |
| Watchman | latest (macOS only) | `brew install watchman` |
| Xcode | latest (macOS only, if building iOS) | iOS builds not covered in detail here — folder structure shows Android-first |

> **Note on `package-lock.json`:** the repo currently has both `package-lock.json` and (presumably) a `pnpm-lock.yaml`. Pick **one** package manager and delete the other lockfile — mixing them causes dependency drift between machines. This guide assumes pnpm.

---

## First-Time Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd <project-folder>
pnpm install

# 2. Copy environment template
cp .env.development .env.local   # or create .env.local from scratch — see Env section

# 3. Android: create your debug keystore (see Keystore section below)
# 4. Add your own google-services.json (see Firebase section below)
# 5. Update package name / bundle ID (see Renaming section below)

# 6. Run
npx expo run:android
```

Do **not** skip steps 3–5 — the app will build but Google Sign-In will fail with `DEVELOPER_ERROR` if you skip them.

---

## Renaming the App (Package Name / Bundle ID)

When you clone this as a starter for a new app, the package name (`com.rnstarter` based on the folder structure) needs to change **everywhere** — partial renames are the #1 cause of mysterious build failures.

### Places to update:

1. **`app.json`**
   ```json
   {
     "expo": {
       "name": "YourAppName",
       "slug": "your-app-slug",
       "android": { "package": "com.yourcompany.yourapp" },
       "ios": { "bundleIdentifier": "com.yourcompany.yourapp" }
     }
   }
   ```

2. **`android/app/build.gradle`** — `namespace` and `applicationId` must match `app.json`'s android package:
   ```gradle
   android {
       namespace "com.yourcompany.yourapp"
       defaultConfig {
           applicationId "com.yourcompany.yourapp"
       }
   }
   ```

3. **Native Kotlin package folders** — rename the actual directory structure:
   ```
   android/app/src/main/java/com/rnstarter/  →  android/app/src/main/java/com/yourcompany/yourapp/
   ```
   And update the `package` declaration at the top of `MainActivity.kt` and `MainApplication.kt` to match.

4. **`android/app/src/debug/AndroidManifest.xml`** and the main manifest — check for any hardcoded package references.

5. **`google-services.json`** — this file is tied to the package name. If you rename the package, you must regenerate this file from Firebase (see next section) — it will not work with a mismatched package name and will fail silently or throw `DEVELOPER_ERROR`.

> **Easiest path:** use `npx react-native-rename "YourAppName" -b com.yourcompany.yourapp` if available for your RN version, then manually verify steps 3–5 since bare-workflow + Expo plugin setups sometimes confuse the automated renamer.

---

## Environment Variables (`.env`)

The repo has three env files: `.env.development`, `.env.local`, `.env.production`. They're read through `src/config/env.js`.

### How it works
- `.env.local` is for **your personal machine** — gitignored, never committed, always wins over the others.
- `.env.development` / `.env.production` are checked-in defaults for each build channel.
- `config/env.js` is the **single place** that reads `process.env` — never call `process.env.X` directly in feature code. Add new variables there first, then consume them via the exported config object.

### When you add a new variable:
1. Add it to whichever `.env.*` file(s) it belongs in.
2. Add it to `src/config/env.js`'s export object — this is also where you should add a runtime check (throw or warn if a required var is missing) so misconfiguration fails loudly in dev, not silently in production.
3. If it's used by a native module (e.g., a Google Web Client ID needed at JS runtime for Google Sign-In), confirm it doesn't also need to be duplicated in `google-services.json` or `app.json` — some values need to exist in both places.

### Typical variables this template needs:
```
API_BASE_URL=
GOOGLE_WEB_CLIENT_ID=
FIREBASE_API_KEY=        # usually not needed separately if google-services.json is present
SENTRY_DSN=               # if/when you wire up crash reporting
```

> Never commit real secrets in `.env.development` if the repo is public — treat it as a template with dummy/staging values, and keep production secrets in `.env.local` or your CI's secret store.

---

## Google Sign-In Setup (Avoiding `DEVELOPER_ERROR`)

This is the single most common setup failure in RN + Firebase + Google Sign-In projects. `DEVELOPER_ERROR` (code 10) almost always means a **mismatch between your app's SHA-1 fingerprint and what's registered in the Firebase/Google Cloud console** — not a code bug.

### Step-by-step

1. **Get your SHA-1 and SHA-256 fingerprints** for whichever keystore you're currently building with:
   ```bash
   # Debug keystore (default Android debug key)
   keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android

   # Release keystore (your own, see Keystore section)
   keytool -list -v -keystore android/app/upload.keystore -alias <your-alias>
   ```
   Copy both the **SHA-1** and **SHA-256** values.

2. **Register both fingerprints in Firebase**:
   Firebase Console → Project Settings → Your Android app → "Add fingerprint" → paste SHA-1, then add SHA-256 too. You need the **debug** fingerprint registered for local dev and the **release** fingerprint registered before you ever build a release/Play Store build, including internal testing tracks.

3. **Re-download `google-services.json`** after adding fingerprints — the file embeds OAuth client info per fingerprint, so old downloads won't have the new one baked in.

4. **Get the Web Client ID** (not the Android client ID) from Firebase Console → Project Settings → Your Android app, or from Google Cloud Console → APIs & Credentials → OAuth 2.0 Client IDs → the one of type "Web application". This is the ID `socialAuth.service.js` needs to pass into `GoogleSignin.configure({ webClientId: ... })`.

5. **Configure in code** (`lib/services/socialAuth.service.js`):
   ```js
   import { GoogleSignin } from '@react-native-google-signin/google-signin';

   GoogleSignin.configure({
     webClientId: ENV.GOOGLE_WEB_CLIENT_ID, // from config/env.js, the WEB client ID, not Android
     offlineAccess: false, // set true only if you need a refresh token server-side
   });
   ```

6. **Play Store signing note:** if you publish through Google Play App Signing, Google re-signs your app with its **own** key for distribution. That means the SHA-1 of the APK installed from the Play Store is *different* from your upload keystore's SHA-1. You must also add the **Play App Signing SHA-1** (found in Play Console → Setup → App Integrity) to Firebase, or Google Sign-In will work in internal builds but break for real Play Store users.

### Checklist when you hit `DEVELOPER_ERROR`
- [ ] Correct `webClientId` (Web type, not Android type) in code
- [ ] SHA-1 of the keystore you're *currently* running registered in Firebase
- [ ] SHA-256 also registered (newer Google Sign-In versions check this too)
- [ ] `google-services.json` re-downloaded *after* adding fingerprints
- [ ] Package name in `google-services.json` exactly matches `applicationId` in `build.gradle`
- [ ] If testing a release/Play build: Play App Signing SHA-1 also registered
- [ ] Google Sign-In API enabled in Google Cloud Console for the linked project

---

## Firebase / `google-services.json` Setup

1. Go to [Firebase Console](https://console.firebase.google.com) → create a project (or use an existing one, Google Cloud Console Account).
2. Add an Android app to the project. Use the **exact** package name from `app.json` / `build.gradle`.
3. Download `google-services.json`.
4. Place it at:
   ```
   android/app/google-services.json
   ```
   (This is the only valid location — the Google Services Gradle plugin looks for it there specifically.)
5. Confirm `android/build.gradle` (project-level) has the Google Services classpath, and `android/app/build.gradle` (app-level) applies the plugin:
   ```gradle
   // project-level android/build.gradle
   classpath 'com.google.gms:google-services:<version>'

   // app-level android/app/build.gradle, at the bottom
   apply plugin: 'com.google.gms.google-services'
   ```
6. If you renamed the package or added SHA fingerprints, **re-download and replace this file** — don't hand-edit it.
7. `google-services.json` is environment-specific. If you have separate Firebase projects for dev/staging/prod, you'll need a small Gradle flavor setup to swap the file per build variant — not included by default in this template, add it if/when you need multiple Firebase environments.

> This file should **not** be committed if the repo is public (it's project-identifying, though not a secret by itself — Google's own guidance is it's safe-ish to commit, but most teams gitignore it anyway and document the setup, which is what this README is for).

---

## Android Signing — Debug & Release Keystores

### Debug keystore
Already exists at `android/app/debug.keystore` (Android's well-known default debug key, password `android`/`android`, alias `androiddebugkey`). You normally don't need to touch this — Expo/RN generates one automatically if missing. Used for local development and `npx expo run:android` / debug builds.

### Release keystore (`upload.keystore`)
This is **your app's identity for the Play Store** — losing it means you can never update your app under the same listing again. Treat it like a production secret.

1. **Generate it** (if the one in the repo isn't yours — you should generate your own per real app, never reuse the starter template's keystore for a real release):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 \
     -keystore upload.keystore \
     -alias upload \
     -keyalg RSA -keysize 2048 -validity 10000
   ```
   You'll be prompted for a store password, key password, and identity info. **Save these passwords in a password manager immediately** — there is no recovery if lost.

2. **Place it** at `android/app/upload.keystore`.

3. **Never commit the real keystore or its passwords to git.** If this starter has a placeholder `upload.keystore` checked in, treat it as a *template artifact only* — generate a fresh one for any real app and add `*.keystore` to `.gitignore` (excluding maybe a clearly-labeled debug one if your team wants it shared for consistency, though even that's debatable).

4. **Back it up** somewhere outside git — encrypted cloud storage, a password manager's file storage, or your CI's secret store. Google Play App Signing acts as a safety net (Google holds the actual signing key and you just need your *upload* key), but you still need the upload key to push new versions.

---

## `gradle.properties` Signing Config

`android/gradle.properties` holds the signing credentials Gradle reads at build time. **Never put real passwords directly in `gradle.properties` if it's committed to git** — use one of these patterns instead:

### Recommended: local, gitignored properties file
Create `android/keystore.properties` (gitignored):
```properties
RELEASE_STORE_FILE=upload.keystore
RELEASE_STORE_PASSWORD=your_store_password
RELEASE_KEY_ALIAS=upload
RELEASE_KEY_PASSWORD=your_key_password
```

Then in `android/app/build.gradle`:
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['RELEASE_STORE_FILE'])
                storePassword keystoreProperties['RELEASE_STORE_PASSWORD']
                keyAlias keystoreProperties['RELEASE_KEY_ALIAS']
                keyPassword keystoreProperties['RELEASE_KEY_PASSWORD']
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### What goes in `.gitignore`
```
android/keystore.properties
android/app/upload.keystore
*.keystore
!debug.keystore
```

### CI/CD note
For CI builds (GitHub Actions, etc.), don't commit `keystore.properties` — instead decode the keystore from a base64 secret and write `keystore.properties` at build time from CI secret variables.

---

## `app.json` — When and What to Update

`app.json` is the Expo config — it drives some native generation (icons, splash, permissions on prebuild) but in **bare workflow**, native files are already generated, so editing `app.json` alone won't always propagate. Know which is which:

| Field | When to update | Also requires native changes? |
|---|---|---|
| `expo.name` | Changing the app's display name | No — but check `strings.xml` (`app_name`) matches if you want it consistent |
| `expo.slug` | Renaming the project/EAS project | No |
| `expo.version` | **Every release** — user-facing version string | iOS: also update in Xcode project if not using EAS auto-increment |
| `expo.android.versionCode` | **Every Play Store release** — must increase each submission | Also mirrored in `android/app/build.gradle` (`versionCode`) — keep both in sync manually in bare workflow |
| `expo.android.package` | Renaming the app (see [Renaming](#renaming-the-app-package-name--bundle-id)) | Yes — `build.gradle` `applicationId`/`namespace`, native folder structure, `google-services.json` |
| `expo.icon` / `expo.android.adaptiveIcon` | Changing app icon | Yes — regenerate native icon assets (see [Icons](#icons--splash-screen)) |
| `expo.splash` | Changing splash screen | Yes — regenerate native splash assets |
| `expo.android.permissions` | Adding a feature needing a permission (camera, location, etc.) | Yes — also add to `AndroidManifest.xml` directly, since bare workflow won't auto-inject on every build like managed workflow does |

**Rule of thumb for bare workflow:** treat `app.json` as documentation/config-of-record, but always verify the corresponding native file (`build.gradle`, `AndroidManifest.xml`, `strings.xml`) actually changed too. Unlike managed Expo, `app.json` changes don't auto-apply unless you explicitly run `npx expo prebuild` (which can overwrite custom native code if you're not careful — use `--no-install` and diff before committing if you ever run it on this bare project).

---

## Icons & Splash Screen

This template currently has **two parallel icon sets** in the structure — `assets/` (root-level, likely legacy/Expo-managed-style) and `src/assets/` (used by the app). Confirm which one is actually wired up via `app.json` before editing; don't edit both and assume it's covered.

### App Icon
1. Source image: **1024×1024px PNG**, no transparency, no rounded corners (the OS applies the mask).
2. Update `app.json`:
   ```json
   "icon": "./assets/icon.png"
   ```
3. **Android adaptive icon** needs three layers:
   ```json
   "android": {
     "adaptiveIcon": {
       "foregroundImage": "./assets/android-icon-foreground.png",
       "backgroundColor": "#FFFFFF",
       "monochromeImage": "./assets/android-icon-monochrome.png"
     }
   }
   ```
   - **Foreground**: 1024×1024, your logo centered within the safe zone (inner ~66% — anything near the edges gets clipped by different launcher mask shapes).
   - **Background**: solid color or a separate background image.
   - **Monochrome**: single-color silhouette version, used for Android 13+ themed icons.
4. Since this is **bare workflow**, after changing `app.json` icon references you typically still need the actual files placed correctly in `android/app/src/main/res/mipmap-*` folders for the build to pick them up — `app.json`-only changes apply automatically only under managed workflow or when you re-run prebuild. The cleanest approach: use `npx expo prebuild --platform android` in a throwaway branch to regenerate the mipmap assets correctly sized, then copy just the regenerated `mipmap-*` folders into your real `android/app/src/main/res/`.

### Splash Screen
1. Source image: simple, centered logo on a solid background — avoid full-bleed photos (they crop unpredictably across device aspect ratios).
2. Update `app.json`:
   ```json
   "splash": {
     "image": "./assets/splash-icon.png",
     "resizeMode": "contain",
     "backgroundColor": "#FFFFFF"
   }
   ```
3. Same caveat as icons: in bare workflow, the actual splash drawables live in `android/app/src/main/res/drawable*/splashscreen_image.png` (visible in the folder structure already) — update those directly, or regenerate via prebuild and copy over, don't rely on `app.json` alone.
4. If using `expo-splash-screen`, confirm `SplashScreen.preventAutoHideAsync()` is called early (likely in `App.jsx`) and `hideAsync()` is called once your root navigation/auth check resolves — otherwise you'll get a flash of blank screen between native splash and JS-rendered splash.

---

## Notifications Setup

Push notifications run through Firebase Cloud Messaging, wired in `lib/services/notifications.firebase.js` and `notifications.service.js`, with UI in `features/notification/` and `shared/components/feedback/NotificationBanner.jsx`.

### Setup steps
1. **Firebase Console** → Project Settings → Cloud Messaging — confirm FCM is enabled for your project (it is by default once you add an Android app).
2. **`google-services.json`** already contains what's needed for FCM — no separate config file required for Android.
3. **Permissions** (Android 13+ requires runtime notification permission):
   - Confirm `AndroidManifest.xml` has:
     ```xml
     <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
     ```
   - Request it at runtime (typically on first app launch or right before you need to show a notification) — check `notifications.service.js` for where this should be called; if it's missing, add a `PermissionsAndroid.request(...)` or `notifee`/`@react-native-firebase/messaging` equivalent call.
4. **Foreground vs background handling:**
   - Foreground messages need an explicit listener (`messaging().onMessage(...)`) since Android won't auto-display a system notification while the app is open — that's likely what `NotificationBanner.jsx` is for (in-app banner UI for foreground pushes).
   - Background/quit-state messages need a background handler registered **outside** the React component tree, typically at the top of `index.jsx`:
     ```js
     messaging().setBackgroundMessageHandler(async remoteMessage => {
       // handle data-only payloads here
     });
     ```
5. **Token management:** get the FCM token via `messaging().getToken()` and send it to your backend (likely through `notifications.api.js`) so the server can target this device. Also listen for `onTokenRefresh` and re-sync.
6. **Testing:** use Firebase Console → Cloud Messaging → "Send test message" with a real device's FCM token to verify end-to-end delivery before building any backend trigger logic.

---

## Analytics / Event Tracking Setup

`lib/events/` (`alert.events.js`, `auth.events.js`, `logger.js`) and `lib/services/analytics.service.js` suggest a lightweight internal event bus pattern, separate from a third-party analytics SDK (no Firebase Analytics or Mixpanel/Amplitude visible in the structure — if you add one, it plugs in here).

### Recommended pattern (extend what's there)
1. **`analytics.service.js`** should be the single chokepoint — a thin wrapper exposing something like:
   ```js
   export const Analytics = {
     track: (eventName, properties = {}) => { /* send to provider(s) */ },
     identify: (userId, traits = {}) => { /* tie events to a user */ },
     screen: (screenName) => { /* screen view tracking */ },
   };
   ```
   This way, swapping or adding a provider (Firebase Analytics, Amplitude, PostHog, Segment) later means touching **one file**, not every screen.

2. **`lib/events/*.events.js`** look like domain-specific event *definitions* (constants for event names + maybe payload shapes) — keep this pattern: don't hardcode raw strings like `Analytics.track("user_logged_in")` scattered across the app. Define them once:
   ```js
   // auth.events.js
   export const AUTH_EVENTS = {
     LOGIN_SUCCESS: 'auth_login_success',
     LOGIN_FAILED: 'auth_login_failed',
     SIGNUP_COMPLETE: 'auth_signup_complete',
   };
   ```
   Then call `Analytics.track(AUTH_EVENTS.LOGIN_SUCCESS, { method: 'google' })` from `useAuth.js` or wherever the actual login resolves.

3. **`logger.js`** is likely your dev/debug-only console logger — keep analytics (business events) and logging (developer debugging) conceptually separate even if they're called from the same places, since you'll want to strip/quiet `logger.js` output in production builds but keep `analytics.service.js` firing.

4. **If you add Firebase Analytics specifically**, it reuses the same `google-services.json` already in place — just install `@react-native-firebase/analytics` and call `analytics().logEvent(...)` inside your `analytics.service.js` wrapper, don't call it directly from components.

5. **Screen tracking:** hook into `navigation/AppNavigator.jsx`'s `onStateChange` (or `useNavigationContainerRef` + `onReady`/state listener pattern) to auto-fire `Analytics.screen(routeName)` on every navigation change, instead of manually calling it in every screen's `useEffect`.

---

## State Management (Redux Toolkit)

```
store/
├── slices/         # authSlice, appSlice, networkSlice, notificationsSlice, profileSlice, uiSlice
├── selectors/       # authSelectors.js — derived/memoized reads
├── middleware/       # cacheMiddleware.js — likely syncs slice state to MMKV
├── rootReducer.js
├── index.js          # store configuration
└── hooks.js           # typed useAppDispatch / useAppSelector wrappers
```

### Conventions to maintain
- **One slice per domain**, not per screen. A new feature usually doesn't need its own slice — only add one if state needs to be shared across features or survive screen unmounts (auth, network status, notifications qualify; a single screen's form state usually doesn't).
- **Selectors live in `selectors/`, not inline in components**, especially anything derived/computed (not just direct `state.auth.user` reads) — keeps memoization (`createSelector`) centralized and prevents duplicate derivation logic.
- **Always use `store/hooks.js`'s typed hooks** (`useAppDispatch`, `useAppSelector`) instead of raw `useDispatch`/`useSelector` from `react-redux` — keeps a single point to add middleware-aware typing later.
- **`cacheMiddleware.js`** — if this persists slices to MMKV, be deliberate about what's persisted (auth tokens, user prefs) vs. ephemeral (network status, UI loading flags shouldn't survive app restarts).

---

## Caching & Local Storage (MMKV)

```
lib/storage/
├── mmkv.js            # MMKV instance creation
├── cacheKeys.js        # Centralized key constants — never hardcode storage keys inline
├── storage.js           # Generic get/set/remove wrapper around the MMKV instance
├── sportPreference.js    # Example: a domain-specific storage helper built on storage.js
└── themeStore.js          # Theme persistence (likely paired with Zustand per memory context)
```

### Pattern to follow for any new cached data
1. Add a key constant to `cacheKeys.js` — never write a raw string key directly in feature code.
2. Use `storage.js`'s generic helpers for simple key-value reads/writes.
3. For anything with its own get/set semantics or stale-while-revalidate logic (like the catalog/boosters/player caching mentioned in prior work), create a dedicated file alongside `sportPreference.js` rather than scattering MMKV calls through feature code — keeps all cache invalidation logic discoverable in one folder.
4. **Never store sensitive tokens in MMKV without encryption.** MMKV supports an encryption key option (`new MMKV({ id: '...', encryptionKey: '...' })`) — use it for the instance that holds auth tokens, even though MMKV is already faster/more secure than AsyncStorage by default.

---

## Theming

```
theme/
├── colors.js
├── config.js
├── fonts.js
├── spacing.js
├── typography.js
├── index.js            # likely re-exports everything as a single `theme` object
└── styles/globalStyles.js
```

This is a **custom theme system**, not NativeWind — despite `tailwind.config.js` existing at the root, it doesn't appear wired into any feature's styles based on the structure (every screen has its own `styles.js`, which is the StyleSheet pattern, not className-based). If `tailwind.config.js` is a leftover from scaffolding, either remove it or, if you do intend to migrate to NativeWind later, do it as a deliberate full migration — don't let the two systems coexist silently.

Sport-based dynamic theming (per prior work: Zustand + MMKV driving color theme switching) means **`useTheme.js`** (`shared/hooks/useTheme.js`) is likely the hook every screen should pull colors from, rather than importing `theme/colors.js` directly — direct imports bypass the dynamic switching.

### When adding a new screen's styles
```js
// styles.js
import { theme } from '@/theme'; // or relative import per your alias setup
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background, // not a hardcoded hex
    padding: theme.spacing.md,
  },
});
```
Hardcoded colors/spacing in a `styles.js` file is the easiest way to make this theme system gradually meaningless — always pull from `theme/`.

---

## Running the App

```bash
# Start Metro bundler
pnpm start

# Run on Android (builds native + installs + launches)
npx expo run:android

# Run on a specific variant/flavor if configured
npx expo run:android --variant release

# Clean rebuild (when native changes don't seem to apply)
cd android && ./gradlew clean && cd ..
npx expo run:android
```

If you change anything **native** (gradle files, `google-services.json`, manifest, signing config), Metro's fast refresh won't pick it up — you need a fresh `expo run:android`, not just a Metro reload.

---

## Common Errors & Fixes

| Error | Likely Cause | Fix |
|---|---|---|
| `DEVELOPER_ERROR` (Google Sign-In) | SHA-1/256 fingerprint not registered, or wrong Web Client ID | See [Google Sign-In Setup](#google-sign-in-setup-avoiding-developer_error) checklist |
| `Execution failed for task ':app:processDebugGoogleServices'` | `google-services.json` missing or package name mismatch | Confirm file is at `android/app/google-services.json` and `package_name` inside it matches `applicationId` |
| App builds but Google button does nothing / silently fails | `GoogleSignin.configure()` never called, or called after the sign-in button renders | Call `configure()` once at app startup (e.g., top of `App.jsx` or in `AuthContext`), before any sign-in attempt |
| `Keystore was tampered with, or password was incorrect` | Wrong password in `keystore.properties`, or pointing at the wrong keystore file | Double-check `RELEASE_STORE_PASSWORD` / `RELEASE_KEY_PASSWORD` and that `RELEASE_STORE_FILE` path is correct relative to `android/app/` |
| Notifications work in foreground, not in background | Background handler not registered, or registered inside a React component instead of top-level | Register `messaging().setBackgroundMessageHandler()` at the very top of `index.jsx`, outside any component |
| Icon/splash changes don't show up after editing `app.json` | Bare workflow doesn't auto-apply `app.json` asset changes without prebuild | Manually update native asset folders, or regenerate via `prebuild` and copy over (see [Icons & Splash](#icons--splash-screen)) |
| `UnknownDependenciesException` (NestJS — backend, not this RN repo) | N/A here, listed for awareness if you also touch the backend | Not applicable to this README's scope |

---

## Adding a New Feature

1. Create `src/features/<feature-name>/` with the standard subfolders (`components/`, `hooks/`, `screens/`) — only add `context/` or `viewModels/` if actually needed.
2. Each screen gets its own folder under `screens/`: `index.jsx` + `styles.js`, plus `.skeleton.jsx` if it has async loading states (follow `HomeScreen`'s pattern).
3. If the feature needs API calls, add a new file under `src/api/<feature-name>/` rather than reusing an unrelated domain's API module.
4. If the feature needs global state, add a slice under `store/slices/` and a matching file in `store/selectors/`.
5. Add the screen to the appropriate navigator in `src/navigation/` — don't create ad-hoc navigation outside this folder.
6. Wire up analytics events for key actions in this feature using the pattern in [Analytics Setup](#analytics--event-tracking-setup).
7. If the feature needs cached/offline data, add a dedicated storage helper in `lib/storage/` following `sportPreference.js`'s pattern.

---

## Pre-Release Checklist

- [ ] `expo.version` and `android.versionCode` bumped in `app.json`, and `versionCode`/`versionName` mirrored in `android/app/build.gradle`
- [ ] Release keystore fingerprint (SHA-1 + SHA-256) registered in Firebase
- [ ] Play App Signing SHA-1 also registered in Firebase (after first Play Console upload)
- [ ] `google-services.json` is the production Firebase project's file, not a dev/staging one
- [ ] `.env.production` has correct `API_BASE_URL` and production keys
- [ ] `keystore.properties` / CI secrets are correctly pointing at the real release keystore, not debug
- [ ] App icon and splash assets are final, both in `app.json` references and actual native asset folders
- [ ] Notification permission flow tested on a real Android 13+ device
- [ ] Tested a release build (`--variant release`), not just debug — some bugs (ProGuard/R8 stripping, signing-specific issues) only appear in release builds
- [ ] Privacy policy / data safety form updated if any new data collection was added (see prior Play Store documentation work for the data safety form reference)

---

### Questions or gaps in this README?

This is a living document. If you set something up and the steps here didn't match reality, update this file in the same PR — the next person (possibly future-you) will thank you.
