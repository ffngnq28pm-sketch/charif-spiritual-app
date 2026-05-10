import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Switch,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bell, Globe, Star, ChevronRight, Moon, Info, User, Target, Clock, Heart, Music } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { PremiumPaywall } from '@/components/PremiumPaywall';
import { AmbientSoundSelector } from '@/components/AmbientSoundSelector';
import { usePremium } from '@/hooks/usePremium';
import { useTheme, AppTheme } from '@/context/ThemeContext';
import { useUserProfile, FOCUS_THEMES, FocusTheme, NOTIF_PRESETS, NotifPreset } from '@/context/UserProfileContext';
import { useI18n, LANG_META } from '@/context/I18nContext';
import { useNightModeContext } from '@/context/NightModeContext';

const TIMER_OPTIONS = [5, 10, 15, 30] as const;

type VisualTheme = { key: AppTheme; label: string; desc: string; preview: [string, string] };
const VISUAL_THEMES: VisualTheme[] = [
  { key: 'dark',  label: 'Nuit',    desc: 'Bleu nuit profond — défaut',   preview: ['#050A1E', '#0A1845'] },
  { key: 'light', label: 'Lumière', desc: 'Ivoire chaud et or élégant',   preview: ['#FAF7F0', '#F0E8D0'] },
  { key: 'sepia', label: 'Sépia',   desc: 'Parchemin ancien — manuscrit', preview: ['#1C140A', '#2E1F0C'] },
];

export default function SettingsScreen() {
  console.log('🚀 [SettingsScreen] mounted');
  const { isPremium, unlockPremium } = usePremium();
  const { theme, setTheme, colors } = useTheme();
  const { profile, update, focusDays } = useUserProfile();
  const { lang, setLang, t } = useI18n();
  const { isNightMode, isAutoEnabled, timerMinutes, toggleManual, setAutoEnabled, setTimer } = useNightModeContext();
  const [premiumVisible, setPremiumVisible] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.firstName);

  function saveName() {
    update({ firstName: nameInput.trim() });
    setEditingName(false);
  }

  const accent = colors.textAccent;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Réglages</Text>

          {/* Premium Banner */}
          {!isPremium ? (
            <TouchableOpacity
              style={[styles.premiumBanner, { borderColor: 'rgba(201,168,76,0.3)' }]}
              onPress={() => setPremiumVisible(true)}
              activeOpacity={0.85}
            >
              <LinearGradient colors={['#1A2A50', '#0F1E3C']} style={styles.premiumGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={styles.premiumLeft}>
                  <View style={styles.starBadge}><Star size={16} color="#C9A84C" fill="#C9A84C" /></View>
                  <View>
                    <Text style={styles.premiumTitle}>Charif Premium</Text>
                    <Text style={styles.premiumDesc}>Accédez à la sagesse complète</Text>
                  </View>
                </View>
                <View style={styles.premiumCta}><Text style={styles.premiumCtaText}>Découvrir</Text></View>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={[styles.premiumActive, { borderColor: 'rgba(201,168,76,0.25)', backgroundColor: 'rgba(201,168,76,0.08)' }]}>
              <Star size={16} color="#C9A84C" fill="#C9A84C" />
              <Text style={[styles.premiumActiveText, { color: accent }]}>Charif Premium actif</Text>
            </View>
          )}

          {/* Section: Prénom */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>PROFIL</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <User size={18} color={accent} />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Votre prénom</Text>
            </View>
            {editingName ? (
              <View style={styles.nameEditRow}>
                <TextInput
                  style={[styles.nameInput, { color: colors.textPrimary, backgroundColor: colors.bgInput, borderColor: colors.borderAccent }]}
                  value={nameInput}
                  onChangeText={setNameInput}
                  placeholder="Saisissez votre prénom…"
                  placeholderTextColor={colors.textMuted}
                  autoFocus
                  selectionColor={accent}
                  returnKeyType="done"
                  onSubmitEditing={saveName}
                />
                <TouchableOpacity onPress={saveName} style={[styles.saveBtn, { backgroundColor: accent }]} activeOpacity={0.8}>
                  <Text style={styles.saveBtnText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.nameRow} onPress={() => setEditingName(true)} activeOpacity={0.75}>
                <Text style={[styles.nameValue, { color: colors.textSecondary }, !profile.firstName && { color: colors.textMuted, fontStyle: 'italic' }]}>
                  {profile.firstName || 'Touchez pour ajouter votre prénom…'}
                </Text>
                <ChevronRight size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )}
            <View style={styles.nameSub}>
              <Text style={[styles.nameSubText, { color: colors.textMuted }]}>
                Utilisé pour : "Salam {profile.firstName || 'prénom'}, voici ta sagesse du jour"
              </Text>
            </View>
          </View>

          {/* Section: Focus thème */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>INTENTION DU MOIS</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Target size={18} color={accent} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Thème de focus</Text>
                <Text style={[styles.sectionSub, { color: accent }]}>
                  {focusDays} jour{focusDays > 1 ? 's' : ''} de {profile.focusTheme}
                </Text>
              </View>
            </View>
            <View style={styles.focusGrid}>
              {FOCUS_THEMES.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.focusBtn,
                    { borderColor: colors.border, backgroundColor: colors.bgInput },
                    profile.focusTheme === t && { borderColor: accent, backgroundColor: accent + '20' },
                  ]}
                  onPress={() => update({ focusTheme: t as FocusTheme, focusStartedAt: Date.now() })}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.focusBtnText, { color: colors.textMuted }, profile.focusTheme === t && { color: accent, fontFamily: 'Lato_700Bold' }]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section: Notifications */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>NOTIFICATIONS</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Bell size={18} color={accent} />
                <View>
                  <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>Sagesse quotidienne</Text>
                  <Text style={[styles.rowDesc, { color: colors.textMuted }]}>Une sagesse vous est offerte chaque jour</Text>
                </View>
              </View>
              <Switch
                value={profile.notifEnabled}
                onValueChange={(v) => update({ notifEnabled: v })}
                trackColor={{ false: colors.bgSection, true: 'rgba(201,168,76,0.4)' }}
                thumbColor={profile.notifEnabled ? accent : colors.textMuted}
              />
            </View>

            {profile.notifEnabled && (
              <>
                <View style={[styles.separator, { backgroundColor: colors.border }]} />
                <View style={[styles.sectionHeader, { paddingBottom: 6 }]}>
                  <Clock size={15} color={accent} />
                  <Text style={[styles.presetTitle, { color: colors.textMuted }]}>Heure d'envoi</Text>
                </View>
                {NOTIF_PRESETS.map((p) => (
                  <TouchableOpacity
                    key={p.key}
                    style={[styles.presetRow, profile.notifPreset === p.key && { backgroundColor: accent + '10' }]}
                    onPress={() => update({ notifPreset: p.key as NotifPreset })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.presetLeft}>
                      <Text style={[styles.presetLabel, { color: colors.textSecondary }, profile.notifPreset === p.key && { color: accent, fontFamily: 'Lato_700Bold' }]}>
                        {p.label}
                      </Text>
                      <Text style={[styles.presetDesc, { color: colors.textMuted }]}>{p.desc}</Text>
                    </View>
                    <Text style={[styles.presetTime, { color: colors.textMuted }, profile.notifPreset === p.key && { color: accent }]}>{p.time}</Text>
                  </TouchableOpacity>
                ))}

                <View style={[styles.separator, { backgroundColor: colors.border }]} />
                <View style={[styles.sectionHeader, { paddingBottom: 8 }]}>
                  <Target size={15} color={accent} />
                  <Text style={[styles.presetTitle, { color: colors.textMuted }]}>Thème des notifications</Text>
                </View>
                <View style={[styles.focusGrid, { paddingBottom: 14 }]}>
                  {(['', ...FOCUS_THEMES] as string[]).map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.focusBtn,
                        { borderColor: colors.border },
                        profile.notifTheme === t && { borderColor: accent, backgroundColor: accent + '18' },
                      ]}
                      onPress={() => update({ notifTheme: t })}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.focusBtnText, { color: colors.textMuted }, profile.notifTheme === t && { color: accent, fontFamily: 'Lato_700Bold' }]}>
                        {t || 'Aléatoire'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Section: Visual Theme */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>THÈME VISUEL</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            {VISUAL_THEMES.map((vt, idx) => (
              <TouchableOpacity
                key={vt.key}
                style={[
                  styles.themeRow,
                  { borderBottomColor: colors.border, borderBottomWidth: idx < VISUAL_THEMES.length - 1 ? 1 : 0 },
                  theme === vt.key && { backgroundColor: accent + '10' },
                ]}
                onPress={() => { setTheme(vt.key); update({ appTheme: vt.key }); }}
                activeOpacity={0.8}
              >
                <LinearGradient colors={vt.preview} style={styles.themePreview} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
                <View style={styles.rowLeft}>
                  <View>
                    <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>{vt.label}</Text>
                    <Text style={[styles.rowDesc, { color: colors.textMuted }]}>{vt.desc}</Text>
                  </View>
                </View>
                {theme === vt.key && (
                  <View style={[styles.activeCheck, { backgroundColor: accent }]}>
                    <Text style={styles.activeCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Section: Language */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>LANGUE</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Globe size={18} color={accent} />
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Langue de l'interface</Text>
            </View>
            <View style={styles.langGrid}>
              {LANG_META.map((meta) => (
                <TouchableOpacity
                  key={meta.code}
                  style={[styles.langBtn, { backgroundColor: colors.bgInput, borderColor: colors.border }, lang === meta.code && { backgroundColor: accent + '20', borderColor: accent }]}
                  onPress={() => setLang(meta.code)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.langCode, { color: colors.textMuted }, lang === meta.code && { color: accent }]}>{meta.code.toUpperCase()}</Text>
                  <Text style={[styles.langNative, { color: colors.textMuted }, lang === meta.code && { color: colors.textSecondary }]}>{meta.native}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Section: Mode Nuit */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>MODE NUIT</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Moon size={18} color={accent} />
                <View>
                  <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>
                    Mode nuit {isNightMode ? '🌙' : ''}
                  </Text>
                  <Text style={[styles.rowDesc, { color: colors.textMuted }]}>
                    {isNightMode ? 'Actif — filtre ambré' : 'Fond sombre, filtre ambré'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isNightMode}
                onValueChange={toggleManual}
                trackColor={{ false: colors.bgSection, true: 'rgba(255,140,0,0.35)' }}
                thumbColor={isNightMode ? '#FF8C00' : colors.textMuted}
              />
            </View>

            <View style={[styles.separator, { backgroundColor: colors.border }]} />

            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={{ width: 18 }} />
                <View>
                  <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>Auto après 19h00</Text>
                  <Text style={[styles.rowDesc, { color: colors.textMuted }]}>S'active automatiquement le soir</Text>
                </View>
              </View>
              <Switch
                value={isAutoEnabled}
                onValueChange={setAutoEnabled}
                trackColor={{ false: colors.bgSection, true: 'rgba(201,168,76,0.4)' }}
                thumbColor={isAutoEnabled ? accent : colors.textMuted}
              />
            </View>

            {isNightMode && (
              <>
                <View style={[styles.separator, { backgroundColor: colors.border }]} />
                <View style={[styles.sectionHeader, { paddingBottom: 10 }]}>
                  <Clock size={15} color={accent} />
                  <Text style={[styles.presetTitle, { color: colors.textMuted }]}>
                    Timer {timerMinutes ? `(${timerMinutes} min)` : ''}
                  </Text>
                </View>
                <View style={[styles.focusGrid, { paddingBottom: 14 }]}>
                  {([null, ...TIMER_OPTIONS] as (number | null)[]).map((m) => (
                    <TouchableOpacity
                      key={m ?? 'none'}
                      style={[
                        styles.focusBtn,
                        { borderColor: colors.border },
                        timerMinutes === m && { borderColor: accent, backgroundColor: accent + '18' },
                      ]}
                      onPress={() => setTimer(m)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.focusBtnText, { color: colors.textMuted }, timerMinutes === m && { color: accent, fontFamily: 'Lato_700Bold' }]}>
                        {m === null ? 'Aucun' : `${m} min`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Section: Ambiances */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>AMBIANCES SONORES</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <View style={[styles.sectionHeader, { paddingBottom: 4 }]}>
              <Music size={18} color={accent} />
              <View>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Sons d'ambiance</Text>
                <Text style={[styles.rowDesc, { color: colors.textMuted }]}>Se prolonge en arrière-plan · Réservé Premium</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 14, paddingBottom: 16 }}>
              <AmbientSoundSelector />
            </View>
          </View>

          {/* Section: Soutenir */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>SOUTENIR</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push('/support' as any)}
              activeOpacity={0.75}
            >
              <View style={styles.rowLeft}>
                <Heart size={18} color={accent} />
                <View>
                  <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>
                    ❤️ Soutenir Charif
                  </Text>
                  <Text style={[styles.rowDesc, { color: colors.textMuted }]}>
                    Contribuer à enrichir cette bibliothèque
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* About */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>À PROPOS</Text>
          <View style={[styles.section, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.row} activeOpacity={0.75} onPress={() => Linking.openURL('https://ffngnq28pm-sketch.github.io/nour-islamic-wisdom/privacy.html')}>
              <View style={styles.rowLeft}>
                <Info size={18} color={accent} />
                <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>Politique de confidentialité</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <TouchableOpacity style={styles.row} activeOpacity={0.75} onPress={() => Linking.openURL('https://ffngnq28pm-sketch.github.io/nour-islamic-wisdom/terms.html')}>
              <View style={styles.rowLeft}>
                <Info size={18} color={accent} />
                <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>Conditions d'utilisation</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            <TouchableOpacity style={styles.row} activeOpacity={0.75}>
              <View style={styles.rowLeft}>
                <Info size={18} color={accent} />
                <Text style={[styles.rowTitle, { color: colors.textSecondary }]}>À propos de Charif</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerArabic, { color: colors.textMuted }]}>شريف</Text>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>Version 2.0.0</Text>
            <Text style={[styles.footerTagline, { color: colors.textMuted }]}>Lumière, sagesse et sérénité — chaque jour.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <PremiumPaywall
        visible={premiumVisible}
        onClose={() => setPremiumVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 100 },
  title: { fontFamily: 'Amiri_700Bold', fontSize: 28, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20 },
  premiumBanner: { marginHorizontal: 20, marginBottom: 28, borderRadius: 18, overflow: 'hidden', borderWidth: 1 },
  premiumGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18 },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  starBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(201,168,76,0.15)', alignItems: 'center', justifyContent: 'center' },
  premiumTitle: { fontFamily: 'Lato_700Bold', fontSize: 15, color: '#F5EDD6', marginBottom: 2 },
  premiumDesc: { fontFamily: 'Lato_400Regular', fontSize: 12, color: '#8A8FA8' },
  premiumCta: { backgroundColor: '#C9A84C', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  premiumCtaText: { fontFamily: 'Lato_700Bold', fontSize: 13, color: '#050A1E' },
  premiumActive: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 28, padding: 14, borderRadius: 14, borderWidth: 1 },
  premiumActiveText: { fontFamily: 'Lato_700Bold', fontSize: 14 },
  sectionLabel: { fontFamily: 'Lato_400Regular', fontSize: 10, letterSpacing: 2, paddingHorizontal: 24, marginBottom: 8 },
  section: { marginHorizontal: 20, marginBottom: 24, borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  sectionTitle: { fontFamily: 'Lato_400Regular', fontSize: 14, flex: 1 },
  sectionSub: { fontFamily: 'Lato_700Bold', fontSize: 11, marginTop: 2 },
  nameEditRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingBottom: 14, gap: 10 },
  nameInput: { flex: 1, fontFamily: 'Lato_400Regular', fontSize: 15, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1 },
  saveBtn: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  saveBtnText: { fontFamily: 'Lato_700Bold', fontSize: 13, color: '#050A1E' },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingBottom: 14 },
  nameValue: { fontFamily: 'Lato_400Regular', fontSize: 15 },
  nameSub: { paddingHorizontal: 18, paddingBottom: 14 },
  nameSubText: { fontFamily: 'Lato_400Regular', fontSize: 11, lineHeight: 16 },
  focusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 14, paddingBottom: 14 },
  focusBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  focusBtnText: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  separator: { height: 1, marginHorizontal: 18 },
  presetTitle: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  presetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 12 },
  presetLeft: { flex: 1 },
  presetLabel: { fontFamily: 'Lato_400Regular', fontSize: 14 },
  presetDesc: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  presetTime: { fontFamily: 'Lato_700Bold', fontSize: 13 },
  themeRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  themePreview: { width: 40, height: 40, borderRadius: 10 },
  activeCheck: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activeCheckText: { fontFamily: 'Lato_700Bold', fontSize: 12, color: '#050A1E' },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 14, paddingBottom: 14 },
  langBtn: { width: '28%', minWidth: 70, paddingVertical: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, gap: 2 },
  langCode: { fontFamily: 'Lato_700Bold', fontSize: 13 },
  langNative: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  rowTitle: { fontFamily: 'Lato_400Regular', fontSize: 14, marginBottom: 2 },
  rowDesc: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  footer: { alignItems: 'center', paddingTop: 12, paddingBottom: 20, gap: 6 },
  footerArabic: { fontFamily: 'Amiri_700Bold', fontSize: 32 },
  footerText: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  footerTagline: { fontFamily: 'Lato_400Regular', fontSize: 12, fontStyle: 'italic' },
});
