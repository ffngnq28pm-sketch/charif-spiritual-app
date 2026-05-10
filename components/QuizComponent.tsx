import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react-native';
import { QuizQuestion } from '@/types';
import { useTheme } from "@/context/ThemeContext";

interface Props {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
}

type AnswerState = 'unanswered' | 'correct' | 'wrong';

export default function QuizComponent({ questions, onComplete }: Props) {
  const { colors } = useTheme();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = useCallback((idx: number) => {
    if (answerState !== 'unanswered') return;
    setSelected(idx);
    const isCorrect = idx === q.correctAnswer;
    setAnswerState(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore((s) => s + 1);
  }, [answerState, q]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete(answerState === 'correct' ? score : score, questions.length);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswerState('unanswered');
    }
  }, [current, questions.length, onComplete, answerState, score]);

  const optionColor = (idx: number) => {
    if (answerState === 'unanswered') return colors.bgCard;
    if (idx === q.correctAnswer) return '#2D7A4F22';
    if (idx === selected && answerState === 'wrong') return '#A53A3A22';
    return colors.bgCard;
  };

  const optionBorder = (idx: number) => {
    if (answerState === 'unanswered') return colors.border ?? '#333';
    if (idx === q.correctAnswer) return '#2D7A4F';
    if (idx === selected && answerState === 'wrong') return '#A53A3A';
    return colors.border ?? '#333';
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <View style={[styles.result, { backgroundColor: colors.bgCard }]}>
        <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>Quiz terminé !</Text>
        <Text style={[styles.resultScore, { color: '#C9A84C' }]}>{score}/{questions.length}</Text>
        <Text style={[styles.resultPct, { color: colors.textMuted }]}>{pct}% de réussite</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.counter, { color: colors.textMuted }]}>
          {current + 1} / {questions.length}
        </Text>
        <View style={[styles.diffBadge, { backgroundColor: '#C9A84C22' }]}>
          <Text style={[styles.diffText, { color: '#C9A84C' }]}>{q.difficulty}</Text>
        </View>
      </View>

      <Text style={[styles.question, { color: colors.textPrimary }]}>{q.question}</Text>

      <View style={styles.options}>
        {q.options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.option, { backgroundColor: optionColor(idx), borderColor: optionBorder(idx) }]}
            onPress={() => handleSelect(idx)}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, { color: colors.textPrimary }]}>{opt}</Text>
            {answerState !== 'unanswered' && idx === q.correctAnswer && (
              <CheckCircle size={18} color="#2D7A4F" />
            )}
            {answerState === 'wrong' && idx === selected && idx !== q.correctAnswer && (
              <XCircle size={18} color="#A53A3A" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {answerState !== 'unanswered' && (
        <View style={[styles.explanation, { backgroundColor: colors.bg ?? '#111' }]}>
          <Text style={[styles.explanationText, { color: colors.textSecondary ?? colors.textPrimary }]}>
            {q.explanation}
          </Text>
          {q.source && (
            <Text style={[styles.source, { color: '#C9A84C' }]}>— {q.source}</Text>
          )}
        </View>
      )}

      {answerState !== 'unanswered' && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
          <Text style={styles.nextText}>
            {current + 1 >= questions.length ? 'Voir résultat' : 'Question suivante'}
          </Text>
          <ChevronRight size={18} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counter: { fontSize: 13 },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  diffText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  question: { fontSize: 17, fontWeight: '600', lineHeight: 26 },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: { fontSize: 15, flex: 1, marginRight: 8 },
  explanation: { padding: 14, borderRadius: 12, gap: 4 },
  explanationText: { fontSize: 14, lineHeight: 22 },
  source: { fontSize: 12, fontStyle: 'italic', marginTop: 4 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C9A84C',
    padding: 14,
    borderRadius: 14,
    gap: 6,
  },
  nextText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  result: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, borderRadius: 16, padding: 32 },
  resultTitle: { fontSize: 22, fontWeight: '700' },
  resultScore: { fontSize: 48, fontWeight: '800' },
  resultPct: { fontSize: 16 },
});
