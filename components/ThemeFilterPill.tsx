import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function ThemeFilterPill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderColor: '#C9A84C',
  },
  label: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: '#8A8FA8',
  },
  labelActive: {
    fontFamily: 'Lato_700Bold',
    color: '#C9A84C',
  },
});
