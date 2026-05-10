import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useIslamicCalendar } from '@/hooks/useIslamicCalendar';

const PERIOD_LABELS: Record<string, string> = {
  muharram: 'Mois de Muharram',
  rajab: 'Mois de Rajab',
  'pre-ramadan': 'Avant le Ramadan',
  ramadan: 'Ramadan Mubarak',
  'eid-fitr': 'Aïd al-Fitr',
  'dhu-hijjah': 'Dhu al-Hijjah',
  'eid-adha': 'Aïd al-Adha',
  normal: '',
};

export function IslamicCalendarWidget() {
  const { colors } = useTheme();
  const { hijri, lunarPhase, period, nextEvent } = useIslamicCalendar();
  const [expanded, setExpanded] = useState(false);

  const periodLabel = PERIOD_LABELS[period];

  const today = new Date();
  const gregStr = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.bgSection, borderColor: colors.border }]}
      onPress={() => setExpanded((v) => !v)}
      activeOpacity={0.85}
    >
      <View style={styles.row}>
        {/* Lunar phase */}
        <Text style={styles.moonEmoji}>{lunarPhase.emoji}</Text>

        {/* Hijri date */}
        <View style={styles.dateBlock}>
          <Text style={[styles.gregDate, { color: colors.textMuted }]}>
            🗓️ {gregStr}
          </Text>
          <Text style={[styles.hijriDay, { color: colors.textPrimary }]}>
            🌙 {hijri.day} {hijri.monthName}
          </Text>
          <Text style={[styles.hijriYear, { color: colors.textMuted }]}>
            {hijri.year} H
          </Text>
        </View>

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        {/* Next event or period label */}
        <View style={styles.eventBlock}>
          {nextEvent ? (
            <>
              <Text style={[styles.eventName, { color: colors.textAccent }]} numberOfLines={1}>
                {nextEvent.name}
              </Text>
              <Text style={[styles.eventDays, { color: colors.textMuted }]}>
                dans {nextEvent.daysLeft} jour{nextEvent.daysLeft > 1 ? 's' : ''}
              </Text>
            </>
          ) : periodLabel ? (
            <Text style={[styles.eventName, { color: colors.textAccent }]} numberOfLines={1}>
              {periodLabel}
            </Text>
          ) : (
            <Text style={[styles.eventDays, { color: colors.textMuted }]}>
              {lunarPhase.label}
            </Text>
          )}
        </View>

        {/* Chevron */}
        <ChevronDown
          size={14}
          color={colors.textMuted}
          style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
        />
      </View>

      {expanded && (
        <View style={[styles.expandedRow, { borderTopColor: colors.border }]}>
          <View style={styles.expandedItem}>
            <Text style={[styles.expandedLabel, { color: colors.textMuted }]}>Phase lunaire</Text>
            <Text style={[styles.expandedValue, { color: colors.textPrimary }]}>
              {lunarPhase.emoji} {lunarPhase.label}
            </Text>
          </View>
          {periodLabel ? (
            <View style={styles.expandedItem}>
              <Text style={[styles.expandedLabel, { color: colors.textMuted }]}>Période</Text>
              <Text style={[styles.expandedValue, { color: colors.textAccent }]}>{periodLabel}</Text>
            </View>
          ) : null}
          {nextEvent && (
            <View style={styles.expandedItem}>
              <Text style={[styles.expandedLabel, { color: colors.textMuted }]}>Prochain événement</Text>
              <Text style={[styles.expandedValue, { color: colors.textPrimary }]}>
                {nextEvent.name} — {nextEvent.daysLeft}j
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moonEmoji: {
    fontSize: 20,
  },
  dateBlock: {
    gap: 1,
  },
  gregDate: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
  },
  hijriDay: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    letterSpacing: 0.2,
  },
  hijriYear: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
  },
  separator: {
    width: 1,
    height: 28,
  },
  eventBlock: {
    flex: 1,
    gap: 1,
  },
  eventName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  eventDays: {
    fontFamily: 'Lato_400Regular',
    fontSize: 10,
  },
  expandedRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  expandedItem: {
    gap: 2,
    minWidth: 120,
  },
  expandedLabel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  expandedValue: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
  },
});
