// AppInput.jsx

import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "@theme/colors";

const AppInput = ({
  // Label
  label,

  // Input props
  placeholder,
  placeholderTextColor = colors.textSecondary,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  editable,
  multiline,
  numberOfLines,
  maxLength,
  autoCapitalize,
  returnKeyType,
  onSubmitEditing,

  // Icons
  leftIcon,
  rightIcon,

  // Error
  error,
  showError = true,

  // Styling
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Label - only renders if passed */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {/* Input Row */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: showError && error ? colors.error : colors.glassBorder,
          },
          inputContainerStyle,
        ]}
      >
        {/* Left Icon - only renders if passed */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={[styles.input, inputStyle]}
        />

        {/* Right Icon - only renders if passed */}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {/* Error - only renders if error string exists */}
      {showError && error && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    color: colors.textWhite,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.glassBorder,
    backgroundColor: colors.cardGlass,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: colors.textWhite,
    fontSize: 15,
    paddingVertical: 14,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default AppInput;
