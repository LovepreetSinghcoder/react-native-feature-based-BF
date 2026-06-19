import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '@theme/colors';

export default function ActivityLoader({ size = 'large', color = colors.primary }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});