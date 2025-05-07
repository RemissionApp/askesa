import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { JournalEntry } from '@/types';
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface JournalListProps {
  entries: JournalEntry[];
}

export const JournalList: React.FC<JournalListProps> = ({ entries }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderMoodIcon = (mood: JournalEntry['mood']) => {
    switch (mood) {
      case 'positive':
        return <Ionicons name="happy" size={20} color={colors.success} />;
      case 'neutral':
        return <Ionicons name="happy-outline" size={20} color={colors.secondary} />;
      case 'negative':
        return <Ionicons name="sad" size={20} color={colors.error} />;
    }
  };

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entryContainer}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{formatDate(item.date)}</Text>
        <View style={styles.moodContainer}>{renderMoodIcon(item.mood)}</View>
      </View>
      <Text style={styles.entryContent}>{item.content}</Text>
    </View>
  );

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Ваш дневник пуст. Начните записывать свои мысли и наблюдения.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
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
  entryContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  moodContainer: {
    padding: 4,
  },
  entryContent: {
    fontSize: 16,
    color: colors.text,
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