// BottomDrawer.jsx

import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  PanResponder,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import colors from "@theme/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomDrawer = ({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.9, // use 90% of screen height by default
  title = "test",
  showHandle = true,
  showBackdrop = true,
  closeOnBackdropPress = true,
  showBtns = true,
  showCloseButton = true,
  containerStyle,
  onPress,
  buttonTitle1,
  buttonAction1Handler,
  isButton1Disabled = false,
  buttonTitle2,
  buttonAction2Handler,
  isButton2Disabled = false,
}) => {
  const showButton2 = Boolean(buttonTitle2);
  const translateY = useRef(new Animated.Value(height)).current;
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsRendered(false);
      });
    }
  }, [visible]);

  // ✓ FIX 4 — useMemo so height is never stale inside the gesture handler
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => g.dy > 10,
        onPanResponderMove: (_, g) => {
          if (g.dy > 0) translateY.setValue(g.dy);
        },
        onPanResponderRelease: (_, g) => {
          if (g.dy > height * 0.3) {
            onClose();
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 4,
            }).start();
          }
        },
      }),
    [height],
  );

  return (
    <Modal
      visible={isRendered}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      {/* Backdrop */}
      {showBackdrop && (
        <TouchableWithoutFeedback
          onPress={closeOnBackdropPress ? onClose : null}>
          <View
            style={styles.backdrop}
            pointerEvents={visible ? "auto" : "none"} // ← key fix
          />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          styles.drawer,
          { height, transform: [{ translateY }] },
          containerStyle,
        ]}>
        <LinearGradient
          colors={colors.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}>
          {showHandle && (
            <View {...panResponder.panHandlers} style={styles.handleArea}>
              <View style={styles.handle} />
            </View>
          )}

          {/* Title row */}
          <View style={styles.titleRow}>
            {title && <Text style={styles.title}>{title}</Text>}
            {showCloseButton && (
              <Pressable onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>×</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.content}>{children}</View>
          {showBtns && (
            <View
              style={[
                styles.buttonRow,
                !showButton2 && styles.buttonRowSingle,
              ]}>
              {showButton2 ? (
                <>
                  <TouchableOpacity
                    style={styles.previewButton}
                    onPress={buttonAction1Handler}
                    disabled={isButton1Disabled}>
                    <LinearGradient
                      colors={["#EA2189", "#FB707C"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.gradientBorder}>
                      <View style={styles.previewInner}>
                        <Text style={styles.previewText}>{buttonTitle1}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <GradientButton
                    title={buttonTitle2}
                    onPress={buttonAction2Handler}
                    style={{
                      borderRadius: 10,
                      marginTop: 0,
                      opacity: isButton2Disabled ? 0.4 : 1,
                    }}
                    isDisable={isButton2Disabled}
                  />
                </>
              ) : (
                <GradientButton
                  title={buttonTitle1}
                  onPress={buttonAction1Handler}
                  style={{
                    borderRadius: 10,

                    marginTop: 0,
                    opacity: isButton1Disabled ? 0.4 : 1,
                  }}
                  isDisable={isButton1Disabled}
                />
              )}
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  backdrop: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  handleArea: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.glassBorder,
  },
  titleRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  closeBtnText: {
    color: colors.textWhite,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
  },
  title: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  titleCenter: {
    textAlign: "center",
  },
  previewBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  previewBtnText: {
    color: colors.textWhite,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    height: 55,
    backgroundColor: "transparent",
    alignItems: "stretch",
    justifyContent: "space-between",

    // backgroundColor: "#FFFFFF0D",
    // marginTop: 10,
    // borderTopWidth: 0.6,
    // borderBottomWidth: 0.6,
    // padding: 20,
    // borderColor: colors.glassBorder,
  },
  buttonRowSingle: {
    justifyContent: "center",
  },
  singleButtonOr: {
    borderRadius: 10,
    marginTop: 0,
  },
  singleButton: {
    minWidth: "70%",
  },
  button: {
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.4,
  },

  previewButton: {
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  gradientBorder: {
    paddingVertical: 1,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  previewInner: {
    backgroundColor: "#091132",
    paddingVertical: 13,
    width: "98.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  previewText: {
    fontSize: 18,
    fontWeight: "510",
    color: "#fff",
  },
});
