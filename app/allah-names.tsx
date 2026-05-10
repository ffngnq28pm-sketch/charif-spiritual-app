import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, X, Star } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ALLAH_NAMES, AllahName } from '@/data/allahNames';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_W = (SCREEN_WIDTH - 48) / 2;
const CARD_H = CARD_W * 1.35;

export default function AllahNamesScreen() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<AllahName | null>(null);

  const renderItem = ({ item }: { item: AllahName }) => (
    <TouchableOpacity
      style={[styles.card, { width: CARD_W, height: CARD_H }]}
      onPress={() => setSelected(item)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.backgroundImage }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(5,10,30,0.2)', 'rgba(5,10,30,0.7)', 'rgba(5,10,30,0.95)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.cardContent}>
        <View style={styles.numberBadge}>
          <Text style={styles.numberText}>{item.number}</Text>
        </View>
        <Text style={styles.cardArabic}>{item.arabic}</Text>
        <Text style={styles.cardTranslit}>{item.transliteration}</Text>
        <Text style={styles.cardFrench} numberOfLines={2}>{item.french}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.8}>
            <ArrowLeft size={20} color={colors.textAccent} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>أَسْمَاءُ اللَّهِ الْحُسْنَى</Text>
            <Text style={[styles.headerSub, { color: colors.textAccent }]}>Les 99 Noms d'Allah</Text>
          </View>
          <View style={styles.backBtn} />
        </View>

        {/* Premium badge */}
        <View style={styles.premiumRow}>
          <Star size={13} color="#C9A84C" fill="#C9A84C" />
          <Text style={[styles.premiumLabel, { color: colors.textAccent }]}>Collection Exclusive Premium</Text>
          <Star size={13} color="#C9A84C" fill="#C9A84C" />
        </View>

        <FlatList
          data={ALLAH_NAMES}
          keyExtractor={(item) => String(item.number)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
        />
      </SafeAreaView>

      {/* Detail modal */}
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={[styles.detailRoot, { backgroundColor: colors.bg }]}>
            {/* Background image */}
            <Image
              source={{ uri: selected.backgroundImage }}
              style={[StyleSheet.absoluteFillObject, { height: 320 }]}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', colors.bg + 'CC', colors.bg]}
              style={[StyleSheet.absoluteFillObject, { height: 320 }]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
            />

            {/* Close button */}
            <SafeAreaView style={styles.detailSafe}>
              <TouchableOpacity
                onPress={() => setSelected(null)}
                style={styles.detailClose}
                activeOpacity={0.8}
              >
                <X size={20} color="#8A8FA8" />
              </TouchableOpacity>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.detailHero}>
                <View style={[styles.detailNumBadge, { borderColor: colors.borderAccent }]}>
                  <Text style={[styles.detailNum, { color: colors.textAccent }]}>{selected.number}</Text>
                </View>
                {/* Glow */}
                <View style={styles.detailGlow} />
                <Text style={[styles.detailArabic, { color: colors.textPrimary }]}>{selected.arabic}</Text>
                <Text style={[styles.detailTranslit, { color: colors.textAccent }]}>{selected.transliteration}</Text>
                <Text style={[styles.detailFrench, { color: colors.textSecondary }]}>{selected.french}</Text>
              </View>

              <View style={[styles.detailCard, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <View style={styles.detailDivider}>
                  <View style={[styles.detailLine, { backgroundColor: colors.borderAccent }]} />
                  <Text style={[styles.detailDivLabel, { color: colors.textMuted }]}>SIGNIFICATION PROFONDE</Text>
                  <View style={[styles.detailLine, { backgroundColor: colors.borderAccent }]} />
                </View>
                <Text style={[styles.detailMeaning, { color: colors.textSecondary }]}>{selected.meaning}</Text>
              </View>

              <View style={{ height: 60 }} />
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center', flex: 1 },
  headerTitle: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 22,
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  headerSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  premiumLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  row: {
    gap: 8,
    marginBottom: 8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#050A1E',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  numberBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C9A84C',
  },
  cardArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 22,
    color: '#F5EDD6',
    textAlign: 'center',
    writingDirection: 'rtl',
    textShadowColor: 'rgba(201,168,76,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 4,
  },
  cardTranslit: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  cardFrench: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(232,223,200,0.75)',
    textAlign: 'center',
    lineHeight: 14,
  },
  // Detail
  detailRoot: { flex: 1 },
  detailSafe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  detailClose: {
    alignSelf: 'flex-end',
    margin: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailScroll: {
    paddingTop: 200,
    paddingHorizontal: 24,
  },
  detailHero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  detailNumBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(201,168,76,0.1)',
  },
  detailNum: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
  },
  detailGlow: {
    position: 'absolute',
    top: 50,
    width: '80%',
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(201,168,76,0.08)',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  detailArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 52,
    textAlign: 'center',
    writingDirection: 'rtl',
    lineHeight: 80,
    textShadowColor: 'rgba(201,168,76,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 8,
  },
  detailTranslit: {
    fontFamily: 'Lato_700Bold',
    fontSize: 18,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  detailFrench: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  detailCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },
  detailDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  detailLine: {
    flex: 1,
    height: 1,
  },
  detailDivLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    letterSpacing: 2,
  },
  detailMeaning: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
