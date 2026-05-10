import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useDailyChallenge } from '@/hooks/useDailyChallenge';

const CATEGORY_COLORS: Record<string, string> = {
  action:    '#4A9E6F',  // vert sage
  présence:  '#6B8FBF',  // bleu calme
  parole:    '#9B7BC8',  // violet doux
  gratitude: '#C9A84C',  // or — même accent que l'app
  dhikr:     '#C9A84C',  // or
};

export function DailyChallengeWidget() {
  const { colors } = useTheme();
  const { challenge, isCompleted, monthlyCount, markDone } = useDailyChallenge();

  const accent = colors.textAccent;
  const catColor = CATEGORY_COLORS[challenge.category] ?? accent;

  // Bounce animation on mark-done
  const scale = useRef(new Animated.Value(1)).current;

  function handleMarkDone() {
    if (isCompleted) return;
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    markDone();
  }

  return (
    <Animated.View style={[styles.card, { backgroundColor: colors.bgSection, borderColor: colors.border, transform: [{ scale }] }]}>
      {/* Left accent bar */}
      <View style={[styles.bar, { backgroundColor: catColor }]} />

      <View style={styles.body}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.emoji}>{challenge.emoji}</Text>
          <Text style={[styles.label, { color: colors.textMuted }]}>DÉFI DU JOUR</Text>
          {monthlyCount > 0 && (
            <View style={[styles.countPill, { backgroundColor: accent + '15', borderColor: accent + '30' }]}>
              <Text style={[styles.countText, { color: accent }]}>{monthlyCount} ce mois</Text>
            </View>
          )}
        </View>

        {/* Challenge text */}
        <Text style={[styles.challengeText, { color: colors.textPrimary }, isCompleted && { color: colors.textMuted }]}>
          {challenge.text}
        </Text>

        {/* Action */}
        {isCompleted ? (
          <View style={styles.doneRow}>
            <CheckCircle size={15} color={catColor} />
            <Text style={[styles.doneLabel, { color: catColor }]}>Relevé aujourd'hui</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.btn, { borderColor: catColor, backgroundColor: catColor + '12' }]}
            onPress={handleMarkDone}
            activeOpacity={0.75}
          >
            <Text style={[styles.btnText, { color: catColor }]}>✓ Relevé</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  bar: {
    width: 3,
  },
  body: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  emoji: {
    fontSize: 14,
  },
  label: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    flex: 1,
  },
  countPill: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  countText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    letterSpacing: 0.3,
  },
  challengeText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13.5,
    lineHeight: 20,
  },
  doneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  doneLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  btn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginTop: 2,
  },
  btnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    letterSpacing: 0.3,
  },
});
