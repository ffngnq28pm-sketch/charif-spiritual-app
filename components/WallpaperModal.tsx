import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Smartphone, Download, Info } from 'lucide-react-native';
import { WisdomCard } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// iPhone 14 ratio 1170:2532 ≈ 9:19.5
const PREVIEW_W = Math.min(SCREEN_WIDTH - 80, 220);
const PREVIEW_H = PREVIEW_W * (2532 / 1170);

interface Props {
  visible: boolean;
  card: WisdomCard;
  onClose: () => void;
}

export function WallpaperModal({ visible, card, onClose }: Props) {
  const isNative = Platform.OS !== 'web';

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
          <Text style={styles.topTitle}>Fond d'écran</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionLabel}>APERÇU — FORMAT IPHONE 14</Text>
          <Text style={styles.resolution}>1170 × 2532 px</Text>

          {/* Phone frame preview */}
          <View style={styles.phoneFrame}>
            <View style={styles.phoneSpeaker} />
            <View style={[styles.previewWrap, { width: PREVIEW_W, height: PREVIEW_H }]}>
              <Image
                source={{ uri: card.backgroundImage }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(5,10,30,0.15)', 'rgba(5,10,30,0.5)', 'rgba(5,10,30,0.92)']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              <View style={styles.previewContent}>
                <Text style={styles.previewOrnament}>✦</Text>
                <View style={styles.previewGlow} />
                <Text style={styles.previewArabic}>{card.arabic}</Text>
                <View style={styles.previewDivider} />
                <Text style={styles.previewFrench} numberOfLines={3}>
                  "{card.french}"
                </Text>
                <Text style={styles.previewSource}>{card.source}</Text>
                <View style={styles.previewSpacer} />
                <Text style={styles.previewWatermark}>نور · Nour</Text>
              </View>
            </View>
            <View style={styles.phoneHome} />
          </View>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Info size={14} color="#C9A84C" />
            <Text style={styles.infoText}>
              {isNative
                ? "Appuyez sur \"Enregistrer\" pour sauvegarder en haute résolution dans votre photothèque, puis définissez-le comme fond d'écran depuis Réglages → Fond d'écran."
                : "La sauvegarde en photothèque nécessite un build natif (iOS/Android). Exportez l'app avec Expo pour activer cette fonctionnalité."}
            </Text>
          </View>

          {/* Action */}
          {isNative ? (
            <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
              <Download size={18} color="#050A1E" />
              <Text style={styles.saveBtnText}>Enregistrer dans Photos</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.webNote}>
              <Smartphone size={20} color="#C9A84C" />
              <Text style={styles.webNoteTitle}>Disponible sur iOS et Android</Text>
              <Text style={styles.webNoteBody}>
                Cette fonctionnalité exporte la carte en 1170×2532px et la sauvegarde directement dans votre photothèque avec un seul tap.
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
    paddingTop: 28,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    color: '#4A5068',
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  resolution: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#C9A84C',
    letterSpacing: 1,
    marginBottom: 24,
  },
  phoneFrame: {
    alignItems: 'center',
    backgroundColor: '#0E0E1A',
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 10,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
    marginBottom: 28,
  },
  phoneSpeaker: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 10,
  },
  previewWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewContent: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewOrnament: {
    color: '#C9A84C',
    fontSize: 10,
    marginBottom: 8,
  },
  previewGlow: {
    position: 'absolute',
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(201,168,76,0.10)',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  previewArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 16,
    color: '#F5EDD6',
    textAlign: 'center',
    lineHeight: 28,
    writingDirection: 'rtl',
    textShadowColor: 'rgba(201,168,76,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: 6,
  },
  previewDivider: {
    width: 28,
    height: 1,
    backgroundColor: 'rgba(201,168,76,0.4)',
    marginBottom: 8,
  },
  previewFrench: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    color: '#E8DFC8',
    textAlign: 'center',
    lineHeight: 14,
    fontStyle: 'italic',
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  previewSource: {
    fontFamily: 'Lato_400Regular',
    fontSize: 7,
    color: 'rgba(201,168,76,0.7)',
    letterSpacing: 0.5,
  },
  previewSpacer: { flex: 1 },
  previewWatermark: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 9,
    color: 'rgba(201,168,76,0.45)',
    alignSelf: 'flex-end',
  },
  phoneHome: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(201,168,76,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.15)',
    width: '100%',
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: 'rgba(201,168,76,0.7)',
    lineHeight: 18,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#C9A84C',
    width: '100%',
  },
  saveBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#050A1E',
  },
  webNote: {
    alignItems: 'center',
    gap: 10,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.2)',
    backgroundColor: 'rgba(201,168,76,0.04)',
    width: '100%',
  },
  webNoteTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 14,
    color: '#F5EDD6',
  },
  webNoteBody: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    color: '#8A8FA8',
    textAlign: 'center',
    lineHeight: 19,
  },
});
