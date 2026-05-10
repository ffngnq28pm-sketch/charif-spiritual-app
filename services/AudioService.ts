import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';

// Lazy-loaded to avoid module-level crash if assets are missing in native bundle
function getAmbientSources(): Record<string, number | null> {
  try {
    return {
      rain:            require('../assets/audio/rain.wav'),
      wind:            require('../assets/audio/wind.wav'),
      mosque:          require('../assets/audio/mosque.wav'),
      fatiha_ambiance: require('../assets/audio/fatiha_ambiance.wav'),
      silence:         null,
    };
  } catch {
    return { rain: null, wind: null, mosque: null, fatiha_ambiance: null, silence: null };
  }
}

export const AMBIENT_TRACKS = [
  { id: 'silence',         label: 'Silence sacré',      emoji: '🤍', premium: false },
  { id: 'rain',            label: 'Pluie douce',         emoji: '🌧️', premium: true },
  { id: 'wind',            label: 'Vent contemplatif',   emoji: '🍃', premium: true },
  { id: 'mosque',          label: 'Mosquée lointaine',   emoji: '🕌', premium: true },
  { id: 'fatiha_ambiance', label: 'Ambiance coranique',  emoji: '🌙', premium: true },
] as const;

const WEB_UNLOCK_KEY = 'nour_web_audio_unlocked';
const SILENCE_B64 = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';

export function unlockWebAudioSync(silenceAssetUrl: string) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  try {
    const a = document.createElement('audio');
    a.src = silenceAssetUrl || SILENCE_B64;
    a.volume = 0.001;
    a.play().catch(() => {});
    AsyncStorage_like.set(WEB_UNLOCK_KEY, '1');
  } catch {}
}

export function isWebAudioUnlocked(): boolean {
  if (Platform.OS !== 'web') return true;
  return AsyncStorage_like.get(WEB_UNLOCK_KEY) === '1';
}

export type AmbientId = (typeof AMBIENT_TRACKS)[number]['id'];

let _ambientSound: Audio.Sound | null = null;
let _webAmbientAudio: HTMLAudioElement | null = null;
let _quranSound: Audio.Sound | null = null;
let _audioConfigured = false;

async function ensureAudioConfigured() {
  if (_audioConfigured || Platform.OS === 'web') return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    _audioConfigured = true;
    console.log('🎵 [Audio] mode configured');
  } catch (e: any) {
    console.log('🎵 [Audio] setAudioModeAsync failed:', e?.message);
    _audioConfigured = true; // don't retry
  }
}

// ── Quran audio URL (everyayah.com — Al-Husary, official free CDN) ──────────
// Format: /data/Husary_64kbps/{surah:003d}_{ayah:003d}.mp3
export function getQuranAudioUrl(surah: number, ayah: number): string {
  const s = String(surah).padStart(3, '0');
  const a = String(ayah).padStart(3, '0');
  return `https://everyayah.com/data/Husary_64kbps/${s}_${a}.mp3`;
}

// Parse "(2:286)" or "2:286" patterns from card source field
export function parseQuranReference(source: string): { surah: number; ayah: number } | null {
  const m = source.match(/\(?(\d+):(\d+)\)?/);
  if (!m) return null;
  const surah = parseInt(m[1], 10);
  const ayah = parseInt(m[2], 10);
  if (surah < 1 || surah > 114 || ayah < 1 || ayah > 286) return null;
  return { surah, ayah };
}

export const AudioService = {
  // ── Quran playback ────────────────────────────────────────────────────────
  async playQuran(url: string, onStatusUpdate: (playing: boolean) => void): Promise<() => void> {
    await ensureAudioConfigured();
    if (_quranSound) {
      await _quranSound.stopAsync().catch(() => {});
      await _quranSound.unloadAsync().catch(() => {});
      _quranSound = null;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          onStatusUpdate(status.isPlaying);
          if (status.didJustFinish) onStatusUpdate(false);
        }
      }
    );
    _quranSound = sound;

    return async () => {
      if (_quranSound) {
        await _quranSound.stopAsync().catch(() => {});
        await _quranSound.unloadAsync().catch(() => {});
        _quranSound = null;
      }
    };
  },

  async pauseQuran() {
    if (_quranSound) await _quranSound.pauseAsync().catch(() => {});
  },

  async resumeQuran(onStatusUpdate: (playing: boolean) => void) {
    if (_quranSound) {
      await _quranSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) onStatusUpdate(status.isPlaying);
      });
      await _quranSound.playAsync().catch(() => {});
    }
  },

  async stopQuran() {
    if (_quranSound) {
      await _quranSound.stopAsync().catch(() => {});
      await _quranSound.unloadAsync().catch(() => {});
      _quranSound = null;
    }
  },

  // ── Ambient playback (local bundled files) ─────────────────────────────────
  async playAmbient(id: AmbientId, volume = 0.7) {
    console.log('🎵 [Audio] playAmbient:', id, 'volume:', volume);
    try {
      await this.stopAmbient();
      const sources = getAmbientSources();
      console.log('🎵 [Audio] sources available:', Object.keys(sources).filter(k => sources[k] !== null));
      const source = sources[id];
      if (source === null || source === undefined) {
        console.log('🎵 [Audio] silence mode for:', id);
        return;
      }

      if (Platform.OS === 'web') {
        if (typeof window === 'undefined') return;
        const AudioCtor = (window as any).Audio;
        if (!AudioCtor) return;
        const url = typeof source === 'string' ? source : String(source);
        const audio = new AudioCtor(url) as HTMLAudioElement;
        audio.loop = true;
        audio.volume = volume;
        await audio.play();
        _webAmbientAudio = audio;
        return;
      }

      await ensureAudioConfigured();
      const { sound } = await Audio.Sound.createAsync(
        source as number,
        { isLooping: true, volume, shouldPlay: true }
      ).catch((e: any) => {
        console.log('🔴 [Audio] createAsync failed:', e?.message);
        return { sound: null as any };
      });
      if (!sound) return;
      _ambientSound = sound;
      console.log('🎵 [Audio] ambient playing:', id);
    } catch (e: any) {
      console.log('🔴 [Audio] playAmbient error:', e?.message);
    }
  },

  async stopAmbient() {
    if (Platform.OS === 'web') {
      if (_webAmbientAudio) {
        _webAmbientAudio.pause();
        _webAmbientAudio.src = '';
        _webAmbientAudio = null;
      }
      return;
    }
    if (_ambientSound) {
      await _ambientSound.stopAsync().catch(() => {});
      await _ambientSound.unloadAsync().catch(() => {});
      _ambientSound = null;
    }
  },

  async setAmbientVolume(volume: number) {
    if (Platform.OS === 'web') {
      if (_webAmbientAudio) _webAmbientAudio.volume = volume;
      return;
    }
    if (_ambientSound) await _ambientSound.setVolumeAsync(volume).catch(() => {});
  },

  isAmbientPlaying(): boolean {
    if (Platform.OS === 'web') return _webAmbientAudio !== null;
    return _ambientSound !== null;
  },
};
