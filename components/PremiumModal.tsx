import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Star, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

const FEATURES = [
  'Accès illimité à toutes les sagesses',
  'Nouvelles cartes chaque semaine',
  'Fond d\'écran haute résolution',
  'Filtres par thème et source',
  'Parcours spirituels thématiques',
];

export function PremiumModal({ visible, onClose, onUnlock }: Props) {
  const [selected, setSelected] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <LinearGradient
            colors={['#0D1B3E', '#0A1628']}
            style={styles.header}
          >
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color="#8A8FA8" />
            </TouchableOpacity>

            <View style={styles.badge}>
              <Star size={14} color="#C9A84C" fill="#C9A84C" />
              <Text style={styles.badgeText}>NOUR PREMIUM</Text>
            </View>

            <Text style={styles.headline}>Éveille ta lumière intérieure</Text>
            <Text style={styles.subheadline}>
              Accède à toute la bibliothèque de sagesses islamiques et philosophiques
            </Text>
          </LinearGradient>

          {/* Features */}
          <View style={styles.features}>
            {FEATURES.map((f) => (
              <View key={f} style={styles.featureRow}>
                <View style={styles.checkCircle}>
                  <Check size={12} color="#C9A84C" strokeWidth={3} />
                </View>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Plans */}
          <View style={styles.plans}>
            <TouchableOpacity
              style={[styles.plan, selected === 'yearly' && styles.planSelected]}
              onPress={() => setSelected('yearly')}
              activeOpacity={0.85}
            >
              {selected === 'yearly' && (
                <View style={styles.bestValue}>
                  <Text style={styles.bestValueText}>MEILLEURE OFFRE</Text>
                </View>
              )}
              <View style={styles.planContent}>
                <View>
                  <Text style={[styles.planTitle, selected === 'yearly' && styles.planTitleActive]}>
                    Annuel
                  </Text>
                  <Text style={styles.planSub}>1,25€ / mois</Text>
                </View>
                <Text style={[styles.planPrice, selected === 'yearly' && styles.planPriceActive]}>
                  14,99€
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.plan, selected === 'monthly' && styles.planSelected]}
              onPress={() => setSelected('monthly')}
              activeOpacity={0.85}
            >
              <View style={styles.planContent}>
                <View>
                  <Text style={[styles.planTitle, selected === 'monthly' && styles.planTitleActive]}>
                    Mensuel
                  </Text>
                  <Text style={styles.planSub}>Résiliable à tout moment</Text>
                </View>
                <Text style={[styles.planPrice, selected === 'monthly' && styles.planPriceActive]}>
                  2,99€
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={styles.cta}
            onPress={onUnlock}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#C9A84C', '#B8922E']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Débloquer Nour Premium</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.legal}>
            Paiement sécurisé · Annulation à tout moment
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0D1B3E',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    paddingBottom: 36,
  },
  header: {
    padding: 28,
    paddingTop: 32,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    color: '#C9A84C',
    letterSpacing: 2,
  },
  headline: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 26,
    color: '#F5EDD6',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheadline: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#8A8FA8',
    textAlign: 'center',
    lineHeight: 21,
  },
  features: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(201,168,76,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#C8D0E0',
  },
  plans: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  plan: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    overflow: 'hidden',
    paddingTop: 8,
  },
  planSelected: {
    borderColor: '#C9A84C',
    backgroundColor: 'rgba(201,168,76,0.08)',
  },
  bestValue: {
    backgroundColor: '#C9A84C',
    paddingVertical: 3,
    alignItems: 'center',
    marginBottom: 4,
  },
  bestValueText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 9,
    color: '#050A1E',
    letterSpacing: 1.5,
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  planTitle: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    color: '#8A8FA8',
    marginBottom: 2,
  },
  planTitleActive: {
    color: '#F5EDD6',
  },
  planSub: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#5A6070',
  },
  planPrice: {
    fontFamily: 'Amiri_700Bold',
    fontSize: 20,
    color: '#8A8FA8',
  },
  planPriceActive: {
    color: '#C9A84C',
  },
  cta: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    paddingVertical: 17,
    alignItems: 'center',
  },
  ctaText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 16,
    color: '#050A1E',
    letterSpacing: 0.3,
  },
  legal: {
    fontFamily: 'Lato_400Regular',
    fontSize: 11,
    color: '#5A6070',
    textAlign: 'center',
    marginTop: 12,
  },
});
