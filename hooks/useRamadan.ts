import { useState, useEffect } from 'react';

// Ramadan 2025: March 1 – March 30
// Ramadan 2026: February 18 – March 19
// Ramadan 2027: February 8 – March 8
const RAMADAN_DATES: { start: [number, number, number]; end: [number, number, number] }[] = [
  { start: [2025, 2, 1],  end: [2025, 2, 30] },
  { start: [2026, 1, 18], end: [2026, 3, 19] },
  { start: [2027, 1, 8],  end: [2027, 3, 8] },
];

function getRamadanInfo(now: Date): { active: boolean; day: number; total: number; start: Date; end: Date } | null {
  for (const r of RAMADAN_DATES) {
    const start = new Date(r.start[0], r.start[1] - 1, r.start[2]);
    const end = new Date(r.end[0], r.end[1] - 1, r.end[2], 23, 59, 59);
    if (now >= start && now <= end) {
      const day = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
      const total = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
      return { active: true, day, total, start, end };
    }
  }
  // Check upcoming within 7 days for a preview banner
  for (const r of RAMADAN_DATES) {
    const start = new Date(r.start[0], r.start[1] - 1, r.start[2]);
    const end = new Date(r.end[0], r.end[1] - 1, r.end[2], 23, 59, 59);
    if (now < start && start.getTime() - now.getTime() < 7 * 86400000) {
      return { active: false, day: 0, total: 30, start, end };
    }
  }
  return null;
}

// Simple Iftar estimate: sunset approx 18:30 local (placeholder — real app uses prayer time API)
function getIftarTime(): Date {
  const now = new Date();
  const iftar = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30, 0);
  if (now > iftar) iftar.setDate(iftar.getDate() + 1);
  return iftar;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

function getDaysUntilNextRamadan(now: Date): number | null {
  const sorted = [...RAMADAN_DATES].sort(
    (a, b) => new Date(a.start[0], a.start[1] - 1, a.start[2]).getTime() - new Date(b.start[0], b.start[1] - 1, b.start[2]).getTime()
  );
  for (const r of sorted) {
    const start = new Date(r.start[0], r.start[1] - 1, r.start[2]);
    if (start > now) {
      const msUntil = start.getTime() - now.getTime();
      return Math.ceil(msUntil / 86400000);
    }
  }
  return null;
}

export interface RamadanState {
  isRamadan: boolean;
  day: number;
  total: number;
  iftarCountdown: string;
  iftarPassed: boolean;
  daysUntilNextRamadan: number | null;
}

export function useRamadan(): RamadanState {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const info = getRamadanInfo(now);
  const daysUntilNextRamadan = getDaysUntilNextRamadan(now);

  if (!info || !info.active) {
    return { isRamadan: false, day: 0, total: 30, iftarCountdown: '--:--:--', iftarPassed: false, daysUntilNextRamadan };
  }

  const iftar = getIftarTime();
  const msLeft = iftar.getTime() - now.getTime();
  const iftarPassed = msLeft <= 0;

  return {
    isRamadan: true,
    day: info.day,
    total: info.total,
    iftarCountdown: formatCountdown(msLeft),
    iftarPassed,
    daysUntilNextRamadan: null,
  };
}
