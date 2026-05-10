import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { DailySessionData, SessionStep } from '@/data/sessions';

const STEP_ICONS: Record<SessionStep['type'], string> = {
  intro: '🌙',
  reading: '📖',
  practice: '🤲',
  reflection: '💭',
  closing: '✨',
};

const STEP_LABELS: Record<SessionStep['type'], string> = {
  intro: 'Introduction',
  reading: 'Lecture',
  practice: 'Pratique',
  reflection: 'Réflexion',
  closing: 'Clôture',
};

interface Props {
  session: DailySessionData;
  visible: boolean;
  onComplete: (reflectionAnswer?: string) => void;
  onClose: () => void;
}

export function DailySession({ session, visible, onComplete, onClose }: Props) {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [savedReflection, setSavedReflection] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const step = session.steps[currentStep];
  const totalSteps = session.steps.length;

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setCurrentStep(0);
      setTimeLeft(session.steps[0]?.durationSec ?? 60);
      setIsRunning(false);
      setCompleted(false);
      setReflectionText('');
      setSavedReflection('');
      progressAnim.setValue(0);
    }
  }, [visible, session]);

  // Timer logic
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isRunning && !completed) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            handleStepComplete();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentStep]);

  // Progress bar animation
  useEffect(() => {
    const progress = currentStep / (totalSteps - 1);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps]);

  const handleStepComplete = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);

    // Save reflection if current step was reflection
    if (step?.type === 'reflection' && reflectionText.trim()) {
      setSavedReflection(reflectionText.trim());
    }

    const nextIndex = currentStep + 1;
    if (nextIndex >= totalSteps) {
      setCompleted(true);
    } else {
      setCurrentStep(nextIndex);
      setTimeLeft(session.steps[nextIndex]?.durationSec ?? 60);
      setReflectionText('');
    }
  }, [currentStep, totalSteps, session.steps, step, reflectionText]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleSkip = () => {
    handleStepComplete();
  };

  const handleFinish = () => {
    onComplete(savedReflection || undefined);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={[styles.closeBtnText, { color: colors.textMuted }]}>✕</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.sessionTitle, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
              {session.title}
            </Text>
            <Text style={[styles.sessionTheme, { color: colors.textAccent }]}>{session.theme}</Text>
          </View>
          <View style={styles.durationBadge}>
            <Text style={[styles.durationText, { color: colors.textMuted }]}>{session.durationMin} min</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth, backgroundColor: colors.textAccent }]}
          />
        </View>

        {/* Step indicators */}
        <View style={styles.stepsRow}>
          {session.steps.map((s, i) => (
            <View
              key={i}
              style={[
                styles.stepDot,
                {
                  backgroundColor:
                    i < currentStep
                      ? colors.textAccent
                      : i === currentStep
                      ? colors.textAccent + 'AA'
                      : colors.border,
                },
              ]}
            />
          ))}
        </View>

        {completed ? (
          /* Completion screen */
          <View style={styles.completedContainer}>
            <Text style={styles.completedEmoji}>✅</Text>
            <Text style={[styles.completedTitle, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
              Session terminée !
            </Text>
            <Text style={[styles.completedSubtitle, { color: colors.textSecondary }]}>
              Alhamdulillah, tu as consacré {session.durationMin} minutes à Allah.
            </Text>
            {savedReflection ? (
              <View style={[styles.savedReflectionBox, { backgroundColor: colors.bgCard, borderColor: colors.borderAccent }]}>
                <Text style={[styles.savedReflectionLabel, { color: colors.textAccent }]}>Ton journal :</Text>
                <Text style={[styles.savedReflectionText, { color: colors.textSecondary }]}>{savedReflection}</Text>
              </View>
            ) : null}
            <TouchableOpacity
              style={[styles.finishBtn, { backgroundColor: colors.textAccent }]}
              onPress={handleFinish}
              activeOpacity={0.85}
            >
              <Text style={styles.finishBtnText}>Terminer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Step content */
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentInner}
            keyboardShouldPersistTaps="handled"
          >
            {/* Step type */}
            <View style={styles.stepTypeRow}>
              <Text style={styles.stepIcon}>{STEP_ICONS[step.type]}</Text>
              <Text style={[styles.stepTypeLabel, { color: colors.textAccent }]}>
                {STEP_LABELS[step.type]}
              </Text>
              <View style={[styles.stepNumBadge, { backgroundColor: colors.bgSection }]}>
                <Text style={[styles.stepNumText, { color: colors.textMuted }]}>
                  {currentStep + 1} / {totalSteps}
                </Text>
              </View>
            </View>

            {/* Timer */}
            {isRunning && (
              <View style={[styles.timerBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <Text style={[styles.timerText, { color: timeLeft <= 10 ? '#E07070' : colors.textAccent }]}>
                  {formatTime(timeLeft)}
                </Text>
              </View>
            )}

            {/* Step text */}
            <Text style={[styles.stepText, { color: colors.textPrimary }]}>{step.text}</Text>

            {/* Instruction */}
            {step.instruction && (
              <View style={[styles.instructionBox, { backgroundColor: colors.bgCard, borderColor: colors.borderAccent }]}>
                <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
                  {step.instruction}
                </Text>
              </View>
            )}

            {/* Reflection input */}
            {step.type === 'reflection' && (
              <View style={[styles.reflectionContainer, { borderColor: colors.border }]}>
                <Text style={[styles.reflectionLabel, { color: colors.textAccent }]}>Ma réflexion :</Text>
                <TextInput
                  style={[
                    styles.reflectionInput,
                    {
                      color: colors.textPrimary,
                      backgroundColor: colors.bgInput,
                      borderColor: colors.border,
                    },
                  ]}
                  value={reflectionText}
                  onChangeText={setReflectionText}
                  multiline
                  placeholder="Écris ta réflexion ici..."
                  placeholderTextColor={colors.textMuted}
                  textAlignVertical="top"
                />
              </View>
            )}

            {/* Action buttons */}
            <View style={styles.actionsRow}>
              {!isRunning ? (
                <TouchableOpacity
                  style={[styles.startBtn, { backgroundColor: colors.textAccent }]}
                  onPress={handleStart}
                  activeOpacity={0.85}
                >
                  <Text style={styles.startBtnText}>Commencer</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.skipBtn, { borderColor: colors.border }]}
                  onPress={handleSkip}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.skipBtnText, { color: colors.textMuted }]}>Sauter →</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  sessionTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  sessionTheme: {
    fontSize: 11,
    fontFamily: 'Lato_400Regular',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  durationBadge: {
    width: 40,
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Lato_400Regular',
  },
  progressTrack: {
    height: 3,
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  stepTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepIcon: {
    fontSize: 22,
  },
  stepTypeLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    flex: 1,
  },
  stepNumBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stepNumText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
  },
  timerBox: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  timerText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 22,
    letterSpacing: 1,
  },
  stepText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
  },
  instructionBox: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  instructionText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  reflectionContainer: {
    marginBottom: 20,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  reflectionLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  reflectionInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    minHeight: 100,
    lineHeight: 22,
  },
  actionsRow: {
    gap: 12,
    marginTop: 8,
  },
  startBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  skipBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  skipBtnText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  completedEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  completedTitle: {
    fontSize: 26,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  savedReflectionBox: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    gap: 6,
  },
  savedReflectionLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  savedReflectionText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  finishBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  finishBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
