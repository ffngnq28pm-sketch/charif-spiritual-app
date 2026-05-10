import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react-native';
import { router } from 'expo-router';
import { WisdomCard } from '@/components/WisdomCard';
import { CardActions } from '@/components/CardActions';
import { PremiumBanner } from '@/components/PremiumBanner';
import { PremiumPaywall } from '@/components/PremiumPaywall';
import { IslamicCalendarWidget } from '@/components/IslamicCalendarWidget';
import { TasbihCounter } from '@/components/TasbihCounter';
import { DailyChallengeWidget } from '@/components/DailyChallengeWidget';
import { AudioActivationBanner } from '@/components/AudioActivationBanner';
import { useFavorites } from '@/hooks/useFavorites';
import { usePremium, FREE_CARD_LIMIT } from '@/hooks/usePremium';
import { useTheme } from '@/context/ThemeContext';
import { useUserProfile } from '@/context/UserProfileContext';
import { useIslamicCalendar, PERIOD_THEMES } from '@/hooks/useIslamicCalendar';
import { CARDS } from '@/data/cards';
import { WisdomCard as WisdomCardType, Theme } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FOCUS_GOAL = 30;

export default function HomeScreen() {
  console.log('🚀 [HomeScreen] mounted');
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isPremium, isCardLocked } = usePremium();
  const { colors } = useTheme();
  const { profile, update, focusDays } = useUserProfile();
  const { period } = useIslamicCalendar();
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<WisdomCardType>>(null);

  useEffect(() => {
    if (!profile.onboardingDone) {
      router.replace('/onboarding');
    }
  }, [profile.onboardingDone]);

  // Cartes accessibles selon le statut premium
  const accessibleCards = isPremium ? CARDS : CARDS.slice(0, FREE_CARD_LIMIT);

  // Ordre contextuel : focus theme → période islamique → reste
  const periodThemes: Theme[] = PERIOD_THEMES[period] ?? [];
  const focusCards = accessibleCards.filter((c) => c.theme === profile.focusTheme);
  const periodCards = accessibleCards.filter(
    (c) => c.theme !== profile.focusTheme && periodThemes.includes(c.theme)
  );
  const otherCards = accessibleCards.filter(
    (c) => c.theme !== profile.focusTheme && !periodThemes.includes(c.theme)
  );
  const visibleCards = [...focusCards, ...periodCards, ...otherCards];

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const greeting = profile.firstName ? `Salam ${profile.firstName}` : 'نور · Nour';

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      if (idx !== activeIndex && idx >= 0 && idx < visibleCards.length) {
        setActiveIndex(idx);
      }
    },
    [activeIndex, visibleCards.length]
  );

  const goTo = (idx: number) => {
    // Bloquer si carte verrouillée (index global dans CARDS)
    const globalIdx = CARDS.indexOf(visibleCards[idx]);
    if (globalIdx >= 0 && isCardLocked(globalIdx)) {
      setPaywallVisible(true);
      return;
    }
    if (idx < 0 || idx >= visibleCards.length) return;
    listRef.current?.scrollToIndex({ index: idx, animated: true });
    setActiveIndex(idx);
  };

  const renderItem = ({ item }: { item: WisdomCardType }) => (
    <View style={styles.slide}>
      <View style={styles.cardWrapper}>
        <WisdomCard card={item} />
      </View>
      <CardActions
        card={item}
        isFavorite={favoriteIds.has(item.id)}
        onFavoriteToggle={() => toggleFavorite(item.id)}
      />
      <TasbihCounter />
    </View>
  );

  const progressPct = Math.min(focusDays / FOCUS_GOAL, 1);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.appName, { color: colors.textPrimary }]}>{greeting}</Text>
            <Text style={[styles.dateText, { color: colors.textMuted }]}>{today}</Text>
          </View>
        </View>

        {/* Bannière premium discrète */}
        <PremiumBanner
          onPress={() => setPaywallVisible(true)}
          currentIndex={activeIndex}
        />

        <AudioActivationBanner />

        {/* Calendrier islamique */}
        <IslamicCalendarWidget />

        {/* Défi du jour */}
        <DailyChallengeWidget />

        {/* Focus progress bar */}
        {profile.onboardingDone && (
          <TouchableOpacity
            style={[styles.focusBar, { backgroundColor: colors.bgSection, borderColor: colors.border }]}
            onPress={() => router.push('/(tabs)/settings')}
            activeOpacity={0.8}
          >
            <View style={styles.focusLeft}>
              <Target size={13} color={colors.textAccent} />
              <Text style={[styles.focusLabel, { color: colors.textAccent }]}>
                {focusDays} jour{focusDays > 1 ? 's' : ''} de {profile.focusTheme}
              </Text>
            </View>
            <View style={[styles.focusTrack, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.focusFill,
                  { width: `${progressPct * 100}%` as any, backgroundColor: colors.textAccent },
                ]}
              />
            </View>
            <Text style={[styles.focusGoal, { color: colors.textMuted }]}>{FOCUS_GOAL}j</Text>
          </TouchableOpacity>
        )}

        {/* Nav row */}
        <View style={styles.navRow}>
          <TouchableOpacity
            onPress={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            style={[
              styles.navBtn,
              { borderColor: colors.borderAccent, backgroundColor: colors.textAccent + '08' },
              activeIndex === 0 && styles.navBtnDisabled,
            ]}
            activeOpacity={0.7}
          >
            <ChevronLeft
              size={18}
              color={activeIndex === 0 ? colors.bgSection : colors.textAccent}
            />
          </TouchableOpacity>

          <View style={styles.labelCenter}>
            <View style={[styles.dayLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dayLabel, { color: colors.textMuted }]}>
              {activeIndex === 0
                ? 'SAGESSE DU JOUR'
                : `CARTE ${activeIndex + 1} / ${visibleCards.length}`}
            </Text>
            <View style={[styles.dayLine, { backgroundColor: colors.border }]} />
          </View>

          <TouchableOpacity
            onPress={() => goTo(activeIndex + 1)}
            disabled={activeIndex === visibleCards.length - 1}
            style={[
              styles.navBtn,
              { borderColor: colors.borderAccent, backgroundColor: colors.textAccent + '08' },
              activeIndex === visibleCards.length - 1 && styles.navBtnDisabled,
            ]}
            activeOpacity={0.7}
          >
            <ChevronRight
              size={18}
              color={
                activeIndex === visibleCards.length - 1 ? colors.bgSection : colors.textAccent
              }
            />
          </TouchableOpacity>
        </View>

        {/* Carousel swipeable */}
        <FlatList
          ref={listRef}
          data={visibleCards}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH}
          snapToAlignment="start"
          style={[styles.flatList, Platform.OS === 'web' && { flex: undefined, height: 340 }]}
          contentContainerStyle={styles.flatListContent}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
        />

        {/* Dots */}
        <View style={styles.dotsRow}>
          {visibleCards.map((card, i) => (
            <TouchableOpacity key={card.id} onPress={() => goTo(i)} activeOpacity={0.8}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: colors.border },
                  i === activeIndex && { backgroundColor: colors.textAccent, width: 18 },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

      <PremiumPaywall
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1, ...(Platform.OS === 'web' ? { overflowY: 'auto' as any } : {}) },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  appName: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 24,
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  focusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  focusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minWidth: 120,
  },
  focusLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  focusTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  focusFill: {
    height: 4,
    borderRadius: 2,
  },
  focusGoal: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    minWidth: 20,
    textAlign: 'right',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnDisabled: {
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'transparent',
  },
  labelCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayLine: { flex: 1, height: 1 },
  dayLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
  },
  flatList: { flex: 1 },
  flatListContent: { alignItems: 'flex-start' },
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  cardWrapper: { marginBottom: 16 },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});
