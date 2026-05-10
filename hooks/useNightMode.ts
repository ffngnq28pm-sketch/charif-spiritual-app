import { useState, useEffect, useRef, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const KEY = 'nour_night_mode_v1';

interface NightPrefs {
  manualOn: boolean;
  autoEnabled: boolean;
}

const DEFAULTS: NightPrefs = { manualOn: false, autoEnabled: true };

export interface NightModeState {
  isNightMode: boolean;
  isAutoEnabled: boolean;
  timerMinutes: number | null;
  toggleManual: () => void;
  setAutoEnabled: (v: boolean) => void;
  setTimer: (minutes: number | null) => void;
}

function isNightHour(): boolean {
  const h = new Date().getHours();
  return h >= 19 || h < 6;
}

export function useNightMode(): NightModeState {
  const [prefs, setPrefs] = useState<NightPrefs>(DEFAULTS);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const raw = AsyncStorage_like.get(KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Partial<NightPrefs>;
        setPrefs({ ...DEFAULTS, ...saved });
      } catch {}
    }
  }, []);

  const save = useCallback((p: NightPrefs) => {
    setPrefs(p);
    AsyncStorage_like.set(KEY, JSON.stringify(p));
  }, []);

  const isNightMode = prefs.manualOn || (prefs.autoEnabled && isNightHour());

  const toggleManual = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setTimerMinutes(null);
    save({ ...prefs, manualOn: !prefs.manualOn });
  }, [prefs, save]);

  const setAutoEnabled = useCallback((v: boolean) => {
    save({ ...prefs, autoEnabled: v });
  }, [prefs, save]);

  const setTimer = useCallback((minutes: number | null) => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    setTimerMinutes(minutes);
    if (minutes !== null) {
      save({ ...prefs, manualOn: true });
      timerRef.current = setTimeout(() => {
        save({ ...prefs, manualOn: false });
        setTimerMinutes(null);
      }, minutes * 60 * 1000);
    }
  }, [prefs, save]);

  return { isNightMode, isAutoEnabled: prefs.autoEnabled, timerMinutes, toggleManual, setAutoEnabled, setTimer };
}
