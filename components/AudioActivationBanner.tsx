import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, LayoutAnimation } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { AudioService, AMBIENT_TRACKS, AmbientId, unlockWebAudioSync, isWebAudioUnlocked } from '@/services/AudioService';
import { AsyncStorage_like } from '@/context/storage';

const PREFS_KEY = 'nour_ambient_prefs_v1';
const SILENCE_B64 = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
const silenceAsset: unknown = require('../assets/audio/silence.wav');
function getSilenceUrl(): string {
  return typeof silenceAsset === 'string' ? silenceAsset : SILENCE_B64;
}

export function AudioActivationBanner() {
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<AmbientId | null>(() => {
    try { const r = AsyncStorage_like.get(PREFS_KEY); return r ? JSON.parse(r).activeId : null; }
    catch { return null; }
  });
  const [loading, setLoading] = useState<AmbientId | null>(null);
  const [audioError, setAudioError] = useState(false);

  const handleActivate = useCallback(() => {
    if (!isWebAudioUnlocked()) unlockWebAudioSync(getSilenceUrl());
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(true);
    setAudioError(false);
  }, []);

  const handleSelect = useCallback(async (id: AmbientId) => {
    if (!isWebAudioUnlocked()) unlockWebAudioSync(getSilenceUrl());
    setAudioError(false);
    if (activeId === id) {
      await AudioService.stopAmbient();
      setActiveId(null);
      AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: null, volume: 0.7 }));
      return;
    }
    setLoading(id);
    try {
      await AudioService.playAmbient(id, 0.7);
      setActiveId(id);
      AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: id, volume: 0.7 }));
    } catch {
      if (Platform.OS === 'web') setAudioError(true);
    } finally {
      setLoading(null);
    }
  }, [activeId]);

  const handleDismiss = useCallback(async () => {
    await AudioService.stopAmbient();
    setActiveId(null);
    setExpanded(false);
    setAudioError(false);
    AsyncStorage_like.set(PREFS_KEY, JSON.stringify({ activeId: null, volume: 0.7 }));
  }, []);

  const accent = colors.textAccent;

  if (!expanded) {
    return (
      <TouchableOpacity
        style={[styles.pill, { borderColor: accent + '40', backgroundColor: accent + '10' }]}
        onPress={handleActivate}
        activeOpacity={0.75}
      >
        <Text style={styles.pillEmoji}>🎵</Text>
        <Text style={[styles.pillText, { color: accent }]}>Activer l'ambiance sonore</Text>
        <Text style={[styles.pillArrow, { color: accent }]}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.panel, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>🎵 Ambiances sonores</Text>
        <TouchableOpacity onPress={handleDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.close, { color: colors.textMuted }]}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {AMBIENT_TRACKS.map((t) => {
          const isActive = activeId === t.id;
          const locked = t.premium && !isPremium;
          return (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.btn,
                { borderColor: colors.border, backgroundColor: colors.bgInput },
                isActive && { borderColor: accent, backgroundColor: accent + '18' },
                locked && { opacity: 0.5 },
              ]}
              onPress={() => !locked && handleSelect(t.id)}
              activeOpacity={locked ? 1 : 0.75}
            >
              <Text style={styles.emoji}>{loading === t.id ? '⏳' : isActive ? '🔊' : t.emoji}</Text>
              <Text style={[styles.label, { color: isActive ? accent : colors.textMuted }]} numberOfLines={2}>
                {t.label}
              </Text>
              {locked && <Text style={[styles.lock, { color: accent }]}>★</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
      {audioError ? (
        <Text style={[styles.errorHint, { color: '#E07070' }]}>
          🔇 Audio bloqué — cliquez n'importe où sur la page puis réessayez
        </Text>
      ) : (
        <Text style={[styles.hint, { color: colors.textMuted }]}>
          Récitations coraniques : bouton ▶ sur chaque carte
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, gap: 8 },
  pillEmoji: { fontSize: 15 },
  pillText: { flex: 1, fontFamily: 'Lato_700Bold', fontSize: 13, letterSpacing: 0.3 },
  pillArrow: { fontSize: 18, fontWeight: '300' },
  panel: { marginHorizontal: 20, marginBottom: 8, borderRadius: 16, borderWidth: 1, padding: 14, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: 'Lato_700Bold', fontSize: 13, letterSpacing: 0.3 },
  close: { fontFamily: 'Lato_400Regular', fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  btn: { width: '30%', borderRadius: 12, borderWidth: 1, padding: 10, gap: 4, alignItems: 'center', minWidth: 80 },
  emoji: { fontSize: 20 },
  label: { fontFamily: 'Lato_400Regular', fontSize: 10, textAlign: 'center', lineHeight: 14 },
  lock: { fontSize: 9, fontFamily: 'Lato_700Bold' },
  hint: { fontFamily: 'Lato_400Regular', fontSize: 10, textAlign: 'center', opacity: 0.7 },
  errorHint: { fontFamily: 'Lato_400Regular', fontSize: 10, textAlign: 'center' },
});
