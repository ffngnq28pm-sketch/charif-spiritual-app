export interface WisdomCard {
  id: string;
  arabic: string;
  source: string;
  french: string;
  philosophy: string;
  philosophyAuthor: string;
  theme: Theme;
  sourceType: SourceType;
  backgroundImage: string;
  premium: boolean;
}

export type Theme =
  | 'Patience'
  | 'Amour'
  | 'Sagesse'
  | 'Gratitude'
  | 'Dieu'
  | 'Espoir'
  | 'Force'
  | 'Foi'
  | 'Paix'
  | 'Beauté'
  | 'Générosité'
  | 'Humilité'
  | 'Justice'
  | 'Pardon'
  | 'Acceptation'
  | 'Dhikr'
  | 'Tawakkul'
  | 'Guidance'
  | 'Purification'
  | 'Repentance'
  | 'Lumière'
  | 'Confiance'
  | 'Modération'
  | 'Tempérance';

export type SourceType =
  | 'Coran'
  | 'Hadith'
  | 'Rumi'
  | 'Ibn Arabi'
  | 'Avicenne'
  | 'Al-Ghazali'
  | 'Imam Al-Ghazali'
  | 'Ibn Taymiyya'
  | 'Al-Nawawi'
  | 'Ibn Al-Qayyim'
  | 'Cheikh Ahmad Zarrouq'
  | 'Hafez'
  | 'Omar Khayyam';

// ── Education system ─────────────────────────────────────────

export type GradeLevel =
  | 'Postulant'
  | 'Novice'
  | 'Apprenti'
  | 'Disciple'
  | 'Initié'
  | 'Aspirant'
  | 'Gardien'
  | 'Compagnon'
  | 'Savant'
  | 'Maître';

export interface Lesson {
  id: string;
  moduleId: number;
  order: number;
  title: string;
  subtitle: string;
  content: string;
  keyPoints: string[];
  arabicQuote?: string;
  arabicSource?: string;
  duration: number; // minutes
}

export interface EducationModule {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export type QuizDifficulty = 'facile' | 'moyen' | 'difficile';

export interface QuizQuestion {
  id: string;
  moduleId: number;
  difficulty: QuizDifficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source?: string;
}

export interface ModuleProgress {
  moduleId: number;
  lessonsCompleted: string[];
  quizScores: number[];
  bestScore: number;
  unlocked: boolean;
}

export interface EducationProgress {
  modules: Record<number, ModuleProgress>;
  totalQuizAnswered: number;
  totalCorrect: number;
  grade: GradeLevel;
  gradeScore: number;
  lastActivity: string;
}
