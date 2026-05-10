import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react-native';
import { WisdomCard } from '@/components/WisdomCard';
import { CardActions } from '@/components/CardActions';
import { useFavorites } from '@/hooks/useFavorites';
import { useRamadan } from '@/hooks/useRamadan';
import { useTheme } from '@/context/ThemeContext';
import { RAMADAN_CARDS, getRamadanCardOfDay } from '@/data/ramadanCards';
import { WisdomCard as WisdomCardType } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// For demo/preview: simulate Ramadan day 14 when not in Ramadan
const DEMO_DAY = 14;

export default function RamadanScreen() {
  const { isRamadan, day: realDay, total, iftarCountdown, iftarPassed, daysUntilNextRamadan } = useRamadan();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { colors, theme } = useTheme();

  const activeDay = isRamadan ? realDay : DEMO_DAY;
  const [activeIndex, setActiveIndex] = useState(activeDay - 1);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  const activeCard = RAMADAN_CARDS[activeIndex];

  const renderItem = ({ item }: { item: WisdomCardType }) => (
    <View style={styles.slide}>
      <WisdomCard card={item} />
      <View style={styles.slideActions}>
        <CardActions
          card={item}
          isFavorite={favoriteIds.has(item.id)}
          onFavoriteToggle={() => toggleFavorite(item.id)}
        />
      </View>
    </View>
  );

  // Ramadan screen keeps a deep dark golden aesthetic — intentional mood design
  const ramadanBg = theme === 'light' ? '#0D0900' : '#080500';

  return (
    <View style={[styles.root, { backgroundColor: ramadanBg }]}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          stickyHeaderIndices={[0]}
        >
          {/* Header */}
          <LinearGradient
            colors={['#0D0A00', '#1A1200', '#0D0A00']}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.moonRow}>
                  <Moon size={20} color="#C9A84C" fill="#C9A84C" />
                  <Text style={styles.headerTitle}>Ramadan Kareem</Text>
                  <Moon size={20} color="#C9A84C" fill="#C9A84C" />
                </View>
                <Text style={styles.headerSub}>
                  {isRamadan
                    ? `Jour ${activeDay} sur ${total}`
                    : `Aperçu — Jour ${DEMO_DAY} sur 30`}
                </Text>
              </View>
            </View>

            {/* Iftar countdown / Next Ramadan */}
            <View style={styles.iftarBox}>
              {isRamadan ? (
                <>
                  <View style={styles.iftarInner}>
                    <Clock size={14} color="#C9A84C" />
                    <Text style={styles.iftarLabel}>
                      {iftarPassed ? 'Iftar — Bonne rupture du jeûne' : "Temps avant l'Iftar"}
                    </Text>
                  </View>
                  {!iftarPassed && (
                    <Text style={styles.iftarTimer}>{iftarCountdown}</Text>
                  )}
                  {iftarPassed && (
                    <Text style={styles.iftarDone}>مَعَ الشَّاكِرِينَ</Text>
                  )}
                </>
              ) : (
                <>
                  <View style={styles.iftarInner}>
                    <Moon size={14} color="#C9A84C" fill="#C9A84C" />
                    <Text style={styles.iftarLabel}>Prochain Ramadan</Text>
                  </View>
                  {daysUntilNextRamadan !== null ? (
                    <Text style={styles.iftarTimer}>~{daysUntilNextRamadan} jours</Text>
                  ) : (
                    <Text style={styles.iftarTimer}>--</Text>
                  )}
                  <Text style={styles.iftarNote}>
                    Dates exactes annoncées par les autorités religieuses
                  </Text>
                </>
              )}
            </View>

            {/* Day pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pillsScroll}
              contentContainerStyle={styles.pillsContent}
            >
              {RAMADAN_CARDS.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dayPill, i === activeIndex && styles.dayPillActive]}
                  onPress={() => setActiveIndex(i)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.dayPillText, i === activeIndex && styles.dayPillTextActive]}>
                    {i + 1}
                  </Text>
                  {i + 1 <= (isRamadan ? activeDay : DEMO_DAY) && i !== activeIndex && (
                    <Star size={5} color="#C9A84C" fill="#C9A84C" style={styles.completedDot} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </LinearGradient>

          {/* Cards swiper */}
          <View style={styles.swiperSection}>
            <View style={styles.navRow}>
              <TouchableOpacity
                disabled={activeIndex === 0}
                onPress={() => setActiveIndex((i) => i - 1)}
                style={[styles.navBtn, activeIndex === 0 && styles.navBtnDisabled]}
                activeOpacity={0.7}
              >
                <ChevronLeft size={16} color={activeIndex === 0 ? '#1E2540' : '#C9A84C'} />
              </TouchableOpacity>
              <Text style={styles.navLabel}>JOUR {activeIndex + 1} / 30</Text>
              <TouchableOpacity
                disabled={activeIndex === 29}
                onPress={() => setActiveIndex((i) => i + 1)}
                style={[styles.navBtn, activeIndex === 29 && styles.navBtnDisabled]}
                activeOpacity={0.7}
              >
                <ChevronRight size={16} color={activeIndex === 29 ? '#1E2540' : '#C9A84C'} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={RAMADAN_CARDS}
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
              initialScrollIndex={activeIndex}
              getItemLayout={(_, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
              style={styles.flatList}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#080500' },
  safe: { flex: 1 },
  scroll: { paddingBottom: 100 },

  headerGradient: {
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201,168,76,0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  headerLeft: { alignItems: 'center' },
  moonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 24,
    color: '#F5EDD6',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#C9A84C',
    marginTop: 4,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  iftarBox: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.25)',
    backgroundColor: 'rgba(201,168,76,0.06)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  iftarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  iftarLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#C9A84C',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  iftarTimer: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 34,
    color: '#F5EDD6',
    letterSpacing: 4,
  },
  iftarDone: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 22,
    color: '#C9A84C',
  },
  iftarNote: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(201,168,76,0.45)',
    marginTop: 4,
    textAlign: 'center',
  },

  pillsScroll: { maxHeight: 52 },
  pillsContent: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
    paddingBottom: 4,
  },
  dayPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  dayPillActive: {
    backgroundColor: '#C9A84C',
    borderColor: '#C9A84C',
  },
  dayPillText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    color: 'rgba(201,168,76,0.6)',
  },
  dayPillTextActive: { color: '#050A1E' },
  completedDot: { position: 'absolute', bottom: 4, right: 4 },

  swiperSection: { marginTop: 16 },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(201,168,76,0.08)',
  },
  navBtnDisabled: {
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'transparent',
  },
  navLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#4A5068',
    letterSpacing: 2,
  },
  flatList: {},
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  slideActions: { marginTop: 16 },
});
