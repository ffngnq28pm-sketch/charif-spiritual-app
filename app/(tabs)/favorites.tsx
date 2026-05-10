import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { X, Heart } from 'lucide-react-native';
import { CardThumbnail } from '@/components/CardThumbnail';
import { WisdomCard } from '@/components/WisdomCard';
import { CardActions } from '@/components/CardActions';
import { useFavorites } from '@/hooks/useFavorites';
import { usePremium } from '@/hooks/usePremium';
import { useTheme } from '@/context/ThemeContext';
import { CARDS } from '@/data/cards';
import { WisdomCard as WisdomCardType } from '@/types';

export default function FavoritesScreen() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { isPremium } = usePremium();
  const { colors } = useTheme();
  const [selectedCard, setSelectedCard] = useState<WisdomCardType | null>(null);

  const favoriteCards = CARDS.filter((c) => favoriteIds.has(c.id));
  const left = favoriteCards.filter((_, i) => i % 2 === 0);
  const right = favoriteCards.filter((_, i) => i % 2 === 1);

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Favoris</Text>
          {favoriteCards.length > 0 && (
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              {favoriteCards.length} sagesse{favoriteCards.length > 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {favoriteCards.length === 0 ? (
          <View style={styles.empty}>
            <View style={[styles.emptyIcon, { borderColor: 'rgba(201,168,76,0.25)', backgroundColor: 'rgba(201,168,76,0.1)' }]}>
              <Heart size={32} color="#C9A84C" />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Aucun favori</Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              Touchez le cœur d'une sagesse pour la retrouver ici, à tout moment.
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.column}>
              {left.map((card) => (
                <CardThumbnail
                  key={card.id}
                  card={card}
                  isPremium={isPremium}
                  isFavorite
                  onPress={() => setSelectedCard(card)}
                  onFavoriteToggle={() => toggleFavorite(card.id)}
                />
              ))}
            </View>
            <View style={[styles.column, styles.columnOffset]}>
              {right.map((card) => (
                <CardThumbnail
                  key={card.id}
                  card={card}
                  isPremium={isPremium}
                  isFavorite
                  onPress={() => setSelectedCard(card)}
                  onFavoriteToggle={() => toggleFavorite(card.id)}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>

      <Modal
        visible={!!selectedCard}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { backgroundColor: colors.bgCard }]}>
            <TouchableOpacity
              style={[styles.modalClose, { backgroundColor: 'rgba(255,255,255,0.08)' }]}
              onPress={() => setSelectedCard(null)}
            >
              <X size={20} color="#8A8FA8" />
            </TouchableOpacity>
            {selectedCard && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <WisdomCard card={selectedCard} />
                <View style={{ height: 16 }} />
                <CardActions
                  card={selectedCard}
                  isFavorite={favoriteIds.has(selectedCard.id)}
                  onFavoriteToggle={() => toggleFavorite(selectedCard.id)}
                />
                <View style={{ height: 40 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  title: { fontFamily: 'Amiri_700Bold', fontSize: 28 },
  subtitle: { fontFamily: 'Lato_400Regular', fontSize: 13 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: { fontFamily: 'Amiri_700Bold', fontSize: 22 },
  emptyText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 8,
  },
  column: { flex: 1 },
  columnOffset: { marginTop: 28 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalSheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: '93%',
  },
  modalClose: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
