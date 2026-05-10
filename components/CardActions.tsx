import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Heart, Share2, Image as ImageIcon } from 'lucide-react-native';
import { WisdomCard } from '@/types';
import { ShareCardModal } from './ShareCardModal';
import { WallpaperModal } from './WallpaperModal';

interface Props {
  card: WisdomCard;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export function CardActions({ card, isFavorite, onFavoriteToggle }: Props) {
  const [shareVisible, setShareVisible] = useState(false);
  const [wallpaperVisible, setWallpaperVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {/* Favorite */}
        <TouchableOpacity
          style={[styles.btn, isFavorite && styles.btnActive]}
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
            onFavoriteToggle();
          }}
          activeOpacity={0.75}
        >
          <Heart
            size={17}
            color={isFavorite ? '#C9A84C' : '#8A8FA8'}
            fill={isFavorite ? '#C9A84C' : 'transparent'}
          />
          <Text style={[styles.btnLabel, isFavorite && styles.btnLabelActive]}>
            {isFavorite ? 'Sauvegardé' : 'Favoris'}
          </Text>
        </TouchableOpacity>

        {/* Share image */}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => setShareVisible(true)}
          activeOpacity={0.8}
        >
          <Share2 size={17} color="#050A1E" />
          <Text style={styles.btnPrimaryLabel}>Partager</Text>
        </TouchableOpacity>

        {/* Wallpaper */}
        <TouchableOpacity
          style={styles.btnWallpaper}
          onPress={() => setWallpaperVisible(true)}
          activeOpacity={0.8}
        >
          <ImageIcon size={17} color="#C9A84C" />
        </TouchableOpacity>
      </View>

      <ShareCardModal
        visible={shareVisible}
        card={card}
        onClose={() => setShareVisible(false)}
      />
      <WallpaperModal
        visible={wallpaperVisible}
        card={card}
        onClose={() => setWallpaperVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(138,143,168,0.3)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  btnActive: {
    borderColor: 'rgba(201,168,76,0.5)',
    backgroundColor: 'rgba(201,168,76,0.08)',
  },
  btnLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#8A8FA8',
  },
  btnLabelActive: { color: '#C9A84C' },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#C9A84C',
  },
  btnPrimaryLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#050A1E',
  },
  btnWallpaper: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.35)',
    backgroundColor: 'rgba(201,168,76,0.06)',
  },
});
