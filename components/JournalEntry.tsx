import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MysticButton } from './MysticButton';
import { colors } from '@/constants/colors';
import { JournalEntry as JournalEntryType } from '@/types';
import { Ionicons } from '@expo/vector-icons';

interface JournalEntryProps {
  onSave: (content: string, mood: JournalEntryType['mood']) => void;
}

export const JournalEntryComponent: React.FC<JournalEntryProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntryType['mood']>('neutral');

  const handleSave = () => {
    if (content.trim()) {
      onSave(content, mood);
      setContent('');
      setMood('neutral');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запись в дневник</Text>
      <Text style={styles.subtitle}>
        Опишите свои мысли, чувства и наблюдения за сегодняшний день аскезы
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Что вы чувствуете сегодня?"
        placeholderTextColor={colors.textSecondary}
        multiline
        value={content}
        onChangeText={setContent}
        textAlignVertical="top"
      />
      
      <Text style={styles.moodTitle}>Ваше настроение</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity
          style={[styles.moodButton, mood === 'positive' && styles.selectedMood]}
          onPress={() => setMood('positive')}
        >
          <Ionicons
            name="happy"
            size={24}
            color={mood === 'positive' ? colors.success : colors.textSecondary}
          />
          <Text
            style={[
              styles.moodText,
              mood === 'positive' && styles.selectedMoodText,
              { color: mood === 'positive' ? colors.success : colors.textSecondary }
            ]}
          >
            Хорошее
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.moodButton, mood === 'neutral' && styles.selectedMood]}
          onPress={() => setMood('neutral')}
        >
          <Ionicons
            name="happy-outline"
            size={24}
            color={mood === 'neutral' ? colors.secondary : colors.textSecondary}
          />
          <Text
            style={[
              styles.moodText,
              mood === 'neutral' && styles.selectedMoodText,
              { color: mood === 'neutral' ? colors.secondary : colors.textSecondary }
            ]}
          >
            Нейтральное
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.moodButton, mood === 'negative' && styles.selectedMood]}
          onPress={() => setMood('negative')}
        >
          <Ionicons
            name="sad"
            size={24}
            color={mood === 'negative' ? colors.error : colors.textSecondary}
          />
          <Text
            style={[
              styles.moodText,
              mood === 'negative' && styles.selectedMoodText,
              { color: mood === 'negative' ? colors.error : colors.textSecondary }
            ]}
          >
            Сложное
          </Text>
        </TouchableOpacity>
      </View>
      
      <MysticButton
        title="Сохранить запись"
        onPress={handleSave}
        style={styles.saveButton}
        disabled={!content.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    color: colors.text,
    minHeight: 150,
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    flex: 1,
    marginHorizontal: 4,
  },
  selectedMood: {
    backgroundColor: 'rgba(20, 20, 40, 0.9)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  moodText: {
    marginTop: 8,
    fontSize: 14,
  },
  selectedMoodText: {
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 8,
  },
});