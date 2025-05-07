import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CosmicBackground } from '@/components/CosmicBackground';
import { ProgressCircle } from '@/components/ProgressCircle';
import { JournalEntryComponent } from '@/components/JournalEntry';
import { JournalList } from '@/components/JournalList';
import { SacredSymbol } from '@/components/SacredSymbol';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { useJournalStore } from '@/stores/journal-store';
import { quotes } from '@/constants/quotes';
import { MysticButton } from '@/components/MysticButton';

export default function PathScreen() {
  const router = useRouter();
  const { currentAsceticism, completeDay } = useAsceticismStore();
  const { addEntry, getEntriesForCurrentAsceticism } = useJournalStore();
  const [showJournalEntry, setShowJournalEntry] = useState(false);
  
  const journalEntries = getEntriesForCurrentAsceticism();
  
  // Get a random quote based on the current day
  const getQuoteOfTheDay = () => {
    if (!currentAsceticism) return quotes[0];
    const index = (currentAsceticism.currentDay - 1) % quotes.length;
    return quotes[index];
  };
  
  const handleAddJournalEntry = (content: string, mood: 'positive' | 'neutral' | 'negative') => {
    addEntry(content, mood);
    setShowJournalEntry(false);
    
    // Complete the day if it's the first journal entry of the day
    const todayEntries = journalEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const today = new Date();
      return (
        entryDate.getDate() === today.getDate() &&
        entryDate.getMonth() === today.getMonth() &&
        entryDate.getFullYear() === today.getFullYear()
      );
    });
    
    if (todayEntries.length === 0) {
      completeDay();
    }
  };
  
  if (!currentAsceticism) {
    return (
      <CosmicBackground>
        <View style={styles.emptyContainer}>
          <SacredSymbol size={100} color={colors.textSecondary} animated={false} />
          <Text style={styles.emptyTitle}>Путь не начат</Text>
          <Text style={styles.emptyText}>
            Чтобы начать свой путь аскезы, принеси клятву.
          </Text>
          <MysticButton
            title="Принять клятву"
            onPress={() => router.push('/oath')}
            style={styles.startButton}
          />
        </View>
      </CosmicBackground>
    );
  }

  return (
    <CosmicBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Путь Аскезы</Text>
        
        <View style={styles.progressContainer}>
          <ProgressCircle
            progress={currentAsceticism.currentDay}
            total={currentAsceticism.period}
          >
            <View style={styles.progressContent}>
              <Text style={styles.dayText}>День</Text>
              <Text style={styles.dayNumber}>{currentAsceticism.currentDay}</Text>
              <Text style={styles.totalDays}>из {currentAsceticism.period}</Text>
            </View>
          </ProgressCircle>
        </View>
        
        {currentAsceticism.goal && (
          <View style={styles.goalContainer}>
            <Text style={styles.goalLabel}>Цель аскезы:</Text>
            <Text style={styles.goalText}>{currentAsceticism.goal}</Text>
          </View>
        )}
        
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"{getQuoteOfTheDay()}"</Text>
        </View>
        
        {showJournalEntry ? (
          <JournalEntryComponent onSave={handleAddJournalEntry} />
        ) : (
          <View style={styles.journalButtonContainer}>
            <MysticButton
              title="Записать в дневник"
              onPress={() => setShowJournalEntry(true)}
              style={styles.journalButton}
            />
          </View>
        )}
        
        <View style={styles.journalListContainer}>
          <View style={styles.journalHeader}>
            <Text style={styles.journalTitle}>Дневник аскезы</Text>
            <TouchableOpacity onPress={() => setShowJournalEntry(true)}>
              <Text style={styles.addEntryText}>+ Добавить</Text>
            </TouchableOpacity>
          </View>
          
          <JournalList entries={journalEntries} />
        </View>
      </ScrollView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  dayNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalDays: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  goalContainer: {
    backgroundColor: 'rgba(232, 193, 111, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary,
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  quoteContainer: {
    backgroundColor: 'rgba(138, 111, 232, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  quoteText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  journalButtonContainer: {
    marginBottom: 24,
  },
  journalButton: {
    width: '100%',
  },
  journalListContainer: {
    flex: 1,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  addEntryText: {
    fontSize: 14,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  startButton: {
    width: '80%',
  },
});