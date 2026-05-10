import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { X, RotateCcw, Lock } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useEducation } from '@/hooks/useEducation';
import { usePremium } from '@/hooks/usePremium';
import { PremiumPaywall } from '@/components/PremiumPaywall';
import GradeDisplay from '@/components/GradeDisplay';
import EducationModuleCard from '@/components/EducationModule';
import QuizComponent from '@/components/QuizComponent';
import { EDUCATION_MODULES } from '@/data/educationalPath';
import { quizQuestions } from '@/data/quizQuestions';
import { Lesson, EducationModule } from '@/types';

export const FREE_QUIZ_LIMIT = 70;

type Screen = 'home' | 'lesson' | 'quiz';

export default function EducationScreen() {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const { progress, completeLesson, submitQuizResult, resetProgress, getModuleProgress, nextGrade } = useEducation();

  const [screen, setScreen] = useState<Screen>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const isQuizLocked = !isPremium && progress.totalQuizAnswered >= FREE_QUIZ_LIMIT;

  const quizForModule = useMemo(
    () => activeModuleId !== null
      ? quizQuestions.filter((q) => q.moduleId === activeModuleId).slice(0, 10)
      : [],
    [activeModuleId]
  );

  const handleLessonPress = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setScreen('lesson');
  };

  const handleQuizPress = (moduleId: number) => {
    if (isQuizLocked) {
      setShowPaywall(true);
      return;
    }
    setActiveModuleId(moduleId);
    setScreen('quiz');
  };

  const handleLessonDone = () => {
    if (activeLesson) completeLesson(activeLesson.moduleId, activeLesson.id);
    setScreen('home');
    setActiveLesson(null);
  };

  const handleQuizComplete = (correct: number, total: number) => {
    if (activeModuleId !== null) submitQuizResult(activeModuleId, correct, total);
    setTimeout(() => {
      setScreen('home');
      setActiveModuleId(null);
    }, 2000);
  };

  const next = nextGrade();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />

      {/* ── PAYWALL ── */}
      <PremiumPaywall visible={showPaywall} onClose={() => setShowPaywall(false)} />

      {/* ── LESSON MODAL ── */}
      <Modal visible={screen === 'lesson'} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modal, { backgroundColor: colors.bg }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              {activeLesson?.title}
            </Text>
            <TouchableOpacity onPress={() => setScreen('home')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <X size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.lessonContent} showsVerticalScrollIndicator={false}>
            {activeLesson?.arabicQuote && (
              <View style={[styles.quoteBox, { backgroundColor: colors.bgSection }]}>
                <Text style={[styles.quote, { color: colors.textAccent }]}>{activeLesson.arabicQuote}</Text>
                {activeLesson.arabicSource && (
                  <Text style={[styles.quoteSource, { color: colors.textMuted }]}>{activeLesson.arabicSource}</Text>
                )}
              </View>
            )}
            <Text style={[styles.lessonSubtitle, { color: colors.textAccent }]}>{activeLesson?.subtitle}</Text>
            <Text style={[styles.lessonBody, { color: colors.textSecondary }]}>{activeLesson?.content}</Text>
            <Text style={[styles.keyPointsTitle, { color: colors.textPrimary }]}>Points clés</Text>
            {activeLesson?.keyPoints.map((pt, i) => (
              <View key={i} style={styles.keyPoint}>
                <Text style={[styles.keyDot, { color: colors.textAccent }]}>◆</Text>
                <Text style={[styles.keyText, { color: colors.textSecondary }]}>{pt}</Text>
              </View>
            ))}
            <TouchableOpacity style={[styles.doneBtn, { backgroundColor: colors.textAccent }]} onPress={handleLessonDone} activeOpacity={0.8}>
              <Text style={styles.doneBtnText}>Marquer comme terminé</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ── QUIZ MODAL ── */}
      <Modal visible={screen === 'quiz'} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modal, { backgroundColor: colors.bg }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Quiz</Text>
            <TouchableOpacity onPress={() => setScreen('home')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <X size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          {quizForModule.length > 0 && (
            <QuizComponent questions={quizForModule} onComplete={handleQuizComplete} />
          )}
        </SafeAreaView>
      </Modal>

      {/* ── MAIN SCREEN ── */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Parcours éducatif</Text>
            <Text style={[styles.pageSubtitle, { color: colors.textMuted }]}>Islam · Savoirs & Vertus</Text>
          </View>
          <TouchableOpacity onPress={resetProgress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <RotateCcw size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Premium lock banner */}
        {isQuizLocked && (
          <TouchableOpacity
            style={[styles.lockBanner, { backgroundColor: colors.bgCard, borderColor: colors.borderAccent }]}
            onPress={() => setShowPaywall(true)}
            activeOpacity={0.8}
          >
            <Lock size={16} color={colors.textAccent} />
            <Text style={[styles.lockText, { color: colors.textPrimary }]}>
              70 questions gratuites atteintes · <Text style={{ color: colors.textAccent }}>Passer Premium</Text> pour continuer
            </Text>
          </TouchableOpacity>
        )}

        {/* Grade card */}
        <View style={[styles.gradeCard, { backgroundColor: colors.bgCard }]}>
          <GradeDisplay grade={progress.grade} gradeScore={progress.gradeScore} />
          {next && (
            <Text style={[styles.nextGrade, { color: colors.textMuted }]}>
              {next.pointsNeeded} pts pour atteindre {next.grade}
            </Text>
          )}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.textAccent }]}>{progress.totalQuizAnswered}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>questions</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.textAccent }]}>
                {progress.totalQuizAnswered > 0
                  ? Math.round((progress.totalCorrect / progress.totalQuizAnswered) * 100)
                  : 0}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>précision</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.textAccent }]}>
                {Object.values(progress.modules).reduce((acc, m) => acc + m.lessonsCompleted.length, 0)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>leçons</Text>
            </View>
          </View>
        </View>

        {/* Modules */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Modules d'apprentissage</Text>
        {EDUCATION_MODULES.map((module: any) => (
          <EducationModuleCard
            key={module.id}
            module={module}
            moduleProgress={getModuleProgress(module.id)}
            onLessonPress={handleLessonPress}
            onQuizPress={() => handleQuizPress(module.id)}
            quizLocked={isQuizLocked}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 100 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  pageTitle: { fontSize: 26, fontWeight: '800' },
  pageSubtitle: { fontSize: 13, marginTop: 2 },
  lockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  lockText: { fontSize: 13, flex: 1, lineHeight: 18 },
  gradeCard: { borderRadius: 20, padding: 20, marginBottom: 24, gap: 12 },
  nextGrade: { fontSize: 13, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4 },
  stat: { alignItems: 'center', gap: 2 },
  statNum: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11 },
  statDivider: { width: 1, height: 32 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  modal: { flex: 1 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: { fontSize: 17, fontWeight: '700', flex: 1, marginRight: 12 },
  lessonContent: { padding: 20, gap: 16, paddingBottom: 60 },
  quoteBox: { padding: 20, borderRadius: 14, alignItems: 'center', gap: 8 },
  quote: { fontSize: 24, fontFamily: 'serif', textAlign: 'center', lineHeight: 40 },
  quoteSource: { fontSize: 12, fontStyle: 'italic' },
  lessonSubtitle: { fontSize: 15, fontWeight: '600' },
  lessonBody: { fontSize: 15, lineHeight: 26 },
  keyPointsTitle: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  keyPoint: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  keyDot: { fontSize: 10, marginTop: 7 },
  keyText: { fontSize: 14, lineHeight: 22, flex: 1 },
  doneBtn: { marginTop: 16, padding: 16, borderRadius: 14, alignItems: 'center' },
  doneBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
