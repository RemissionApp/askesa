import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Question } from '@/types';
import { colors } from '@/constants/colors';

interface QuestionListProps {
  questions: Question[];
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: Question }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{item.question}</Text>
      </View>
      <View style={styles.answerBox}>
        <Text style={styles.answerText}>{item.answer}</Text>
      </View>
    </View>
  );

  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Вы еще не задали вопросов Высшему Разуму.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={questions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  questionBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
  },
  answerBox: {
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});