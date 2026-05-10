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
import { ArrowLeft, X, Star, MapPin, Calendar } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import { ISLAMIC_THINKERS, IslamicThinker } from '@/data/islamicThinkers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <View style={sectionHeaderStyle}>
      <View style={[sectionBarStyle, { backgroundColor: accent }]} />
      <Text style={[sectionLabelStyle, { color: accent + 'CC' }]}>{label}</Text>
    </View>
  );
}
const sectionHeaderStyle = { flexDirection: 'row' as const, alignItems: 'center' as const, gap: 8, marginBottom: 14 };
const sectionBarStyle = { width: 3, height: 16, borderRadius: 2 };
const sectionLabelStyle = { fontFamily: 'Lato_700Bold' as const, fontSize: 10, letterSpacing: 1.8 };

export default function IslamicThinkersScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [selected, setSelected] = useState<IslamicThinker | null>(null);

  const renderItem = ({ item }: { item: IslamicThinker }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.bgCard, borderColor: item.colorAccent + '40' }]}
      onPress={() => setSelected(item)}
      activeOpacity={0.88}
    >
      {/* Background image with gradient */}
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: item.backgroundImage }} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', colors.bgCard]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
        />
        {/* Decorative glyph portrait */}
        <View style={[styles.glyphWrap, { backgroundColor: item.colorAccent + '22', borderColor: item.colorAccent + '50' }]}>
          <Text style={[styles.glyph, { color: item.colorAccent }]}>{item.portraitGlyph}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {/* Field tags */}
        <View style={styles.fieldRow}>
          {item.fields.slice(0, 2).map((f) => (
            <View key={f} style={[styles.fieldPill, { backgroundColor: item.colorAccent + '18', borderColor: item.colorAccent + '40' }]}>
              <Text style={[styles.fieldPillText, { color: item.colorAccent }]}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Name */}
        <Text style={[styles.nameArabic, { color: colors.textPrimary }]}>{item.nameArabic}</Text>
        <Text style={[styles.nameFrench, { color: item.colorAccent }]}>{item.nameFrench}</Text>
        <Text style={[styles.nameLatin, { color: colors.textMuted }]}>{item.nameLatin}</Text>

        {/* Dates & origin */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={11} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{item.born} — {item.died}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={11} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]} numberOfLines={1}>{item.origin}</Text>
          </View>
        </View>

        {/* Quote preview */}
        <View style={[styles.quotePreview, { borderLeftColor: item.colorAccent }]}>
          <Text style={[styles.quotePreviewText, { color: colors.textSecondary }]} numberOfLines={2}>
            "{item.quoteFrench}"
          </Text>
        </View>
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
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
              {t.thinkers}
            </Text>
            <Text style={[styles.headerSub, { color: colors.textAccent }]}>
              Les Grands Penseurs de l'Islam
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Premium badge */}
        <View style={styles.premiumRow}>
          <Star size={13} color={colors.textAccent} fill={colors.textAccent} />
          <Text style={[styles.premiumLabel, { color: colors.textAccent }]}>{t.exclusivePremium}</Text>
          <Star size={13} color={colors.textAccent} fill={colors.textAccent} />
        </View>

        <FlatList
          data={ISLAMIC_THINKERS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </SafeAreaView>

      {/* Detail Modal */}
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <View style={[styles.detailRoot, { backgroundColor: colors.bg }]}>
            {/* Hero image */}
            <View style={styles.detailHeroWrap}>
              <Image source={{ uri: selected.backgroundImage }} style={styles.detailHeroImg} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', colors.bg]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0.4 }}
                end={{ x: 0, y: 1 }}
              />
              {/* Large glyph portrait */}
              <View style={styles.detailHeroOverlay}>
                <View style={[styles.detailGlyphWrap, { backgroundColor: selected.colorAccent + '20', borderColor: selected.colorAccent + '60' }]}>
                  <View style={[styles.detailGlow, { backgroundColor: selected.colorAccent }]} />
                  <Text style={[styles.detailGlyph, { color: selected.colorAccent }]}>{selected.portraitGlyph}</Text>
                </View>
              </View>
            </View>

            {/* Close */}
            <SafeAreaView style={styles.detailCloseSafe}>
              <TouchableOpacity onPress={() => setSelected(null)} style={[styles.closeBtn, { backgroundColor: 'rgba(0,0,0,0.5)' }]} activeOpacity={0.8}>
                <X size={20} color="#F5EDD6" />
              </TouchableOpacity>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.detailScroll} showsVerticalScrollIndicator={false}>
              {/* Name block */}
              <View style={styles.detailNameBlock}>
                <View style={styles.fieldRowDetail}>
                  {selected.fields.map((f) => (
                    <View key={f} style={[styles.fieldPill, { backgroundColor: selected.colorAccent + '20', borderColor: selected.colorAccent + '50' }]}>
                      <Text style={[styles.fieldPillText, { color: selected.colorAccent }]}>{f}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.detailNameArabic, { color: colors.textPrimary }]}>{selected.nameArabic}</Text>
                <Text style={[styles.detailNameFrench, { color: selected.colorAccent }]}>{selected.nameFrench}</Text>
                <Text style={[styles.detailNameLatin, { color: colors.textMuted }]}>{selected.nameLatin}</Text>

                <View style={styles.detailMetaRow}>
                  <View style={[styles.detailMetaChip, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                    <Calendar size={12} color={colors.textMuted} />
                    <Text style={[styles.detailMetaText, { color: colors.textSecondary }]}>{selected.born} – {selected.died}</Text>
                  </View>
                  <View style={[styles.detailMetaChip, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                    <MapPin size={12} color={colors.textMuted} />
                    <Text style={[styles.detailMetaText, { color: colors.textSecondary }]}>{selected.origin}</Text>
                  </View>
                </View>
              </View>

              {/* Citation */}
              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="CITATION CÉLÈBRE" accent={selected.colorAccent} />
                <Text style={[styles.detailQuoteArabic, { color: colors.textPrimary }]}>{selected.quoteArabic}</Text>
                <View style={[styles.quoteDivider, { backgroundColor: selected.colorAccent + '40' }]} />
                <Text style={[styles.detailQuoteFrench, { color: colors.textSecondary }]}>"{selected.quoteFrench}"</Text>
              </View>

              {/* Biographie */}
              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="BIOGRAPHIE" accent={selected.colorAccent} />
                {selected.biography.split('\n\n').map((para, i) => (
                  <Text key={i} style={[styles.detailBody, { color: colors.textSecondary, marginBottom: i < selected.biography.split('\n\n').length - 1 ? 10 : 0 }]}>
                    {para}
                  </Text>
                ))}
              </View>

              {/* Œuvres majeures */}
              {selected.majorWorks.length > 0 && (
                <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                  <SectionHeader label="ŒUVRES MAJEURES" accent={selected.colorAccent} />
                  {selected.majorWorks.map((w, i) => (
                    <View key={i} style={[styles.workItem, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 12, paddingTop: 12 }]}>
                      <View style={styles.workHeader}>
                        <Text style={[styles.workTitle, { color: colors.textPrimary }]}>{w.title}</Text>
                        <View style={[styles.workYearBadge, { backgroundColor: selected.colorAccent + '20', borderColor: selected.colorAccent + '40' }]}>
                          <Text style={[styles.workYear, { color: selected.colorAccent }]}>{w.year}</Text>
                        </View>
                      </View>
                      <Text style={[styles.workDesc, { color: colors.textMuted }]}>{w.desc}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Idées clés */}
              {selected.keyIdeas.length > 0 && (
                <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                  <SectionHeader label="IDÉES CLÉS" accent={selected.colorAccent} />
                  {selected.keyIdeas.map((idea, i) => (
                    <View key={i} style={styles.ideaRow}>
                      <View style={[styles.ideaDot, { backgroundColor: selected.colorAccent }]} />
                      <Text style={[styles.ideaText, { color: colors.textSecondary }]}>{idea}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Héritage */}
              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="HÉRITAGE" accent={selected.colorAccent} />
                <Text style={[styles.detailBody, { color: colors.textSecondary }]}>{selected.legacy}</Text>
              </View>

              {/* Influence */}
              <View style={[styles.detailSection, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
                <SectionHeader label="INFLUENCE SUR LE MONDE" accent={selected.colorAccent} />
                <Text style={[styles.detailBody, { color: colors.textSecondary }]}>{selected.influence}</Text>
              </View>

              {/* Le saviez-vous */}
              <View style={[styles.didYouKnow, { backgroundColor: selected.colorAccent + '12', borderColor: selected.colorAccent + '35' }]}>
                <Text style={[styles.didYouKnowLabel, { color: selected.colorAccent }]}>LE SAVIEZ-VOUS ?</Text>
                <Text style={[styles.didYouKnowText, { color: colors.textSecondary }]}>{selected.didYouKnow}</Text>
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
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center', flex: 1 },
  headerTitle: { fontFamily: 'Amiri_700Bold', fontSize: 20, textAlign: 'center' },
  headerSub: { fontFamily: 'Lato_400Regular', fontSize: 11, letterSpacing: 0.5, marginTop: 2 },
  premiumRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginBottom: 16,
  },
  premiumLabel: { fontFamily: 'Lato_700Bold', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  // Card
  card: {
    borderRadius: 20, borderWidth: 1, overflow: 'hidden',
  },
  cardImageWrap: { height: 160, position: 'relative' },
  cardImage: { ...StyleSheet.absoluteFillObject },
  glyphWrap: {
    position: 'absolute', bottom: 12, right: 16,
    width: 56, height: 56, borderRadius: 28, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  glyph: { fontFamily: 'Amiri_700Bold', fontSize: 32 },
  cardBody: { padding: 18, paddingTop: 12 },
  fieldRow: { flexDirection: 'row', gap: 6, marginBottom: 10, flexWrap: 'wrap' },
  fieldPill: {
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 12, borderWidth: 1,
  },
  fieldPillText: { fontFamily: 'Lato_700Bold', fontSize: 10, letterSpacing: 0.5 },
  nameArabic: { fontFamily: 'Amiri_700Bold', fontSize: 22, writingDirection: 'rtl', marginBottom: 2 },
  nameFrench: { fontFamily: 'Lato_700Bold', fontSize: 16, marginBottom: 2 },
  nameLatin: { fontFamily: 'Lato_400Regular', fontSize: 12, fontStyle: 'italic', marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  metaText: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  quotePreview: { borderLeftWidth: 2, paddingLeft: 12 },
  quotePreviewText: { fontFamily: 'Lato_400Regular', fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  // Detail
  detailRoot: { flex: 1 },
  detailHeroWrap: { height: 280, position: 'relative' },
  detailHeroImg: { ...StyleSheet.absoluteFillObject },
  detailHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20,
  },
  detailGlyphWrap: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  detailGlow: {
    position: 'absolute', width: '100%', height: '100%', opacity: 0.15,
  },
  detailGlyph: { fontFamily: 'Amiri_700Bold', fontSize: 62 },
  detailCloseSafe: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  closeBtn: {
    alignSelf: 'flex-end', margin: 16,
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  detailScroll: { paddingTop: 8, paddingHorizontal: 20 },
  detailNameBlock: { alignItems: 'center', marginBottom: 20 },
  fieldRowDetail: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap', justifyContent: 'center' },
  detailNameArabic: { fontFamily: 'Amiri_700Bold', fontSize: 36, writingDirection: 'rtl', textAlign: 'center', marginBottom: 4 },
  detailNameFrench: { fontFamily: 'Lato_700Bold', fontSize: 22, marginBottom: 4 },
  detailNameLatin: { fontFamily: 'Lato_400Regular', fontSize: 14, fontStyle: 'italic', marginBottom: 14 },
  detailMetaRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  detailMetaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1,
  },
  detailMetaText: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  detailSection: {
    borderRadius: 16, borderWidth: 1, padding: 18, marginBottom: 14,
  },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionAccentBar: { width: 3, height: 16, borderRadius: 2 },
  sectionTitle: { fontFamily: 'Lato_400Regular', fontSize: 10, letterSpacing: 2 },
  detailQuoteArabic: {
    fontFamily: 'Amiri_700Bold', fontSize: 20, lineHeight: 36,
    writingDirection: 'rtl', textAlign: 'center', marginBottom: 10,
  },
  quoteDivider: { height: 1, marginHorizontal: 40, marginBottom: 10 },
  detailQuoteFrench: {
    fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22,
    fontStyle: 'italic', textAlign: 'center',
  },
  detailBody: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 24 },
  workItem: {},
  workHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6, gap: 8 },
  workTitle: { fontFamily: 'Lato_700Bold', fontSize: 13, flex: 1, lineHeight: 18 },
  workYearBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  workYear: { fontFamily: 'Lato_700Bold', fontSize: 10, letterSpacing: 0.5 },
  workDesc: { fontFamily: 'Lato_400Regular', fontSize: 12, lineHeight: 18 },
  ideaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  ideaDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  ideaText: { fontFamily: 'Lato_400Regular', fontSize: 13, lineHeight: 20, flex: 1 },
  didYouKnow: { borderRadius: 16, borderWidth: 1, padding: 18, marginBottom: 14 },
  didYouKnowLabel: { fontFamily: 'Lato_700Bold', fontSize: 9, letterSpacing: 2, marginBottom: 10 },
  didYouKnowText: { fontFamily: 'Lato_400Regular', fontSize: 13, lineHeight: 21, fontStyle: 'italic' },
});
