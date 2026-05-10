import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';

const STORAGE_KEY = 'nour_tasbih_v1';
const MILESTONES = [33, 99, 100];

interface TasbihStorage {
  count: number;
  date: string;
}

function getTodayKey(): string {
  const now = new Date();
  // Reset at 5am (approximate Fajr)
  if (now.getHours() < 5) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  }
  return now.toISOString().slice(0, 10);
}

export interface TasbihState {
  count: number;
  milestone: number;
  progress: number; // 0..1 toward next milestone
  floatAnim: Animated.Value;
  increment: () => void;
  reset: () => void;
}

export function useTasbih(): TasbihState {
  const [count, setCount] = useState(0);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const lastMilestone = useRef(0);

  useEffect(() => {
    const raw = AsyncStorage_like.get(STORAGE_KEY);
    if (!raw) return;
    try {
      const stored: TasbihStorage = JSON.parse(raw);
      if (stored.date === getTodayKey()) {
        setCount(stored.count);
        lastMilestone.current = Math.max(...MILESTONES.filter((m) => m <= stored.count), 0);
      }
    } catch {}
  }, []);

  const persist = useCallback((n: number) => {
    const data: TasbihStorage = { count: n, date: getTodayKey() };
    AsyncStorage_like.set(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const triggerFloat = useCallback(() => {
    floatAnim.setValue(0);
    Animated.sequence([
      Animated.timing(floatAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [floatAnim]);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      persist(next);
      triggerFloat();
      if (MILESTONES.includes(next) && next > lastMilestone.current) {
        lastMilestone.current = next;
      }
      return next;
    });
  }, [persist, triggerFloat]);

  const reset = useCallback(() => {
    setCount(0);
    lastMilestone.current = 0;
    persist(0);
  }, [persist]);

  const nextMilestone = MILESTONES.find((m) => m > count) ?? MILESTONES[MILESTONES.length - 1];
  const prevMilestone = Math.max(...MILESTONES.filter((m) => m <= count), 0);
  const progress = nextMilestone > prevMilestone
    ? (count - prevMilestone) / (nextMilestone - prevMilestone)
    : 1;

  return { count, milestone: nextMilestone, progress, floatAnim, increment, reset };
}
