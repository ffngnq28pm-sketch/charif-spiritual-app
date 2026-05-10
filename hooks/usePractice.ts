import { useState, useEffect, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const JOURNAL_KEY = 'nour_journal_v1';
const SESSION_KEY = 'nour_session_done_v1';
const PATHS_KEY = 'nour_path_progress_v1';

export interface JournalEntry {
  id: string;
  date: string;       // YYYY-MM-DD
  sessionId?: string;
  question: string;
  answer: string;
}

export interface PracticeState {
  sessionCompletedToday: boolean;
  completeSession: () => void;
  entries: JournalEntry[];
  addEntry: (e: Omit<JournalEntry, 'id'>) => void;
  deleteEntry: (id: string) => void;
  pathProgress: Record<string, number>;
  advancePath: (pathId: string) => void;
  resetPath: (pathId: string) => void;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function usePractice(): PracticeState {
  const [sessionCompletedToday, setSessionCompletedToday] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [pathProgress, setPathProgress] = useState<Record<string, number>>({});

  // Load persisted state on mount
  useEffect(() => {
    // Session
    const savedDate = AsyncStorage_like.get(SESSION_KEY);
    if (savedDate === today()) {
      setSessionCompletedToday(true);
    }

    // Journal entries
    const rawEntries = AsyncStorage_like.get(JOURNAL_KEY);
    if (rawEntries) {
      try {
        const parsed: JournalEntry[] = JSON.parse(rawEntries);
        setEntries(Array.isArray(parsed) ? parsed : []);
      } catch {
        setEntries([]);
      }
    }

    // Path progress
    const rawPaths = AsyncStorage_like.get(PATHS_KEY);
    if (rawPaths) {
      try {
        const parsed: Record<string, number> = JSON.parse(rawPaths);
        setPathProgress(typeof parsed === 'object' && parsed !== null ? parsed : {});
      } catch {
        setPathProgress({});
      }
    }
  }, []);

  const completeSession = useCallback(() => {
    const t = today();
    AsyncStorage_like.set(SESSION_KEY, t);
    setSessionCompletedToday(true);
  }, []);

  const addEntry = useCallback((e: Omit<JournalEntry, 'id'>) => {
    setEntries((prev) => {
      const newEntry: JournalEntry = {
        ...e,
        id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      // Keep last 30 entries
      const updated = [newEntry, ...prev].slice(0, 30);
      AsyncStorage_like.set(JOURNAL_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      AsyncStorage_like.set(JOURNAL_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const advancePath = useCallback((pathId: string) => {
    setPathProgress((prev) => {
      const current = prev[pathId] ?? 0;
      const next = current + 1;
      const updated = { ...prev, [pathId]: next };
      AsyncStorage_like.set(PATHS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetPath = useCallback((pathId: string) => {
    setPathProgress((prev) => {
      const updated = { ...prev, [pathId]: 0 };
      AsyncStorage_like.set(PATHS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    sessionCompletedToday,
    completeSession,
    entries,
    addEntry,
    deleteEntry,
    pathProgress,
    advancePath,
    resetPath,
  };
}
