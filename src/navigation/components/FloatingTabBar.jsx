import React, { memo, useCallback, useRef } from "react";
import { View, Pressable, StyleSheet, Platform, Animated } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { LinearGradient } from "expo-linear-gradient";

/* -------------------------------------------------------------------------- */
/*  ROOT CAUSE — WHY BLURVIEW OVERLAYS ON ANDROID API 29–31                  */
/*                                                                            */
/*  API 29–30: BlurView uses a bitmap snapshot fallback. It captures the      */
/*  frame buffer at mount/update time and blurs that static image. When the   */
/*  navigator re-mounts the tab bar during transitions, the snapshot is       */
/*  taken before the new screen composites — so the blurred bitmap sits       */
/*  frozen on top of whatever was underneath it.                              */
/*                                                                            */
/*  API 31: BlurView uses RenderEffect, which should composite correctly.     */
/*  But RN's elevation system gives Views their own rendering layer, and      */
/*  BlurView's RenderEffect applies to that isolated layer — not the          */
/*  underlying screen content. Result: it blurs its own background (usually   */
/*  transparent/black) and renders that on top.                               */
/*                                                                            */
/*  FIX: Never use BlurView on Android. Fake glass with layered Views         */
/*  + LinearGradient is pixel-composited in the normal draw order, so it      */
/*  can never overlay or capture wrong frames. On iOS, UIVisualEffectView     */
/*  (what BlurView wraps) composites at the system level — no issue there.   */
/* -------------------------------------------------------------------------- */

/* ------------------------------------------------------------------ */
/*  Android fake-glass — works on API 21+, zero artifacts             */
/* ------------------------------------------------------------------ */
const AndroidGlass = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    {/* Layer 1 — dark frost body */}
    <View style={styles.androidFrost} />

    {/* Layer 2 — diagonal gradient sheen: "light hitting glass" */}
    <LinearGradient
      style={[StyleSheet.absoluteFill, { borderRadius: BORDER_RADIUS }]}
      colors={[
        "rgba(255, 255, 255, 0.13)",
        "rgba(255, 255, 255, 0.03)",
        "rgba(255, 255, 255, 0.09)",
      ]}
      locations={[0, 0.45, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
    />

    {/* Layer 3 — 1px top specular: the crisp glass rim */}
    <View style={styles.androidSpecular} />

    {/* Layer 4 — subtle inner border glow at bottom */}
    <View style={styles.androidBottomReflection} />
  </View>
);

/* ------------------------------------------------------------------ */
/*  iOS — real BlurView, no workarounds needed                         */
/* ------------------------------------------------------------------ */
const IOSGlass = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="chromeMaterialDark"
      blurAmount={20}
      reducedTransparencyFallbackColor="rgba(20,20,28,0.92)"
    />
    <LinearGradient
      style={StyleSheet.absoluteFill}
      colors={["rgba(255,255,255,0.12)", "rgba(255,255,255,0.04)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  </View>
);

/* ------------------------------------------------------------------ */
/*  FloatingTabBar                                                      */
/* ------------------------------------------------------------------ */
function FloatingTabBar({ state, descriptors, navigation }) {
  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const handlePressIn = useCallback(
    (index) => {
      Animated.spring(scaleAnims[index], {
        toValue: 0.84,
        useNativeDriver: true,
        speed: 50,
        bounciness: 2,
      }).start();
    },
    [scaleAnims],
  );

  const handlePressOut = useCallback(
    (index) => {
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        useNativeDriver: true,
        speed: 22,
        bounciness: 10,
      }).start();
    },
    [scaleAnims],
  );

  const handlePress = useCallback(
    (route, isFocused) => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation],
  );

  return (
    // pointerEvents="box-none" lets taps fall through the empty
    // wrapper area to the screen content below
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.card}>
        {Platform.OS === "ios" ? <IOSGlass /> : <AndroidGlass />}

        <View style={styles.tabs}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            return (
              <Pressable
                key={route.key}
                onPress={() => handlePress(route, isFocused)}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
                style={styles.tabOuter}>
                <Animated.View
                  style={[
                    styles.tab,
                    isFocused && styles.activeTab,
                    { transform: [{ scale: scaleAnims[index] }] },
                  ]}>
                  {options.tabBarIcon?.({
                    focused: isFocused,
                    color: isFocused ? "#ff3b3b" : "#6e6e80",
                    size: 22,
                  })}

                  {isFocused && <View style={styles.activeDot} />}
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const BORDER_RADIUS = 32;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 35,
    left: 24,
    right: 24,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 28,
    // Android shadow — keep elevation LOW so it never
    // creates a separate hardware layer that fights compositing
    elevation: 12,
    marginHorizontal: 30,
  },

  card: {
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 32,
  },

  /* Android glass layers */
  androidFrost: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(240,240,248,0.60)",

    borderRadius: BORDER_RADIUS,
  },

  androidSpecular: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 1,
  },

  androidBottomReflection: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 1,
  },

  /* Tabs */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  tabOuter: {
    flex: 1,
    alignItems: "center",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },

  activeTab: {
    backgroundColor: "rgba(240,240,240,0.60)", // matches blurred look
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.52)",
  },

  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ff3b3b",
  },
});

export default memo(FloatingTabBar);
