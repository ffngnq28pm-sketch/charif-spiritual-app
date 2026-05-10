import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradeLevel } from '@/types';
import { useTheme } from "@/context/ThemeContext";

interface Props {
  grade: GradeLevel;
  gradeScore: number;
  compact?: boolean;
}

const GRADE_COLORS: Record<GradeLevel, string> = {
  'Postulant':  '#8A8A8A',
  'Novice':     '#7A9A6A',
  'Apprenti':   '#5A8A7A',
  'Disciple':   '#4A7FA5',
  'Initié':     '#5A6A9A',
  'Aspirant':   '#7A5A9A',
  'Gardien':    '#9A5A5A',
  'Compagnon':  '#9A7A3A',
  'Savant':     '#C9A84C',
  'Maître':     '#D4AF37',
};

const GRADE_ICONS: Record<GradeLevel, string> = {
  'Postulant':  '○',
  'Novice':     '◎',
  'Apprenti':   '◈',
  'Disciple':   '◆',
  'Initié':     '✦',
  'Aspirant':   '✧',
  'Gardien':    '✦✦',
  'Compagnon':  '❋',
  'Savant':     '❊',
  'Maître':     '✸',
};

export default function GradeDisplay({ grade, gradeScore, compact = false }: Props) {
  const { colors } = useTheme();
  const color = GRADE_COLORS[grade];
  const icon = GRADE_ICONS[grade];

  if (compact) {
    return (
      <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color }]}>
        <Text style={[styles.badgeIcon, { color }]}>{icon}</Text>
        <Text style={[styles.badgeText, { color }]}>{grade}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bgCard }]}>
      <View style={[styles.circle, { borderColor: color, backgroundColor: color + '15' }]}>
        <Text style={[styles.circleIcon, { color }]}>{icon}</Text>
      </View>
      <Text style={[styles.gradeLabel, { color }]}>{grade}</Text>
      <Text style={[styles.scoreLabel, { color: colors.textMuted }]}>{gradeScore} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleIcon: {
    fontSize: 32,
  },
  gradeLabel: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  scoreLabel: {
    fontSize: 13,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
