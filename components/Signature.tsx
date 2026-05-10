import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function Signature() {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap} pointerEvents="none">
      <Text style={[styles.text, { color: colors.textMuted }]}>by Charif</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 94,
    right: 14,
    zIndex: 1,
    opacity: 0.28,
  },
  text: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 10,
    fontStyle: 'italic',
    letterSpacing: 0.4,
  },
});
