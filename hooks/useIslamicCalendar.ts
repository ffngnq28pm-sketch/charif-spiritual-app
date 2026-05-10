import { useMemo } from 'react';
import { Theme } from '@/types';

// Verified Muharram 1 dates (from IslamicFinder)
const HIJRI_YEARS: { year: number; greg: [number, number, number] }[] = [
  { year: 1446, greg: [2024, 7, 7] },
  { year: 1447, greg: [2025, 6, 27] },
  { year: 1448, greg: [2026, 6, 16] },
  { year: 1449, greg: [2027, 6, 5] },
];

// Month lengths per year (1=Muharram ... 12=Dhu al-Hijjah)
// Totals derived from verified IslamicFinder Muharram-1 dates:
//   1446=355d  1447=354d  1448=354d  1449=354d
const MONTH_LENGTHS: Record<number, number[]> = {
  1446: [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30], // 355 days
  1447: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // 354 days
  1448: [30, 29, 30, 29, 30, 29, 30, 29, 30, 30, 29, 29], // 354 days
  1449: [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // 354 days
};

const HIJRI_MONTHS_FR = [
  'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
  'Jumada al-Ula', 'Jumada al-Thania', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah',
];

function toJulianDay(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yr = y + 4800 - a;
  const mo = m + 12 * a - 3;
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr +
    Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045;
}

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

function gregorianToHijri(date: Date): HijriDate {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const jd = toJulianDay(y, m, d);

  let baseEntry = HIJRI_YEARS[0];
  for (const entry of HIJRI_YEARS) {
    const entryJd = toJulianDay(...entry.greg);
    if (jd >= entryJd) baseEntry = entry;
    else break;
  }

  let dayOffset = jd - toJulianDay(...baseEntry.greg);
  let hYear = baseEntry.year;
  let hMonth = 1;

  const lengths = MONTH_LENGTHS[hYear] ?? MONTH_LENGTHS[1447];

  while (dayOffset >= 0) {
    let yearLen = lengths.reduce((a, b) => a + b, 0);
    if (dayOffset >= yearLen) {
      dayOffset -= yearLen;
      hYear++;
      continue;
    }
    let idx = 0;
    while (idx < 12 && dayOffset >= lengths[idx]) {
      dayOffset -= lengths[idx];
      idx++;
    }
    hMonth = idx + 1;
    break;
  }

  return {
    year: hYear,
    month: hMonth,
    day: dayOffset + 1,
    monthName: HIJRI_MONTHS_FR[hMonth - 1],
  };
}

// Lunar phase (new moon reference: Jan 6 2000 18:14 UTC)
const NEW_MOON_REF = new Date('2000-01-06T18:14:00Z').getTime();
const LUNAR_CYCLE_MS = 29.53059 * 24 * 3600 * 1000;
const PHASE_EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

function getLunarPhase(date: Date): { emoji: string; label: string; fraction: number } {
  const elapsed = date.getTime() - NEW_MOON_REF;
  const fraction = ((elapsed % LUNAR_CYCLE_MS) + LUNAR_CYCLE_MS) % LUNAR_CYCLE_MS / LUNAR_CYCLE_MS;
  const idx = Math.floor(fraction * 8) % 8;
  const labels = ['Nouvelle lune', 'Croissant', 'Premier quartier', 'Gibbeuse croissante',
    'Pleine lune', 'Gibbeuse décroissante', 'Dernier quartier', 'Croissant décroissant'];
  return { emoji: PHASE_EMOJIS[idx], label: labels[idx], fraction };
}

export type IslamicPeriod =
  | 'muharram'
  | 'rajab'
  | 'pre-ramadan'
  | 'ramadan'
  | 'eid-fitr'
  | 'dhu-hijjah'
  | 'eid-adha'
  | 'normal';

function getIslamicPeriod(hijri: HijriDate): IslamicPeriod {
  const { month, day } = hijri;
  if (month === 1) return 'muharram';
  if (month === 7) return 'rajab';
  if (month === 8 || (month === 9 && day === 1)) return 'pre-ramadan';
  if (month === 9) return 'ramadan';
  if (month === 10 && day <= 3) return 'eid-fitr';
  if (month === 12 && day >= 1 && day <= 9) return 'dhu-hijjah';
  if (month === 12 && day >= 10 && day <= 13) return 'eid-adha';
  return 'normal';
}

export const PERIOD_THEMES: Record<IslamicPeriod, Theme[]> = {
  muharram:    ['Patience', 'Foi', 'Sagesse'],
  rajab:       ['Amour', 'Paix', 'Humilité'],
  'pre-ramadan': ['Patience', 'Foi', 'Sagesse'],
  ramadan:     ['Patience', 'Gratitude', 'Dieu'],
  'eid-fitr':  ['Amour', 'Gratitude', 'Paix'],
  'dhu-hijjah': ['Humilité', 'Sagesse', 'Foi'],
  'eid-adha':  ['Générosité', 'Pardon', 'Gratitude'],
  normal:      [],
};

interface IslamicEvent {
  name: string;
  hijriMonth: number;
  hijriDay: number;
}

const ISLAMIC_EVENTS: IslamicEvent[] = [
  { name: 'Achoura', hijriMonth: 1, hijriDay: 10 },
  { name: 'Isra Mi\'raj', hijriMonth: 7, hijriDay: 27 },
  { name: 'Début Ramadan', hijriMonth: 9, hijriDay: 1 },
  { name: 'Laylat al-Qadr', hijriMonth: 9, hijriDay: 27 },
  { name: 'Aïd al-Fitr', hijriMonth: 10, hijriDay: 1 },
  { name: 'Aïd al-Adha', hijriMonth: 12, hijriDay: 10 },
];

function daysUntilNextEvent(hijri: HijriDate): { name: string; daysLeft: number } | null {
  const lengths = MONTH_LENGTHS[hijri.year] ?? MONTH_LENGTHS[1447];
  const curDayOfYear = lengths.slice(0, hijri.month - 1).reduce((a, b) => a + b, 0) + hijri.day;

  let best: { name: string; daysLeft: number } | null = null;

  for (const ev of ISLAMIC_EVENTS) {
    const evDay = lengths.slice(0, ev.hijriMonth - 1).reduce((a, b) => a + b, 0) + ev.hijriDay;
    let diff = evDay - curDayOfYear;
    if (diff < 0) diff += lengths.reduce((a, b) => a + b, 0);
    if (diff === 0) continue;
    if (!best || diff < best.daysLeft) best = { name: ev.name, daysLeft: diff };
  }

  return best;
}

export interface IslamicCalendarState {
  hijri: HijriDate;
  lunarPhase: { emoji: string; label: string; fraction: number };
  period: IslamicPeriod;
  nextEvent: { name: string; daysLeft: number } | null;
}

export function useIslamicCalendar(): IslamicCalendarState {
  return useMemo(() => {
    const now = new Date();
    const hijri = gregorianToHijri(now);
    const lunarPhase = getLunarPhase(now);
    const period = getIslamicPeriod(hijri);
    const nextEvent = daysUntilNextEvent(hijri);
    return { hijri, lunarPhase, period, nextEvent };
  }, [new Date().toDateString()]);
}
