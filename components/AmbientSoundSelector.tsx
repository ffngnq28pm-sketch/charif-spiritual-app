import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { AudioService, AMBIENT_TRACKS, AmbientId } from '@/services/AudioService';
import { AsyncStorage_like } from '@/context/storage';

const PREFS_KEY = 'nour_ambient_prefs_v1';

interface AmbientPrefs {
  activeId: AmbientId | null;
  volume: number;
}

function loadPrefs(): AmbientPrefs {
  try {
    const raw = AsyncStorage_like.get(PREFS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { activeId: null, volume: 0.7 };
}

export function AmbientSoundSelector() {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const [prefs, setPrefs] = useState<AmbientPrefs>(loadPrefs);
  const [loading, setLoading] = useState<AmbientId | null>(null);

  const save = useCallback((p: AmbientPrefs) => {
    setPrefs(p);
    AsyncStorage_like.set(PREFS_KEY, JSON.stringify(p));
  }, []);

  const handleSelect = useCallback(async (id: AmbientId) => {
    if (prefs.activeId === id) {
      await AudioService.stopAmbient();
      save({ ...prefs, activeId: null });
      return;
    }
    setLoading(id);
    try {
      await AudioService.playAmbient(id, prefs.volume);
      save({ ...prefs, activeId: id });
    } catch {
      // audio error — silently fail
    } finally {
      setLoading(null);
    }
  }, [prefs, save]);

  const handleVolume = useCallback(async (v: number) => {
    save({ ...prefs, volume: v });
    await AudioService.setAmbientVolume(v);
  }, [prefs, save]);

  const accent = colors.textAccent;

  return (
    <View style={styles.wrapper}>
      <View style={styles.grid}>
        {AMBIENT_TRACKS.map((track) => {
          const isActive = prefs.activeId === track.id;
          const isLoading = loading === track.id;
          const locked = track.premium && !isPremium;

          return (
            <TouchableOpacity
              key={track.id}
              style={[
                styles.track,
                { borderColor: colors.border, backgroundColor: colors.bgInput },
                isActive && { borderColor: accent, backgroundColor: accent + '14' },
                locked && { opacity: 0.55 },
              ]}
              onPress={() => !locked && handleSelect(track.id)}
              activeOpacity={locked ? 1 : 0.8}
            >
              <Text style={styles.trackEmoji}>{isLoading ? '⏳' : track.emoji}</Text>
              <Text style={[styles.trackLabel, { color: isActive ? accent : colors.textMuted }]} numberOfLines={2}>
                {track.label}
              </Text>
              {locked && (
                <Text style={styles.lockBadge}>★</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {prefs.activeId && prefs.activeId !== 'silence' && (
        <View style={styles.volumeRow}>
          <Text style={[styles.volLabel, { color: colors.textMuted }]}>🔇</Text>
          <TouchableOpacity
            style={[styles.sliderTrack, { backgroundColor: colors.border }]}
            activeOpacity={1}
            onPress={(e) => {
              // Simple tap-to-set volume (works without native slider)
              const x = (e.nativeEvent as any).locationX;
              const width = 200; // approximate
              const v = Math.max(0, Math.min(1, x / width));
              handleVolume(v);
            }}
          >
            <View style={[styles.sliderFill, { width: `${prefs.volume * 100}%` as any, backgroundColor: accent }]} />
            <View style={[styles.sliderThumb, { backgroundColor: accent, left: `${prefs.volume * 100}%` as any }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleVolume(Math.min(1, prefs.volume + 0.1))} style={styles.volBtn}>
            <Text style={[styles.volLabel, { color: colors.textMuted }]}>🔊</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  track: {
    width: '47%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 6,
    alignItems: 'center',
  },
  trackEmoji: { fontSize: 24 },
  trackLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  lockBadge: {
    fontSize: 10,
    color: '#C9A84C',
    fontFamily: 'Lato_700Bold',
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 4,
  },
  volLabel: { fontSize: 14 },
  volBtn: { padding: 4 },
  sliderTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'visible',
    justifyContent: 'center',
  },
  sliderFill: { height: 4, borderRadius: 2, position: 'absolute', left: 0, top: 0 },
  sliderThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    top: -5,
    marginLeft: -7,
  },
});
