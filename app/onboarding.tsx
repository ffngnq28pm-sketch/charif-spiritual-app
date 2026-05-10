import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useUserProfile, FOCUS_THEMES, FocusTheme } from '@/context/UserProfileContext';
import { findNameMeaning, IslamicName } from '@/data/islamicNames';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const THEME_CONFIG: Record<FocusTheme, { icon: string; desc: string; color: string }> = {
  Patience:  { icon: '🌊', desc: 'Développer la persévérance et la sérénité', color: '#4A7FA5' },
  Gratitude: { icon: '🌸', desc: 'Cultiver la reconnaissance chaque jour',    color: '#A5664A' },
  Amour:     { icon: '🤝', desc: 'Ouvrir le cœur à la compassion divine',     color: '#C9A84C' },
  Foi:       { icon: '🔥', desc: 'Renforcer la confiance en Allah',           color: '#5A7A5A' },
  Sagesse:   { icon: '⚖️', desc: 'Chercher la connaissance et la vérité',     color: '#7A5A9A' },
  Paix:      { icon: '🕊️', desc: 'Trouver la tranquillité intérieure',        color: '#4A8A7A' },
};

export default function OnboardingScreen() {
  const { update } = useUserProfile();
  const [step, setStep] = useState<'name' | 'theme'>('name');
  const [name, setName] = useState('');
  const [chosen, setChosen] = useState<FocusTheme | null>(null);
  const [nameMeaning, setNameMeaning] = useState<IslamicName | null>(null);

  function handleNameChange(text: string) {
    setName(text);
    setNameMeaning(findNameMeaning(text));
  }

  function handleNameNext() {
    if (step === 'name') {
      setStep('theme');
    }
  }

  function handleFinish() {
    if (!chosen) return;
    update({
      firstName: name.trim(),
      focusTheme: chosen,
      focusStartedAt: Date.now(),
      onboardingDone: true,
    });
    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['#050A1E', '#0A1230', '#050A1E']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header ornament */}
      <View style={styles.topOrnament}>
        <Text style={styles.arabicLogo}>نور</Text>
        <Text style={styles.logoSub}>Nour</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {step === 'name' ? (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Bienvenue</Text>
            <Text style={styles.stepSubtitle}>
              Commençons votre voyage spirituel.{'\n'}Comment puis-je vous appeler ?
            </Text>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                placeholder="Votre prénom..."
                placeholderTextColor="rgba(201,168,76,0.35)"
                value={name}
                onChangeText={handleNameChange}
                autoFocus
                returnKeyType="next"
                onSubmitEditing={handleNameNext}
                selectionColor="#C9A84C"
              />
            </View>

            <TouchableOpacity
              style={[styles.nextBtn, !name.trim() && styles.nextBtnDisabled]}
              onPress={handleNameNext}
              disabled={!name.trim()}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>Continuer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('theme')} style={styles.skipBtn} activeOpacity={0.7}>
              <Text style={styles.skipText}>Passer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>
              {name.trim() ? `Salam ${name.trim()}` : 'Votre intention'}
            </Text>

            {nameMeaning && (
              <View style={styles.nameMeaningCard}>
                <Text style={styles.nameMeaningArabic}>{nameMeaning.arabic}</Text>
                <Text style={styles.nameMeaningTitle}>{nameMeaning.name}</Text>
                <Text style={styles.nameMeaningOrigin}>{nameMeaning.origin}</Text>
                <Text style={styles.nameMeaningText}>{nameMeaning.meaning}</Text>
                {nameMeaning.virtue && (
                  <View style={styles.nameMeaningVirtue}>
                    <Text style={styles.nameMeaningVirtueText}>✦ {nameMeaning.virtue}</Text>
                  </View>
                )}
              </View>
            )}

            <Text style={styles.stepSubtitle}>
              Choisissez un thème sur lequel vous concentrer ce mois-ci.{'\n'}
              Vos sagesses quotidiennes y seront adaptées.
            </Text>

            <View style={styles.themesGrid}>
              {FOCUS_THEMES.map((theme) => {
                const cfg = THEME_CONFIG[theme];
                const isActive = chosen === theme;
                return (
                  <TouchableOpacity
                    key={theme}
                    style={[
                      styles.themeCard,
                      isActive && { borderColor: cfg.color, backgroundColor: cfg.color + '18' },
                    ]}
                    onPress={() => setChosen(theme)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.themeIcon}>{cfg.icon}</Text>
                    <Text style={[styles.themeName, isActive && { color: '#F5EDD6' }]}>{theme}</Text>
                    <Text style={styles.themeDesc}>{cfg.desc}</Text>
                    {isActive && <View style={[styles.themeActiveBar, { backgroundColor: cfg.color }]} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextBtn, !chosen && styles.nextBtnDisabled]}
              onPress={handleFinish}
              disabled={!chosen}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>Commencer mon voyage</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Step indicator */}
      <View style={styles.dots}>
        <View style={[styles.dot, step === 'name' && styles.dotActive]} />
        <View style={[styles.dot, step === 'theme' && styles.dotActive]} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#050A1E' },
  topOrnament: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
  arabicLogo: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 52,
    color: '#C9A84C',
    textShadowColor: 'rgba(201,168,76,0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: 'rgba(201,168,76,0.5)',
    letterSpacing: 6,
    textTransform: 'uppercase',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  stepContent: {
    paddingTop: 32,
    alignItems: 'center',
  },
  stepTitle: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 32,
    color: '#F5EDD6',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#8A8FA8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  inputWrap: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
    backgroundColor: 'rgba(201,168,76,0.06)',
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'Lato_400Regular',
    fontSize: 18,
    color: '#F5EDD6',
    paddingHorizontal: 20,
    paddingVertical: 16,
    textAlign: 'center',
  },
  nextBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#C9A84C',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(201,168,76,0.25)',
  },
  nextBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#050A1E',
  },
  skipBtn: { padding: 12 },
  skipText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: '#4A5068',
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    marginBottom: 32,
  },
  themeCard: {
    width: (SCREEN_WIDTH - 60) / 2,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  themeIcon: { fontSize: 26 },
  themeName: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 18,
    color: '#8A8FA8',
  },
  themeDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: '#4A5068',
    textAlign: 'center',
    lineHeight: 14,
  },
  themeActiveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 0,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#C9A84C',
  },
  nameMeaningCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
    backgroundColor: 'rgba(201,168,76,0.06)',
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    gap: 4,
  },
  nameMeaningArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 36,
    color: '#C9A84C',
    textShadowColor: 'rgba(201,168,76,0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  nameMeaningTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#F5EDD6',
    marginTop: 4,
  },
  nameMeaningOrigin: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: 'rgba(201,168,76,0.6)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nameMeaningText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#8A8FA8',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 6,
  },
  nameMeaningVirtue: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.12)',
  },
  nameMeaningVirtueText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: '#C9A84C',
    letterSpacing: 0.5,
  },
});
