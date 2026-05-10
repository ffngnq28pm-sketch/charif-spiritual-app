import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WisdomCard as WisdomCardType } from '@/types';
import { AudioButton } from '@/components/AudioButton';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.72;

interface Props {
  card: WisdomCardType;
  compact?: boolean;
}

export function WisdomCard({ card, compact = false }: Props) {
  const cardH = compact ? height * 0.44 : CARD_HEIGHT;

  return (
    <View style={[styles.card, { height: cardH }]}>
      <Image
        source={{ uri: card.backgroundImage }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(5,10,30,0.45)', 'rgba(5,10,30,0.72)', 'rgba(5,10,30,0.92)']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={[styles.content, compact && styles.contentCompact]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ornament */}
        <Text style={styles.ornament}>✦</Text>

        {/* Arabic glow halo */}
        <View style={styles.arabicGlowWrap}>
          <View style={styles.arabicGlow} />
          <Text style={[styles.arabic, compact && styles.arabicCompact]}>
            {card.arabic}
          </Text>
        </View>

        {/* Source */}
        <View style={styles.sourceBadge}>
          <Text style={styles.sourceText}>{card.source}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* French translation */}
        <Text style={[styles.french, compact && styles.frenchCompact]}>
          {card.french}
        </Text>

        {/* Audio buttons for Quran / Hadith */}
        {(card.sourceType === 'Coran' || card.sourceType === 'Hadith') && (
          <View style={styles.audioRow}>
            <AudioButton
              arabic={card.arabic}
              french={card.french}
              sourceType={card.sourceType}
              source={card.source}
              compact={compact}
            />
          </View>
        )}

        {/* Philosophy quote */}
        {card.philosophy ? (
          <>
            <View style={styles.philosophyDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerLabel}>PHILOSOPHIE</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={[styles.philosophy, compact && styles.philosophyCompact]}>
              "{card.philosophy}"
            </Text>
            {card.philosophyAuthor ? (
              <Text style={styles.author}>— {card.philosophyAuthor}</Text>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#050A1E',
  },
  content: {
    padding: 28,
    paddingTop: 20,
    alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'center',
  },
  contentCompact: {
    padding: 20,
    paddingTop: 16,
  },
  ornament: {
    color: '#C9A84C',
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 8,
  },
  arabicGlowWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    width: '100%',
  },
  arabicGlow: {
    position: 'absolute',
    width: '90%',
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(201,168,76,0.13)',
    shadowColor: '#C9A84C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 32,
    elevation: 0,
  },
  arabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 39,
    color: '#F5EDD6',
    textAlign: 'center',
    lineHeight: 68,
    writingDirection: 'rtl',
    textShadowColor: 'rgba(201,168,76,0.45)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  arabicCompact: {
    fontSize: 29,
    lineHeight: 50,
  },
  sourceBadge: {
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.5)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 18,
  },
  sourceText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#C9A84C',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  divider: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(201,168,76,0.4)',
    marginBottom: 18,
  },
  french: {
    fontFamily: 'Lato_400Regular',
    fontSize: 17,
    color: '#E8DFC8',
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  frenchCompact: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  philosophyDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 2,
  },
  philosophy: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: 'rgba(232,223,200,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  philosophyCompact: {
    fontSize: 12,
    lineHeight: 18,
  },
  author: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    color: '#C9A84C',
    letterSpacing: 0.8,
  },
  audioRow: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
