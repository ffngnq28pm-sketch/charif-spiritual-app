import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage_like } from './storage';

export type AppTheme = 'dark' | 'light' | 'sepia';

export interface ThemeColors {
  // Backgrounds
  bg: string;
  bgCard: string;
  bgSection: string;
  bgInput: string;
  bgTabBar: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;
  // Borders
  border: string;
  borderAccent: string;
  // Card overlay gradient
  cardGradient: [string, string, string];
  // Status bar style
  statusBar: 'light' | 'dark';
}

const THEMES: Record<AppTheme, ThemeColors> = {
  dark: {
    bg: '#050A1E',
    bgCard: '#070E22',
    bgSection: 'rgba(255,255,255,0.04)',
    bgInput: 'rgba(255,255,255,0.06)',
    bgTabBar: '#070E22',
    textPrimary: '#F5EDD6',
    textSecondary: '#C8D0E0',
    textMuted: '#4A5068',
    textAccent: '#C9A84C',
    border: 'rgba(255,255,255,0.07)',
    borderAccent: 'rgba(201,168,76,0.35)',
    cardGradient: ['rgba(5,10,30,0.45)', 'rgba(5,10,30,0.72)', 'rgba(5,10,30,0.92)'],
    statusBar: 'light',
  },
  light: {
    bg: '#FAF7F0',
    bgCard: '#FFFFFF',
    bgSection: 'rgba(0,0,0,0.03)',
    bgInput: 'rgba(0,0,0,0.05)',
    bgTabBar: '#FFFFFF',
    textPrimary: '#1A1208',
    textSecondary: '#3A3020',
    textMuted: '#8A7E68',
    textAccent: '#B8943C',
    border: 'rgba(0,0,0,0.08)',
    borderAccent: 'rgba(184,148,60,0.4)',
    cardGradient: ['rgba(10,8,0,0.15)', 'rgba(10,8,0,0.50)', 'rgba(10,8,0,0.85)'],
    statusBar: 'dark',
  },
  sepia: {
    bg: '#1C140A',
    bgCard: '#231A0E',
    bgSection: 'rgba(210,175,110,0.06)',
    bgInput: 'rgba(210,175,110,0.08)',
    bgTabBar: '#180F06',
    textPrimary: '#E8D8B0',
    textSecondary: '#C8B888',
    textMuted: '#7A6A48',
    textAccent: '#D4A84C',
    border: 'rgba(210,175,110,0.12)',
    borderAccent: 'rgba(212,168,76,0.4)',
    cardGradient: ['rgba(28,20,10,0.35)', 'rgba(28,20,10,0.65)', 'rgba(28,20,10,0.93)'],
    statusBar: 'light',
  },
};

interface ThemeCtx {
  theme: AppTheme;
  colors: ThemeColors;
  setTheme: (t: AppTheme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  colors: THEMES.dark,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  console.log('🟦 [NOUR-DEBUG] ThemeProvider mounting');
  const [theme, setThemeState] = useState<AppTheme>('dark');

  useEffect(() => {
    const saved = AsyncStorage_like.get('app_theme') as AppTheme | null;
    if (saved && THEMES[saved]) setThemeState(saved);
  }, []);

  function setTheme(t: AppTheme) {
    setThemeState(t);
    AsyncStorage_like.set('app_theme', t);
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { THEMES };
