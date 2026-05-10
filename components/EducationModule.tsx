import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronDown, ChevronUp, CheckCircle, Lock, BookOpen, Clock } from 'lucide-react-native';
import { EducationModule as IModule, Lesson, ModuleProgress } from '@/types';
import { useTheme } from "@/context/ThemeContext";

interface Props {
  module: IModule;
  moduleProgress: ModuleProgress;
  onLessonPress: (lesson: Lesson) => void;
  onQuizPress: () => void;
  quizLocked?: boolean;
}

export default function EducationModuleCard({ module, moduleProgress, onLessonPress, onQuizPress, quizLocked = false }: Props) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const completed = moduleProgress.lessonsCompleted.length;
  const total = module.lessons.length;
  const allDone = completed >= total;
  const locked = !moduleProgress.unlocked;

  return (
    <View style={[styles.card, { backgroundColor: colors.bgCard }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => !locked && setExpanded((e) => !e)}
        activeOpacity={locked ? 1 : 0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: module.color + '22' }]}>
          <Text style={styles.icon}>{module.icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: locked ? colors.textMuted : colors.textPrimary }]}>
            {module.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {locked ? 'Complète le module précédent' : `${completed}/${total} leçons`}
          </Text>
        </View>
        {locked ? (
          <Lock size={18} color={colors.textMuted} />
        ) : expanded ? (
          <ChevronUp size={18} color={colors.textMuted} />
        ) : (
          <ChevronDown size={18} color={colors.textMuted} />
        )}
      </TouchableOpacity>

      {!locked && (
        <View style={[styles.progressBar, { backgroundColor: colors.border ?? '#222' }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: module.color, width: `${(completed / total) * 100}%` as any },
            ]}
          />
        </View>
      )}

      {expanded && !locked && (
        <View style={styles.lessons}>
          {module.lessons.map((lesson) => {
            const done = moduleProgress.lessonsCompleted.includes(lesson.id);
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonRow, { borderBottomColor: colors.border ?? '#222' }]}
                onPress={() => onLessonPress(lesson)}
                activeOpacity={0.7}
              >
                <View style={styles.lessonLeft}>
                  {done ? (
                    <CheckCircle size={18} color="#2D7A4F" />
                  ) : (
                    <BookOpen size={18} color={colors.textMuted} />
                  )}
                  <View style={styles.lessonText}>
                    <Text style={[styles.lessonTitle, { color: colors.textPrimary }]}>{lesson.title}</Text>
                    <Text style={[styles.lessonSub, { color: colors.textMuted }]}>{lesson.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.duration}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={[styles.durationText, { color: colors.textMuted }]}>{lesson.duration}m</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.quizBtn,
              { backgroundColor: allDone && !quizLocked ? module.color : module.color + '44' },
            ]}
            onPress={allDone ? onQuizPress : undefined}
            activeOpacity={allDone ? 0.8 : 1}
          >
            {quizLocked && allDone && <Lock size={14} color={colors.textMuted} />}
            <Text style={[styles.quizText, { color: allDone && !quizLocked ? '#FFF' : colors.textMuted }]}>
              {quizLocked && allDone
                ? 'Premium requis pour continuer'
                : moduleProgress.bestScore > 0
                ? `Quiz — Meilleur : ${moduleProgress.bestScore}%`
                : allDone
                ? 'Passer le quiz'
                : 'Terminer les leçons pour débloquer'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22 },
  headerText: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: 2 },
  progressBar: { height: 3, marginHorizontal: 16, marginBottom: 0, borderRadius: 2 },
  progressFill: { height: 3, borderRadius: 2 },
  lessons: { paddingHorizontal: 16, paddingBottom: 16, gap: 0 },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lessonLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  lessonText: { flex: 1 },
  lessonTitle: { fontSize: 14, fontWeight: '600' },
  lessonSub: { fontSize: 12, marginTop: 2 },
  duration: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  durationText: { fontSize: 11 },
  quizBtn: { marginTop: 12, padding: 12, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  quizText: { fontSize: 14, fontWeight: '600' },
});
