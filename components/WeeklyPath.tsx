import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { WeeklyPath as WeeklyPathType } from '@/data/weeklyPaths';

interface Props {
  paths: WeeklyPathType[];
  progress: Record<string, number>;
  isPremium: boolean;
  onAdvance: (id: string) => void;
  onReset: (id: string) => void;
}

export function WeeklyPath({ paths, progress, isPremium, onAdvance, onReset }: Props) {
  const { colors } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdvance = (path: WeeklyPathType) => {
    if (path.premium && !isPremium) return;
    const current = progress[path.id] ?? 0;
    if (current >= path.durationDays) {
      // Already complete, offer reset
      Alert.alert(
        'Parcours complété',
        `Tu as terminé "${path.title}" ! Veux-tu le recommencer depuis le début ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Recommencer',
            onPress: () => onReset(path.id),
          },
        ]
      );
      return;
    }
    onAdvance(path.id);
  };

  const handleReset = (path: WeeklyPathType) => {
    Alert.alert(
      'Réinitialiser',
      `Recommencer "${path.title}" depuis le Jour 1 ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => onReset(path.id),
        },
      ]
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {paths.map((path) => {
        const current = progress[path.id] ?? 0;
        const isCompleted = current >= path.durationDays;
        const isLocked = path.premium && !isPremium;
        const isExpanded = expandedId === path.id;
        const progressPct = Math.min(current / path.durationDays, 1);
        const currentDayData = path.days[Math.min(current, path.durationDays - 1)];
        const dayLabel =
          current === 0
            ? 'Commencer'
            : isCompleted
            ? 'Complété ✓'
            : `Jour ${current + 1} / ${path.durationDays}`;

        return (
          <View
            key={path.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.bgCard,
                borderColor: isExpanded ? colors.borderAccent : colors.border,
                opacity: isLocked ? 0.75 : 1,
              },
            ]}
          >
            {/* Lock overlay */}
            {isLocked && (
              <View style={[styles.lockOverlay, { backgroundColor: colors.bg + 'CC' }]}>
                <Text style={styles.lockIcon}>★</Text>
                <Text style={[styles.lockLabel, { color: colors.textAccent }]}>Premium</Text>
                <Text style={[styles.lockSubLabel, { color: colors.textMuted }]}>Débloquer</Text>
              </View>
            )}

            {/* Header */}
            <TouchableOpacity
              onPress={() => !isLocked && setExpandedId(isExpanded ? null : path.id)}
              activeOpacity={0.8}
              disabled={isLocked}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>{path.emoji}</Text>
                <View style={styles.cardTitleBox}>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
                    {path.title}
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textMuted }]} numberOfLines={2}>
                    {path.subtitle}
                  </Text>
                </View>
              </View>

              {/* Progress bar */}
              <View style={styles.progressRow}>
                <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progressPct * 100}%` as unknown as number,
                        backgroundColor: isCompleted ? '#6BBF7C' : colors.textAccent,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressLabel, { color: colors.textMuted }]}>{dayLabel}</Text>
              </View>
            </TouchableOpacity>

            {/* Expanded day practice */}
            {isExpanded && !isLocked && currentDayData && (
              <View style={[styles.dayExpanded, { borderTopColor: colors.border }]}>
                <Text style={[styles.dayTitle, { color: colors.textAccent }]}>
                  Jour {currentDayData.dayNum} — {currentDayData.title}
                </Text>
                <Text style={[styles.dayPractice, { color: colors.textSecondary }]}>
                  {currentDayData.practice}
                </Text>
                {currentDayData.scripture && (
                  <View style={[styles.scriptureBox, { backgroundColor: colors.bgSection, borderColor: colors.borderAccent }]}>
                    <Text style={[styles.scriptureText, { color: colors.textAccent, fontFamily: 'Amiri_700Bold' }]}>
                      {currentDayData.scripture}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Action buttons */}
            {!isLocked && (
              <View style={styles.cardActions}>
                {!isCompleted ? (
                  <TouchableOpacity
                    style={[styles.continueBtn, { backgroundColor: colors.textAccent }]}
                    onPress={() => handleAdvance(path)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.continueBtnText}>
                      {current === 0 ? 'Commencer' : 'Jour accompli ✓'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.completedRow}>
                    <View style={[styles.completedBadge, { backgroundColor: '#6BBF7C22', borderColor: '#6BBF7C' }]}>
                      <Text style={[styles.completedBadgeText, { color: '#6BBF7C' }]}>
                        🏆 Parcours complété !
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleReset(path)}
              style={[styles.resetBtn, { borderColor: colors.border }]}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.resetBtnText, { color: colors.textMuted }]}>↺</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {current > 0 && !isCompleted && (
                  <TouchableOpacity
                    onPress={() => handleReset(path)}
                    style={styles.resetLink}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.resetLinkText, { color: colors.textMuted }]}>Réinitialiser</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingRight: 8,
    gap: 12,
  },
  card: {
    width: 260,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    overflow: 'hidden',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 16,
  },
  lockIcon: {
    fontSize: 32,
    color: '#C9A84C',
  },
  lockLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  lockSubLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardTitleBox: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 15,
  },
  cardSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    lineHeight: 15,
  },
  progressRow: {
    gap: 6,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    textAlign: 'right',
  },
  dayExpanded: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    gap: 10,
  },
  dayTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  dayPractice: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 19,
  },
  scriptureBox: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  scriptureText: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  cardActions: {
    marginTop: 14,
    gap: 6,
  },
  continueBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  completedRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  completedBadge: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  completedBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
  resetBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 18,
  },
  resetLink: {
    alignSelf: 'center',
  },
  resetLinkText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
  },
});
