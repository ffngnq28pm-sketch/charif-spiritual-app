import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Vibration,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { RotateCcw } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTasbih } from '@/hooks/useTasbih';

const DHIKR_LABELS: Record<number, string> = {
  33: 'سُبْحَانَ اللَّهِ',
  66: 'الْحَمْدُ لِلَّهِ',
  99: 'اللَّهُ أَكْبَرُ',
};

function getDhikrLabel(count: number): string {
  if (count < 33) return 'سُبْحَانَ اللَّهِ';
  if (count < 66) return 'الْحَمْدُ لِلَّهِ';
  if (count < 99) return 'اللَّهُ أَكْبَرُ';
  return '﴾ لَا إِلَهَ إِلَّا اللَّهُ ﴿';
}

export function TasbihCounter() {
  const { colors } = useTheme();
  const { count, milestone, progress, floatAnim, increment, reset } = useTasbih();

  const isMilestone = [33, 99, 100].includes(count);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -28],
  });
  const floatOpacity = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.wrapper}>
      {/* Arabic dhikr label */}
      <Text style={[styles.dhikrText, { color: colors.textMuted }]}>
        {getDhikrLabel(count)}
      </Text>

      {/* Progress arc area + tap button */}
      <View style={styles.tapArea}>
        {/* Progress bar */}
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress, 1) * 100}%` as any,
                backgroundColor: isMilestone ? '#C9A84C' : colors.textAccent,
              },
            ]}
          />
        </View>

        {/* Main tap button */}
        <TouchableOpacity
          style={[
            styles.tapBtn,
            {
              backgroundColor: isMilestone ? '#C9A84C18' : colors.bgSection,
              borderColor: isMilestone ? '#C9A84C' : colors.borderAccent,
            },
          ]}
          onPress={() => {
            if (Platform.OS !== 'web') {
              if (isMilestone) {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
              } else {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              }
            }
            increment();
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.countText,
              {
                color: isMilestone ? '#C9A84C' : colors.textPrimary,
                fontFamily: isMilestone ? 'Amiri_700Bold' : 'Lato_700Bold',
              },
            ]}
          >
            {count}
          </Text>
          <Text style={[styles.milestoneText, { color: colors.textMuted }]}>
            /{milestone}
          </Text>
        </TouchableOpacity>

        {/* Float +1 animation */}
        <Animated.View
          style={[
            styles.floatLabel,
            { transform: [{ translateY: floatY }], opacity: floatOpacity },
          ]}
          pointerEvents="none"
        >
          <Text style={[styles.floatText, { color: colors.textAccent }]}>+1</Text>
        </Animated.View>

        {/* Reset button */}
        <TouchableOpacity style={styles.resetBtn} onPress={reset} activeOpacity={0.7}>
          <RotateCcw size={14} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {isMilestone && count > 0 && (
        <Text style={styles.milestoneLabel}>
          {count === 33 ? 'سُبْحَانَ اللَّهِ ×33' : count === 99 ? 'اللَّهُ أَكْبَرُ ×99' : 'لَا إِلَهَ إِلَّا اللَّهُ'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  dhikrText: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 16,
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  tapArea: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    width: '60%',
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  tapBtn: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 0,
  },
  countText: {
    fontSize: 32,
    letterSpacing: -1,
  },
  milestoneText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    alignSelf: 'flex-end',
    marginBottom: 6,
    marginLeft: 1,
  },
  floatLabel: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
  floatText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  resetBtn: {
    padding: 8,
  },
  milestoneLabel: {
    fontFamily: 'Amiri_400Regular',
    fontSize: 14,
    color: '#C9A84C',
    textAlign: 'center',
  },
});
