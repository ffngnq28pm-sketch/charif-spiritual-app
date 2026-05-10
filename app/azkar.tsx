import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { AZKAR_CATEGORIES, Dhikr } from '@/data/azkar';

function DhikrCard({ dhikr, colors }: { dhikr: Dhikr; colors: any }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setExpanded((e) => !e)}
      style={[styles.dhikrCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
    >
      {/* Header row */}
      <View style={styles.dhikrHeader}>
        <View style={[styles.repBadge, { backgroundColor: 'rgba(201,168,76,0.15)' }]}>
          <Text style={styles.repText}>×{dhikr.repetitions}</Text>
        </View>
        {expanded ? (
          <ChevronUp size={16} color={colors.textMuted} />
        ) : (
          <ChevronDown size={16} color={colors.textMuted} />
        )}
      </View>

      {/* Arabic — always visible */}
      <Text style={[styles.arabicText, { color: colors.textPrimary }]}>{dhikr.arabic}</Text>

      {/* French — always visible */}
      <Text style={[styles.frenchText, { color: colors.textSecondary }]} numberOfLines={expanded ? undefined : 2}>
        {dhikr.french}
      </Text>

      {/* Expanded: transliteration + source + virtue */}
      {expanded && (
        <View style={styles.dhikrExpanded}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.translitText, { color: colors.textAccent }]}>
            {dhikr.transliteration}
          </Text>
          <View style={styles.dhikrMeta}>
            <Text style={[styles.sourceText, { color: colors.textMuted }]}>📖 {dhikr.source}</Text>
            {dhikr.virtue && (
              <Text style={[styles.virtueText, { color: colors.textMuted }]}>✦ {dhikr.virtue}</Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function AzkarScreen() {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState(AZKAR_CATEGORIES[0].id);

  const category = AZKAR_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>الأذكار</Text>
          <Text style={[styles.headerSub, { color: colors.textAccent }]}>Dhikr & Douaas</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catScroll}
      >
        {AZKAR_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.catBtn,
                isActive
                  ? { backgroundColor: cat.color + '22', borderColor: cat.color }
                  : { borderColor: colors.border },
              ]}
            >
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.catLabel,
                  { color: isActive ? cat.color : colors.textMuted },
                ]}
                numberOfLines={1}
              >
                {cat.title.replace('Adhkar du ', '').replace('Avant de ', '').replace('Au ', '')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Category header */}
      <LinearGradient
        colors={[category.color + '18', 'transparent']}
        style={styles.catHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.catHeaderIcon]}>{category.icon}</Text>
        <View>
          <Text style={[styles.catHeaderArabic, { color: category.color }]}>
            {category.arabicTitle}
          </Text>
          <Text style={[styles.catHeaderTitle, { color: colors.textPrimary }]}>
            {category.title}
          </Text>
          <Text style={[styles.catHeaderDesc, { color: colors.textMuted }]}>
            {category.description}
          </Text>
        </View>
      </LinearGradient>

      {/* Dhikr list */}
      <FlatList
        key={activeCategory}
        data={category.azkar}
        keyExtractor={(d) => d.id}
        contentContainerStyle={styles.dhikrList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <DhikrCard dhikr={item} colors={colors} />}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontFamily: 'Amiri_700Bold', fontSize: 24, textAlign: 'center' },
  headerSub: { fontFamily: 'Lato_400Regular', fontSize: 12, textAlign: 'center', letterSpacing: 1 },
  catScroll: { paddingHorizontal: 20, paddingVertical: 8, gap: 8 },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  catIcon: { fontSize: 16 },
  catLabel: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
  },
  catHeaderIcon: { fontSize: 36 },
  catHeaderArabic: { fontFamily: 'Amiri_700Bold', fontSize: 20 },
  catHeaderTitle: { fontFamily: 'Lato_700Bold', fontSize: 15 },
  catHeaderDesc: { fontFamily: 'Lato_400Regular', fontSize: 12, marginTop: 2, fontStyle: 'italic' },
  dhikrList: { paddingHorizontal: 20, gap: 10 },
  dhikrCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  dhikrTop: {},
  dhikrHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  repBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  repText: { fontFamily: 'Lato_700Bold', fontSize: 13, color: '#C9A84C' },
  arabicText: { fontFamily: 'Amiri_400Regular', fontSize: 20, lineHeight: 36, textAlign: 'right' },
  dhikrExpanded: {},
  divider: { height: 1, marginVertical: 12 },
  translitText: { fontFamily: 'Lato_400Regular', fontSize: 13, fontStyle: 'italic', marginBottom: 8, lineHeight: 20 },
  frenchText: { fontFamily: 'Lato_400Regular', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  dhikrMeta: { gap: 4 },
  sourceText: { fontFamily: 'Lato_400Regular', fontSize: 11 },
  virtueText: { fontFamily: 'Lato_400Regular', fontSize: 11, fontStyle: 'italic' },
});
