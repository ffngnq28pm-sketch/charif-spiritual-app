import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';
import { usePractice } from '@/hooks/usePractice';
import { DailySession } from '@/components/DailySession';
import { SpiritualJournal } from '@/components/SpiritualJournal';
import { WeeklyPath } from '@/components/WeeklyPath';
import { DAILY_SESSIONS } from '@/data/sessions';
import { WEEKLY_PATHS } from '@/data/weeklyPaths';

function getTodaySession() {
  const d = new Date();
  const idx = (d.getDate() + d.getMonth() * 30) % DAILY_SESSIONS.length;
  return DAILY_SESSIONS[idx];
}

function formatTodayDate(): string {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function PracticeScreen() {
  console.log('🚀 [PracticeScreen] mounted');
  const { colors } = useTheme();
  const { isPremium } = usePremium();
  const {
    sessionCompletedToday,
    completeSession,
    entries,
    addEntry,
    deleteEntry,
    pathProgress,
    advancePath,
    resetPath,
  } = usePractice();

  const [sessionVisible, setSessionVisible] = useState(false);
  const todaySession = getTodaySession();

  const handleSessionComplete = (reflectionAnswer?: string) => {
    completeSession();
    setSessionVisible(false);

    // Auto-save reflection to journal if provided
    if (reflectionAnswer) {
      addEntry({
        date: new Date().toISOString().slice(0, 10),
        sessionId: todaySession.id,
        question: 'Réflexion de session',
        answer: reflectionAnswer,
      });
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
              Ma Pratique
            </Text>
            <Text style={[styles.dateText, { color: colors.textMuted }]}>
              {formatTodayDate()}
            </Text>
          </View>

          {/* ──── Session du Jour ──── */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              SESSION DU JOUR
            </Text>
          </View>

          <View
            style={[
              styles.sessionCard,
              {
                backgroundColor: colors.bgCard,
                borderColor: sessionCompletedToday ? colors.borderAccent : colors.border,
              },
            ]}
          >
            <View style={styles.sessionTop}>
              <View style={styles.sessionInfo}>
                <View style={[styles.themeBadge, { backgroundColor: colors.textAccent + '22', borderColor: colors.borderAccent }]}>
                  <Text style={[styles.themeBadgeText, { color: colors.textAccent }]}>
                    {todaySession.theme}
                  </Text>
                </View>
                <Text style={[styles.sessionCardTitle, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
                  {todaySession.title}
                </Text>
                <Text style={[styles.sessionSubtitle, { color: colors.textSecondary }]}>
                  {todaySession.subtitle}
                </Text>
              </View>
              <View style={[styles.durationCircle, { borderColor: colors.borderAccent }]}>
                <Text style={[styles.durationMin, { color: colors.textAccent }]}>{todaySession.durationMin}</Text>
                <Text style={[styles.durationLabel, { color: colors.textMuted }]}>min</Text>
              </View>
            </View>

            <View style={styles.stepsPreview}>
              {todaySession.steps.map((step, i) => (
                <View
                  key={i}
                  style={[styles.stepPip, { backgroundColor: colors.border }]}
                />
              ))}
            </View>

            {sessionCompletedToday ? (
              <View style={[styles.completedBanner, { backgroundColor: '#6BBF7C22', borderColor: '#6BBF7C' }]}>
                <Text style={[styles.completedBannerText, { color: '#6BBF7C' }]}>
                  ✓ Session accomplie — Alhamdulillah
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.startSessionBtn, { backgroundColor: colors.textAccent }]}
                onPress={() => setSessionVisible(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.startSessionBtnText}>Commencer la session</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ──── Mon Journal ──── */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              MON JOURNAL
            </Text>
            <Text style={[styles.sectionCount, { color: colors.textMuted }]}>
              {entries.length} entrée{entries.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <SpiritualJournal
            entries={entries}
            onAdd={addEntry}
            onDelete={deleteEntry}
          />

          {/* ──── Mes Parcours ──── */}
          <View style={[styles.sectionHeader, { marginTop: 8 }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              MES PARCOURS
            </Text>
            <Text style={[styles.sectionCount, { color: colors.textMuted }]}>
              7 jours chacun
            </Text>
          </View>

          <WeeklyPath
            paths={WEEKLY_PATHS}
            progress={pathProgress}
            isPremium={isPremium}
            onAdvance={advancePath}
            onReset={resetPath}
          />

          {/* ──── Ressources islamiques ──── */}
          <View style={[styles.sectionHeader, { marginTop: 8 }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              RESSOURCES
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.resourceRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
            onPress={() => router.push('/surahs')}
            activeOpacity={0.8}
          >
            <Text style={styles.resourceIcon}>📖</Text>
            <View style={styles.resourceInfo}>
              <Text style={[styles.resourceTitle, { color: colors.textPrimary }]}>Les 114 Sourates</Text>
              <Text style={[styles.resourceSub, { color: colors.textMuted }]}>Guide complet du Saint Coran</Text>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.resourceRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
            onPress={() => router.push('/azkar')}
            activeOpacity={0.8}
          >
            <Text style={styles.resourceIcon}>🤲</Text>
            <View style={styles.resourceInfo}>
              <Text style={[styles.resourceTitle, { color: colors.textPrimary }]}>Dhikr & Douaas</Text>
              <Text style={[styles.resourceSub, { color: colors.textMuted }]}>Adhkar du matin, soir, prière…</Text>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Bottom padding for tab bar */}
          <View style={styles.bottomPad} />
        </ScrollView>
      </SafeAreaView>

      {/* Session Modal */}
      <DailySession
        session={todaySession}
        visible={sessionVisible}
        onComplete={handleSessionComplete}
        onClose={() => setSessionVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 2,
  },
  sectionCount: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
  },
  sessionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 24,
    gap: 14,
  },
  sessionTop: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  sessionInfo: {
    flex: 1,
    gap: 6,
  },
  themeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  themeBadgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sessionCardTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  sessionSubtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  durationCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationMin: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
  },
  durationLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    marginTop: -2,
  },
  stepsPreview: {
    flexDirection: 'row',
    gap: 6,
  },
  stepPip: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  completedBanner: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  completedBannerText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  startSessionBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startSessionBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bottomPad: {
    height: 100,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    gap: 14,
  },
  resourceIcon: { fontSize: 28, width: 36 },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontFamily: 'Lato_700Bold', fontSize: 15, marginBottom: 2 },
  resourceSub: { fontFamily: 'Lato_400Regular', fontSize: 12 },
});
