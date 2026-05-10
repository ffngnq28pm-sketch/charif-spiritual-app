import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage_like } from './storage';

export type FocusTheme = 'Patience' | 'Gratitude' | 'Amour' | 'Foi' | 'Sagesse' | 'Paix';
export type NotifPreset = 'Fajr' | 'Matin' | 'Midi' | 'Soir' | 'Isha';
export type AppTheme = 'dark' | 'light' | 'sepia';

export interface UserProfile {
  firstName: string;
  focusTheme: FocusTheme;
  focusStartedAt: number; // timestamp ms
  notifEnabled: boolean;
  notifPreset: NotifPreset;
  notifTheme: string;
  appTheme: AppTheme;
  onboardingDone: boolean;
}

const DEFAULT: UserProfile = {
  firstName: '',
  focusTheme: 'Sagesse',
  focusStartedAt: Date.now(),
  notifEnabled: false,
  notifPreset: 'Matin',
  notifTheme: '',
  appTheme: 'dark',
  onboardingDone: false,
};

interface ProfileCtx {
  profile: UserProfile;
  update: (patch: Partial<UserProfile>) => void;
  focusDays: number;
}

const ProfileContext = createContext<ProfileCtx>({
  profile: DEFAULT,
  update: () => {},
  focusDays: 0,
});

const KEY = 'nour_user_profile';

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  console.log('🟦 [NOUR-DEBUG] UserProfileProvider mounting');
  const [profile, setProfile] = useState<UserProfile>(DEFAULT);

  useEffect(() => {
    const raw = AsyncStorage_like.get(KEY);
    if (raw) {
      try {
        setProfile({ ...DEFAULT, ...JSON.parse(raw) });
      } catch {}
    }
  }, []);

  function update(patch: Partial<UserProfile>) {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage_like.set(KEY, JSON.stringify(next));
      return next;
    });
  }

  const focusDays = Math.max(
    1,
    Math.floor((Date.now() - profile.focusStartedAt) / 86400000) + 1
  );

  return (
    <ProfileContext.Provider value={{ profile, update, focusDays }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(ProfileContext);
}

export const FOCUS_THEMES: FocusTheme[] = [
  'Patience',
  'Gratitude',
  'Amour',
  'Foi',
  'Sagesse',
  'Paix',
];

export const FOCUS_THEME_ICONS: Record<FocusTheme, string> = {
  Patience: '🌊',
  Gratitude: '🌸',
  Amour: '🤝',
  Foi: '🔥',
  Sagesse: '⚖️',
  Paix: '🕊️',
};

export const NOTIF_PRESETS: { key: NotifPreset; label: string; time: string; desc: string }[] = [
  { key: 'Fajr',  label: 'Après Fajr', time: '05:30', desc: 'Au lever du soleil' },
  { key: 'Matin', label: 'Matin',       time: '08:00', desc: 'Commencez la journée avec sagesse' },
  { key: 'Midi',  label: 'Midi',        time: '12:00', desc: 'Pause du milieu de journée' },
  { key: 'Soir',  label: 'Soir',        time: '18:00', desc: 'En fin de journée' },
  { key: 'Isha',  label: 'Après Isha',  time: '21:30', desc: 'Avant le coucher' },
];
