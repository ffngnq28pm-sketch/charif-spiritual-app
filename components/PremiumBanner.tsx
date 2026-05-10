import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Sparkles, Lock } from 'lucide-react-native';
import { usePremium, FREE_CARD_LIMIT } from '@/hooks/usePremium';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  onPress: () => void;
  currentIndex?: number;
}

export function PremiumBanner({ onPress, currentIndex = 0 }: Props) {
  const { isPremium } = usePremium();
  const { colors } = useTheme();
  const glow = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.5, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (isPremium) return null;

  const remaining = Math.max(0, FREE_CARD_LIMIT - currentIndex);
  const nearLimit = remaining <= 10;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: nearLimit
            ? 'rgba(201,168,76,0.07)'
            : colors.bgSection,
          borderColor: nearLimit
            ? 'rgba(201,168,76,0.35)'
            : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <Animated.View style={[styles.dot, { opacity: glow, backgroundColor: nearLimit ? '#C9A84C' : colors.textMuted }]} />

      <View style={styles.textBlock}>
        {nearLimit ? (
          <Text style={[styles.label, { color: '#C9A84C' }]}>
            {remaining === 0
              ? 'Votre dernière sagesse offerte'
              : `Encore ${remaining} sagesse${remaining > 1 ? 's' : ''} offerte${remaining > 1 ? 's' : ''}`}
          </Text>
        ) : (
          <Text style={[styles.label, { color: colors.textMuted }]}>
            Sagesse {currentIndex + 1} sur {FREE_CARD_LIMIT} · Nour Premium
          </Text>
        )}
      </View>

      <View style={[styles.pill, { backgroundColor: 'rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.3)' }]}>
        <Sparkles size={10} color="#C9A84C" />
        <Text style={styles.pillText}>Premium</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  textBlock: { flex: 1 },
  label: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pillText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 0.3,
  },
});
