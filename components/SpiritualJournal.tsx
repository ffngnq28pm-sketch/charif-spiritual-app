import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { JournalEntry } from '@/hooks/usePractice';

const JOURNAL_QUESTIONS = [
  "Qu'est-ce qui m'a rapproché d'Allah aujourd'hui ?",
  "Une chose pour laquelle je suis reconnaissant envers Allah",
  "Une action que je veux améliorer pour Allah",
  "Comment j'ai ressenti la présence d'Allah ?",
  "Un verset qui m'a touché aujourd'hui",
  "Ma prière du soir à Allah",
];

function formatIslamicDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

interface Props {
  entries: JournalEntry[];
  onAdd: (e: Omit<JournalEntry, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function SpiritualJournal({ entries, onAdd, onDelete }: Props) {
  const { colors } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibleEntries = showAll ? entries.slice(0, 10) : entries.slice(0, 3);

  const handleAdd = () => {
    if (!answer.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    onAdd({
      date: today,
      question: JOURNAL_QUESTIONS[selectedQuestion],
      answer: answer.trim(),
    });
    setModalVisible(false);
    setAnswer('');
    setSelectedQuestion(0);
  };

  const handleDelete = (id: string, question: string) => {
    Alert.alert(
      'Supprimer',
      `Supprimer cette entrée ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  return (
    <View>
      {/* Entries list */}
      {visibleEntries.length === 0 ? (
        <View style={[styles.emptyBox, { backgroundColor: colors.bgSection, borderColor: colors.border }]}>
          <Text style={styles.emptyEmoji}>📔</Text>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            Ton journal spirituel est vide.{'\n'}Commence à écrire pour Allah.
          </Text>
        </View>
      ) : (
        visibleEntries.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <TouchableOpacity
              key={entry.id}
              style={[styles.entryCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
              onPress={() => setExpandedId(isExpanded ? null : entry.id)}
              onLongPress={() => handleDelete(entry.id, entry.question)}
              activeOpacity={0.8}
            >
              <View style={styles.entryHeader}>
                <Text style={[styles.entryDate, { color: colors.textAccent }]}>
                  {formatIslamicDate(entry.date)}
                </Text>
                <Text style={[styles.expandIcon, { color: colors.textMuted }]}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </View>
              <Text
                style={[styles.entryQuestion, { color: colors.textSecondary }]}
                numberOfLines={isExpanded ? undefined : 1}
              >
                {entry.question}
              </Text>
              {isExpanded && (
                <View style={[styles.entryAnswerBox, { borderTopColor: colors.border }]}>
                  <Text style={[styles.entryAnswer, { color: colors.textPrimary }]}>{entry.answer}</Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(entry.id, entry.question)}
                    style={styles.deleteBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.deleteBtnText, { color: '#E07070' }]}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })
      )}

      {/* Actions row */}
      <View style={styles.actionsRow}>
        {entries.length > 3 && (
          <TouchableOpacity
            style={[styles.viewAllBtn, { borderColor: colors.border }]}
            onPress={() => setShowAll(!showAll)}
            activeOpacity={0.7}
          >
            <Text style={[styles.viewAllText, { color: colors.textMuted }]}>
              {showAll ? 'Réduire' : `Voir tout (${entries.length})`}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.textAccent }]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>+ Nouvelle entrée</Text>
        </TouchableOpacity>
      </View>

      {/* Add entry modal */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={[styles.modal, { backgroundColor: colors.bg }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7}>
              <Text style={[styles.modalCancel, { color: colors.textMuted }]}>Annuler</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.textPrimary, fontFamily: 'Amiri_700Bold' }]}>
              Journal spirituel
            </Text>
            <TouchableOpacity
              onPress={handleAdd}
              activeOpacity={0.7}
              disabled={!answer.trim()}
            >
              <Text style={[styles.modalSave, { color: answer.trim() ? colors.textAccent : colors.textMuted }]}>
                Sauvegarder
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} keyboardShouldPersistTaps="handled">
            <Text style={[styles.questionLabel, { color: colors.textSecondary }]}>
              Choisis une question :
            </Text>
            {JOURNAL_QUESTIONS.map((q, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.questionOption,
                  {
                    backgroundColor: selectedQuestion === i ? colors.textAccent + '22' : colors.bgSection,
                    borderColor: selectedQuestion === i ? colors.textAccent : colors.border,
                  },
                ]}
                onPress={() => setSelectedQuestion(i)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.questionText,
                    { color: selectedQuestion === i ? colors.textAccent : colors.textSecondary },
                  ]}
                >
                  {q}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.answerLabel, { color: colors.textSecondary }]}>
              Ta réflexion :
            </Text>
            <TextInput
              style={[
                styles.answerInput,
                { color: colors.textPrimary, backgroundColor: colors.bgInput, borderColor: colors.border },
              ]}
              value={answer}
              onChangeText={setAnswer}
              multiline
              placeholder="Écris honnêtement, Allah voit ton cœur..."
              placeholderTextColor={colors.textMuted}
              textAlignVertical="top"
              autoFocus
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    padding: 24,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  emptyEmoji: {
    fontSize: 32,
  },
  emptyText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  entryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryDate: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  expandIcon: {
    fontSize: 10,
  },
  entryQuestion: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  entryAnswerBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  entryAnswer: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  deleteBtn: {
    alignSelf: 'flex-end',
  },
  deleteBtnText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  viewAllBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
  },
  addBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  modal: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalCancel: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
  },
  modalTitle: {
    fontSize: 18,
  },
  modalSave: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  questionOption: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  questionText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  answerLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  answerInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    minHeight: 140,
    lineHeight: 22,
    marginBottom: 40,
  },
});
