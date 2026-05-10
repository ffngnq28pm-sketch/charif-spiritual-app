import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Heart } from 'lucide-react-native';
import { WisdomCard } from '@/types';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

interface Props {
  card: WisdomCard;
  isPremium: boolean;
  isFavorite: boolean;
  onPress: () => void;
  onFavoriteToggle?: () => void;
}

function CardThumbnailBase({ card, isPremium, isFavorite, onPress, onFavoriteToggle }: Props) {
  const locked = card.premium && !isPremium;

  return (
    <TouchableOpacity
      style={[styles.card, { width: CARD_W }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: card.backgroundImage }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(5,10,30,0.88)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 1 }}
      />

      {locked && (
        <View style={styles.lockOverlay}>
          <View style={styles.lockBadge}>
            <Lock size={14} color="#C9A84C" />
          </View>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.arabic} numberOfLines={2}>
          {card.arabic}
        </Text>
        <Text style={styles.source} numberOfLines={1}>
          {card.source}
        </Text>
      </View>

      {onFavoriteToggle && (
        <TouchableOpacity style={styles.heartBtn} onPress={onFavoriteToggle}>
          <Heart
            size={16}
            color={isFavorite ? '#C9A84C' : 'rgba(255,255,255,0.5)'}
            fill={isFavorite ? '#C9A84C' : 'transparent'}
          />
        </TouchableOpacity>
      )}

      <View style={styles.themeBadge}>
        <Text style={styles.themeText}>{card.theme}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0D1B3E',
    marginBottom: 12,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,10,30,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(201,168,76,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  arabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 14,
    color: '#F5EDD6',
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: 4,
  },
  source: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 0.5,
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(5,10,30,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(5,10,30,0.6)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  themeText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(245,237,214,0.7)',
    letterSpacing: 0.3,
  },
});

export const CardThumbnail = React.memo(CardThumbnailBase);
