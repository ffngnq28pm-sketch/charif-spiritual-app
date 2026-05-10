import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Heart, Star, Mail } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { usePremium } from '@/hooks/usePremium';

const TIPS = [
  {
    size: 'small' as const,
    emoji: '🌱',
    label: 'Petite offrande',
    price: '1,00€',
    desc: 'Un geste symbolique',
  },
  {
    size: 'medium' as const,
    emoji: '✨',
    label: 'Offrande généreuse',
    price: '3,00€',
    desc: 'Enrichir le contenu',
  },
  {
    size: 'large' as const,
    emoji: '🌟',
    label: 'Grande offrande',
    price: '5,00€',
    desc: "Bâtir l'héritage",
  },
];

export default function SupportScreen() {
  const { colors } = useTheme();
  const { purchaseTip, isLoading } = usePremium();
  const [donated, setDonated] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  async function handleTip(size: 'small' | 'medium' | 'large', price: string) {
    setActiveSize(size);
    const result = await purchaseTip(size);
    if (result.success) setDonated(price);
    setActiveSize(null);
  }

  const accent = '#C9A84C';

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={colors.statusBar} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <ChevronLeft size={22} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(201,168,76,0.1)' }]}>
              <Heart size={30} color={accent} fill="rgba(201,168,76,0.25)" />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Soutenir Nour</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>
              Aidez-nous à enrichir ce contenu spirituel et à préserver cet héritage de sagesse
              islamique et philosophique.
            </Text>

            <View style={[styles.verseBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
              <Text style={[styles.verseArabic, { color: accent }]}>
                وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ
              </Text>
              <Text style={[styles.verseFr, { color: colors.textMuted }]}>
                Fais le bien comme Allah t'a fait du bien. — Sourate Al-Qasas, 28:77
              </Text>
            </View>
          </View>

          {/* Success */}
          {donated && (
            <View style={[styles.successBox, { backgroundColor: 'rgba(201,168,76,0.08)', borderColor: 'rgba(201,168,76,0.3)' }]}>
              <Text style={[styles.successText, { color: accent }]}>
                ✦ Jazâka Allâhu khayran — Merci pour votre soutien de {donated}
              </Text>
            </View>
          )}

          {/* Tip grid */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>CHOISIR UNE OFFRANDE</Text>
          <View style={styles.tipGrid}>
            {TIPS.map((tip) => {
              const active = activeSize === tip.size;
              return (
                <TouchableOpacity
                  key={tip.size}
                  style={[
                    styles.tipCard,
                    {
                      backgroundColor: colors.bgSection,
                      borderColor: active ? accent : colors.border,
                      ...(active && { backgroundColor: 'rgba(201,168,76,0.07)' }),
                    },
                  ]}
                  onPress={() => handleTip(tip.size, tip.price)}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                  <Text style={[styles.tipPrice, { color: accent }]}>{tip.price}</Text>
                  <Text style={[styles.tipLabel, { color: colors.textSecondary }]}>{tip.label}</Text>
                  <Text style={[styles.tipDesc, { color: colors.textMuted }]}>{tip.desc}</Text>
                  {active && <ActivityIndicator color={accent} size="small" style={{ marginTop: 8 }} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Message */}
          <View style={[styles.msgBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
            <Star size={16} color={accent} fill="rgba(201,168,76,0.2)" />
            <Text style={[styles.msgText, { color: colors.textMuted }]}>
              Par votre générosité, nous continuons d'enrichir cette{' '}
              <Text style={{ color: colors.textSecondary, fontFamily: 'Lato_700Bold' }}>
                bibliothèque de sagesses
              </Text>
              {' '}et d'inviter des récitateurs de qualité.
            </Text>
          </View>

          {/* Contact */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>NOUS CONTACTER</Text>
          <TouchableOpacity
            style={[styles.contactBtn, { backgroundColor: colors.bgSection, borderColor: colors.border }]}
            onPress={() => Linking.openURL('mailto:support@nour-app.fr?subject=Nour%20-%20Retour%20utilisateur')}
            activeOpacity={0.8}
          >
            <Mail size={18} color={accent} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>Écrire à l'équipe</Text>
              <Text style={[styles.contactSub, { color: colors.textMuted }]}>support@nour-app.fr</Text>
            </View>
            <ChevronLeft size={16} color={colors.textMuted} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerArabic, { color: 'rgba(201,168,76,0.25)' }]}>نور</Text>
            <Text style={[styles.footerText, { color: colors.textMuted }]}>
              Que ce projet soit une Sadaqa Jariya — une aumône continue
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: 60, paddingTop: 8 },
  backBtn: {
    marginLeft: 14,
    marginBottom: 4,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  iconBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 18,
  },
  verseBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    width: '100%',
  },
  verseArabic: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  verseFr: {
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  successBox: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  successText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  tipGrid: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tipCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
  },
  tipEmoji: { fontSize: 26, marginBottom: 8 },
  tipPrice: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 22,
    marginBottom: 4,
  },
  tipLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 4,
  },
  tipDesc: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  msgBox: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  msgText: {
    flex: 1,
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
    lineHeight: 20,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  contactTitle: { fontFamily: 'Lato_700Bold', fontSize: 14, marginBottom: 2 },
  contactSub: { fontFamily: 'Lato_400Regular', fontSize: 12 },
  footer: { alignItems: 'center', gap: 8 },
  footerArabic: { fontFamily: 'Amiri_700Bold', fontSize: 36 },
  footerText: {
    fontFamily: 'Lato_400Regular',
    fontStyle: 'italic',
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 18,
  },
});
