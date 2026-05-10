import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Search, BookOpen } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { SURAHS } from '@/data/surahs';
import { hasSurahText } from '@/data/surah_texts';

export default function SurahsScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<'all' | 'mecquoise' | 'médinoise'>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(text), 200);
  }, []);

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  const filtered = useMemo(() => SURAHS.filter((s) => {
    const matchesFilter = filter === 'all' || s.revelation === filter;
    const q = debouncedSearch.toLowerCase();
    const matchesSearch =
      !q ||
      s.french.toLowerCase().includes(q) ||
      s.transliteration.toLowerCase().includes(q) ||
      s.arabic.includes(debouncedSearch) ||
      String(s.number).includes(q);
    return matchesFilter && matchesSearch;
  }), [filter, debouncedSearch]);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>سور القرآن</Text>
          <Text style={[styles.headerSub, { color: colors.textAccent }]}>Les 114 Sourates</Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchRow, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
        <Search size={16} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Rechercher une sourate…"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={handleSearch}
          selectionColor={colors.textAccent}
        />
      </View>

      {/* Filter pills */}
      <View style={styles.pills}>
        {(['all', 'mecquoise', 'médinoise'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.pill,
              { borderColor: colors.border },
              filter === f && { backgroundColor: colors.textAccent, borderColor: colors.textAccent },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.pillText, { color: filter === f ? '#050A1E' : colors.textMuted }]}>
              {f === 'all' ? 'Toutes' : f === 'mecquoise' ? '🕋 Mecquoise' : '🕌 Médinoise'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(s) => String(s.number)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: s }) => {
          const hasText = hasSurahText(s.number);
          return (
            <TouchableOpacity
              style={[styles.surahRow, { backgroundColor: colors.bgCard, borderColor: hasText ? 'rgba(201,168,76,0.35)' : colors.border }]}
              onPress={() => router.push(`/surah-reader?number=${s.number}`)}
              activeOpacity={0.8}
            >
              <View style={[styles.numBadge, { backgroundColor: 'rgba(201,168,76,0.12)', borderColor: 'rgba(201,168,76,0.3)' }]}>
                <Text style={[styles.numText, { color: colors.textAccent }]}>{s.number}</Text>
              </View>
              <View style={styles.surahInfo}>
                <View style={styles.surahNameRow}>
                  <Text style={[styles.surahFrench, { color: colors.textPrimary }]}>{s.french}</Text>
                  <Text style={[styles.surahArabic, { color: colors.textAccent }]}>{s.arabic}</Text>
                </View>
                <Text style={[styles.surahMeta, { color: colors.textMuted }]}>
                  {s.transliteration} · {s.verses} versets · {s.revelation}
                </Text>
                <View style={styles.surahBottom}>
                  <Text style={[styles.surahTheme, { color: colors.textSecondary }]}>{s.theme}</Text>
                  {hasText && (
                    <View style={styles.readBadge}>
                      <BookOpen size={9} color="#C9A84C" />
                      <Text style={styles.readBadgeText}>Lecture</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>Aucune sourate trouvée</Text>
        }
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: { flex: 1, fontFamily: 'Lato_400Regular', fontSize: 14 },
  pills: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 12 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  list: { paddingHorizontal: 20, paddingBottom: 100, gap: 8 },
  surahRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 14,
  },
  numBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numText: { fontFamily: 'Lato_700Bold', fontSize: 14 },
  surahInfo: { flex: 1 },
  surahNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  surahFrench: { fontFamily: 'Lato_700Bold', fontSize: 15, flex: 1 },
  surahArabic: { fontFamily: 'Amiri_700Bold', fontSize: 20 },
  surahMeta: { fontFamily: 'Lato_400Regular', fontSize: 11, marginBottom: 2 },
  surahBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  surahTheme: { fontFamily: 'Lato_400Regular', fontSize: 11, fontStyle: 'italic' },
  readBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  readBadgeText: { fontFamily: 'Lato_700Bold', fontSize: 9, color: '#C9A84C' },
  empty: { textAlign: 'center', fontFamily: 'Lato_400Regular', fontSize: 14, marginTop: 60 },
});
