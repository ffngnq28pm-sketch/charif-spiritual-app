import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { Volume2, VolumeX } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { AudioService, getQuranAudioUrl, parseQuranReference } from '@/services/AudioService';


interface Props {
  arabic: string;
  french: string;
  sourceType: string;
  source: string;
  compact?: boolean;
}

type AudioState = 'idle' | 'loading' | 'playing' | 'error';

const BAR_COUNT = 5;

export function AudioButton({ arabic, french, sourceType, source, compact = false }: Props) {
  const { colors } = useTheme();
  const [state, setState] = useState<AudioState>('idle');
  const barAnims = useRef(Array.from({ length: BAR_COUNT }, () => new Animated.Value(0.3))).current;
  const waveLoop = useRef<Animated.CompositeAnimation | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isQuran = sourceType === 'Coran';

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, []);

  function startWave() {
    const animations = barAnims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 80),
          Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        ])
      )
    );
    waveLoop.current = Animated.parallel(animations);
    waveLoop.current.start();
  }

  function stopWave() {
    waveLoop.current?.stop();
    barAnims.forEach((a) => a.setValue(0.3));
  }

  function stopAll() {
    if (Platform.OS !== 'web') {
      AudioService.stopQuran().catch(() => {});
    } else {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    }
    stopWave();
    setState('idle');
  }

  async function playArabicQuran() {
    if (Platform.OS !== 'web') {
      const ref = parseQuranReference(source);
      if (!ref) { setState('error'); setTimeout(() => setState('idle'), 2000); return; }
      const url = getQuranAudioUrl(ref.surah, ref.ayah);
      setState('loading');
      try {
        await AudioService.playQuran(url, (playing) => {
          if (playing) { setState('playing'); startWave(); }
          else { stopWave(); setState('idle'); }
        });
        setState('playing');
        startWave();
      } catch {
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
      return;
    }

    // Web: HTML Audio element
    const webRef = parseQuranReference(source);
    if (!webRef) { setState('error'); setTimeout(() => setState('idle'), 2000); return; }
    const url = getQuranAudioUrl(webRef.surah, webRef.ayah);

    const AudioCtor = typeof window !== 'undefined' && (window as any).Audio;
    if (!AudioCtor) { setState('error'); setTimeout(() => setState('idle'), 2000); return; }

    setState('loading');
    try {
      const audio = new AudioCtor(url) as HTMLAudioElement;
      audioRef.current = audio;
      audio.oncanplay = () => { setState('playing'); startWave(); audio.play(); };
      audio.onended = () => { stopWave(); setState('idle'); audioRef.current = null; };
      audio.onerror = () => { stopWave(); setState('error'); setTimeout(() => setState('idle'), 2000); audioRef.current = null; };
      audio.load();
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2000);
    }
  }

  function handlePress() {
    if (state === 'playing' || state === 'loading') {
      stopAll();
      return;
    }
    playArabicQuran();
  }

  const accent = colors.textAccent;
  const isActive = state === 'playing' || state === 'loading';
  const isErr = state === 'error';

  // Only Quran cards have audio
  if (!isQuran) return null;

  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <TouchableOpacity
        style={[
          styles.btn,
          compact && styles.btnCompact,
          { borderColor: isActive ? accent : colors.borderAccent, backgroundColor: isActive ? accent + '18' : 'transparent' },
          isErr && { borderColor: '#E05A5A' },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {isActive ? (
          <WaveformBars bars={barAnims} color={accent} compact={compact} />
        ) : isErr ? (
          <VolumeX size={compact ? 13 : 15} color="#E05A5A" />
        ) : (
          <Volume2 size={compact ? 13 : 15} color={accent} />
        )}
        {!compact && (
          <Text style={[styles.btnLabel, { color: isActive ? accent : colors.textMuted }]}>
            تلاوة
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

function WaveformBars({ bars, color, compact }: { bars: Animated.Value[]; color: string; compact: boolean }) {
  const heights = [10, 16, 12, 18, 10];
  return (
    <View style={styles.waveform}>
      {bars.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              height: compact ? heights[i] * 0.65 : heights[i],
              backgroundColor: color,
              transform: [{ scaleY: anim }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  rowCompact: {
    gap: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  btnCompact: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
  },
  btnLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    height: 20,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
});
