import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';
import {
  fetchPrayerTimes,
  fetchPrayerTimesByPostal,
  getNextPrayer,
  getCurrentPrayer,
  PrayerTimesResult,
} from '@/services/PrayerTimesService';

const CACHE_KEY    = 'nour_prayer_times_v1';
const METHOD_KEY   = 'nour_prayer_method_v1';
const MODE_KEY     = 'nour_prayer_mode_v1';
const POSTAL_KEY   = 'nour_prayer_postal_v1';
const DEFAULT_METHOD = 12;

export type LocationMode = 'gps' | 'postal';

interface CachedTimes {
  result: PrayerTimesResult;
  cachedAt: number;
  dateStr: string;
  mode: LocationMode;
  postal?: string;
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function usePrayerTimes() {
  console.log('⏰ usePrayerTimes hook initialized, platform:', Platform.OS);
  const [data, setData]       = useState<PrayerTimesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [method, setMethodState] = useState<number>(
    Number(AsyncStorage_like.get(METHOD_KEY) || DEFAULT_METHOD)
  );
  const [locationMode, setLocationModeState] = useState<LocationMode>(
    (AsyncStorage_like.get(MODE_KEY) as LocationMode) || 'gps'
  );
  const [postalCode, setPostalCodeState] = useState<string>(
    AsyncStorage_like.get(POSTAL_KEY) || ''
  );

  const load = useCallback(async (forceRefresh = false) => {
    console.log('⏰ [PrayerTimes] load called, forceRefresh:', forceRefresh, 'mode:', locationMode);
    setLoading(true);
    setError(null);
    try {
      // Try cache first
      if (!forceRefresh) {
        const cached = AsyncStorage_like.get(CACHE_KEY);
        if (cached) {
          const parsed: CachedTimes = JSON.parse(cached);
          const sameMode   = parsed.mode === locationMode;
          const samePostal = locationMode !== 'postal' || parsed.postal === postalCode;
          if (parsed.dateStr === todayStr() && sameMode && samePostal) {
            setData(parsed.result);
            setLoading(false);
            return;
          }
        }
      }

      let result: PrayerTimesResult;
      if (locationMode === 'postal') {
        if (!postalCode || postalCode.length < 5) throw new Error('Saisissez un code postal valide');
        result = await fetchPrayerTimesByPostal(postalCode, method);
      } else {
        result = await fetchPrayerTimes(method);
      }

      const toCache: CachedTimes = {
        result,
        cachedAt: Date.now(),
        dateStr: todayStr(),
        mode: locationMode,
        postal: postalCode,
      };
      AsyncStorage_like.set(CACHE_KEY, JSON.stringify(toCache));
      setData(result);
    } catch (e: any) {
      console.log('🔴 [PrayerTimes] load error:', e?.message);
      setError(e.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [method, locationMode, postalCode]);

  useEffect(() => { load(); }, []);

  const setMethod = useCallback((m: number) => {
    setMethodState(m);
    AsyncStorage_like.set(METHOD_KEY, String(m));
    load(true);
  }, [load]);

  const setLocationMode = useCallback((mode: LocationMode) => {
    setLocationModeState(mode);
    AsyncStorage_like.set(MODE_KEY, mode);
  }, []);

  const setPostalCode = useCallback((code: string) => {
    setPostalCodeState(code);
    AsyncStorage_like.set(POSTAL_KEY, code);
  }, []);

  const reload = useCallback(() => load(true), [load]);

  const nextPrayer    = data ? getNextPrayer(data.times) : null;
  const currentPrayer = data ? getCurrentPrayer(data.times) : null;

  return {
    data, loading, error, reload,
    method, setMethod,
    locationMode, setLocationMode,
    postalCode, setPostalCode,
    nextPrayer, currentPrayer,
  };
}
