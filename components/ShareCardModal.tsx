import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Share,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Share2, Download } from 'lucide-react-native';
import { WisdomCard } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = Math.min(SCREEN_WIDTH - 48, 420);

interface Props {
  visible: boolean;
  card: WisdomCard;
  onClose: () => void;
}

export function ShareCardModal({ visible, card, onClose }: Props) {
  async function handleShareText() {
    try {
      await Share.share({
        message: `${card.arabic}\n\n"${card.french}"\n— ${card.source}\n\n"${card.philosophy}"\n— ${card.philosophyAuthor}\n\n✦ Nour · نور`,
      });
    } catch {
      // ignore
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.75}>
            <X size={20} color="#8A8FA8" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Partager</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>APERÇU DE LA CARTE</Text>

          {/* 1:1 share card */}
          <View style={[styles.shareCard, { width: CARD_SIZE, height: CARD_SIZE }]}>
            <Image
              source={{ uri: card.backgroundImage }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
            {/* Deep gradient overlay */}
            <LinearGradient
              colors={[
                'rgba(5,10,30,0.30)',
                'rgba(5,10,30,0.55)',
                'rgba(5,10,30,0.85)',
                'rgba(5,10,30,0.96)',
              ]}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />

            {/* Content */}
            <View style={styles.shareContent}>
              {/* Top ornament */}
              <View style={styles.topOrnamentRow}>
                <View style={styles.ornamentLine} />
                <Text style={styles.ornamentStar}>✦</Text>
                <View style={styles.ornamentLine} />
              </View>

              {/* Theme badge */}
              <View style={styles.themeBadge}>
                <Text style={styles.themeText}>{card.theme.toUpperCase()}</Text>
              </View>

              {/* Arabic */}
              <Text style={styles.arabic}>{card.arabic}</Text>

              {/* Source */}
              <Text style={styles.source}>{card.source}</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* French */}
              <Text style={styles.french} numberOfLines={4}>
                "{card.french}"
              </Text>

              {/* Philosophy */}
              <Text style={styles.philosophy} numberOfLines={3}>
                {card.philosophy}
              </Text>
              <Text style={styles.author}>— {card.philosophyAuthor}</Text>
            </View>

            {/* Watermark */}
            <View style={styles.watermark}>
              <Text style={styles.watermarkText}>نور · Nour</Text>
            </View>
          </View>

          <Text style={styles.hint}>
            Partagez cette carte sur Instagram, WhatsApp ou toute autre plateforme.
          </Text>

          {/* Share actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShareText}
              activeOpacity={0.85}
            >
              <Share2 size={18} color="#050A1E" />
              <Text style={styles.shareBtnText}>Partager</Text>
            </TouchableOpacity>
          </View>

          {/* Note for native save */}
          {Platform.OS !== 'web' && (
            <View style={styles.nativeNote}>
              <Download size={14} color="#C9A84C" />
              <Text style={styles.nativeNoteText}>
                Pour sauvegarder en haute résolution (1080×1080px), exportez l'application en build natif avec expo-media-library.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050A1E',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#F5EDD6',
  },
  body: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: '#4A5068',
    letterSpacing: 2.5,
    marginBottom: 16,
  },
  shareCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#050A1E',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  shareContent: {
    flex: 1,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topOrnamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 12,
    gap: 10,
  },
  ornamentLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(201,168,76,0.35)',
  },
  ornamentStar: {
    color: '#C9A84C',
    fontSize: 12,
  },
  themeBadge: {
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.4)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 14,
  },
  themeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: '#C9A84C',
    letterSpacing: 2,
  },
  arabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 26,
    color: '#F5EDD6',
    textAlign: 'center',
    lineHeight: 44,
    writingDirection: 'rtl',
    textShadowColor: 'rgba(201,168,76,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
    marginBottom: 6,
  },
  source: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: 'rgba(201,168,76,0.75)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(201,168,76,0.35)',
    marginBottom: 14,
  },
  french: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    color: '#E8DFC8',
    textAlign: 'center',
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  philosophy: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: 'rgba(232,223,200,0.7)',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 6,
    paddingHorizontal: 12,
  },
  author: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 0.5,
  },
  watermark: {
    position: 'absolute',
    bottom: 12,
    right: 16,
  },
  watermarkText: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 12,
    color: 'rgba(201,168,76,0.5)',
    letterSpacing: 0.5,
  },
  hint: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#4A5068',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 24,
    lineHeight: 18,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#C9A84C',
  },
  shareBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#050A1E',
  },
  nativeNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.15)',
    width: '100%',
  },
  nativeNoteText: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: 'rgba(201,168,76,0.65)',
    lineHeight: 17,
  },
});
