import { useState, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';
import { EducationProgress, GradeLevel, ModuleProgress, EducationModule } from '@/types';
import { EDUCATION_MODULES } from '@/data/educationalPath';

const STORAGE_KEY = 'education_progress';

const GRADE_THRESHOLDS: { grade: GradeLevel; minScore: number }[] = [
  { grade: 'Maître',     minScore: 900 },
  { grade: 'Savant',     minScore: 750 },
  { grade: 'Compagnon',  minScore: 600 },
  { grade: 'Gardien',    minScore: 470 },
  { grade: 'Aspirant',   minScore: 350 },
  { grade: 'Initié',     minScore: 240 },
  { grade: 'Disciple',   minScore: 140 },
  { grade: 'Apprenti',   minScore: 60  },
  { grade: 'Novice',     minScore: 10  },
  { grade: 'Postulant',  minScore: 0   },
];

function computeGrade(score: number): GradeLevel {
  for (const { grade, minScore } of GRADE_THRESHOLDS) {
    if (score >= minScore) return grade;
  }
  return 'Postulant';
}

function defaultProgress(): EducationProgress {
  const modules: Record<number, ModuleProgress> = {};
  EDUCATION_MODULES.forEach((m: EducationModule, i: number) => {
    modules[m.id] = {
      moduleId: m.id,
      lessonsCompleted: [],
      quizScores: [],
      bestScore: 0,
      unlocked: i === 0,
    };
  });
  return {
    modules,
    totalQuizAnswered: 0,
    totalCorrect: 0,
    grade: 'Postulant',
    gradeScore: 0,
    lastActivity: new Date().toISOString(),
  };
}

function loadProgress(): EducationProgress {
  const raw = AsyncStorage_like.get(STORAGE_KEY);
  if (!raw) return defaultProgress();
  try {
    const saved = JSON.parse(raw) as EducationProgress;
    EDUCATION_MODULES.forEach((m: EducationModule, i: number) => {
      if (!saved.modules[m.id]) {
        saved.modules[m.id] = {
          moduleId: m.id, lessonsCompleted: [],
          quizScores: [], bestScore: 0, unlocked: i === 0,
        };
      }
    });
    return saved;
  } catch {
    return defaultProgress();
  }
}

export function useEducation() {
  const [progress, setProgress] = useState<EducationProgress>(() => loadProgress());

  const save = useCallback((next: EducationProgress) => {
    setProgress(next);
    AsyncStorage_like.set(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const completeLesson = useCallback(
    (moduleId: number, lessonId: string) => {
      const next = { ...progress, lastActivity: new Date().toISOString() };
      const mod = { ...next.modules[moduleId] };
      if (!mod.lessonsCompleted.includes(lessonId)) {
        mod.lessonsCompleted = [...mod.lessonsCompleted, lessonId];
        next.gradeScore = next.gradeScore + 5;
        next.grade = computeGrade(next.gradeScore);
        const moduleData = EDUCATION_MODULES.find((m: EducationModule) => m.id === moduleId);
        if (moduleData && mod.lessonsCompleted.length >= moduleData.lessons.length) {
          const nextIdx = EDUCATION_MODULES.findIndex((m: EducationModule) => m.id === moduleId) + 1;
          if (nextIdx < EDUCATION_MODULES.length) {
            const nextMod = { ...next.modules[EDUCATION_MODULES[nextIdx].id] };
            nextMod.unlocked = true;
            next.modules = { ...next.modules, [EDUCATION_MODULES[nextIdx].id]: nextMod };
          }
        }
      }
      next.modules = { ...next.modules, [moduleId]: mod };
      save(next);
    },
    [progress, save]
  );

  const submitQuizResult = useCallback(
    (moduleId: number, correct: number, total: number) => {
      const next = { ...progress, lastActivity: new Date().toISOString() };
      const mod = { ...next.modules[moduleId] };
      const percentage = Math.round((correct / total) * 100);
      mod.quizScores = [...mod.quizScores, percentage];
      mod.bestScore = Math.max(mod.bestScore, percentage);
      next.modules = { ...next.modules, [moduleId]: mod };
      next.totalQuizAnswered += total;
      next.totalCorrect += correct;
      next.gradeScore = next.gradeScore + Math.round((correct / total) * 20);
      next.grade = computeGrade(next.gradeScore);
      save(next);
    },
    [progress, save]
  );

  const resetProgress = useCallback(() => {
    save(defaultProgress());
  }, [save]);

  const getModuleProgress = useCallback(
    (moduleId: number): ModuleProgress =>
      progress.modules[moduleId] ?? {
        moduleId, lessonsCompleted: [], quizScores: [], bestScore: 0, unlocked: false,
      },
    [progress]
  );

  const nextGrade = (): { grade: GradeLevel; pointsNeeded: number } | null => {
    const current = GRADE_THRESHOLDS.findIndex((g) => g.grade === progress.grade);
    if (current <= 0) return null;
    const next = GRADE_THRESHOLDS[current - 1];
    return { grade: next.grade, pointsNeeded: next.minScore - progress.gradeScore };
  };

  return { progress, completeLesson, submitQuizResult, resetProgress, getModuleProgress, nextGrade };
}
