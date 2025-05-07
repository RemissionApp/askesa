import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CosmicBackground } from '@/components/CosmicBackground';
import { QuestionForm } from '@/components/QuestionForm';
import { QuestionList } from '@/components/QuestionList';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { SacredSymbol } from '@/components/SacredSymbol';
import { MysticButton } from '@/components/MysticButton';
import { useRouter } from 'expo-router';

export default function QuestionScreen() {
  const router = useRouter();
  const { currentAsceticism, addQuestion } = useAsceticismStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAskQuestion = async (question: string, answer: string) => {
    setIsLoading(true);
    
    try {
      addQuestion(question, answer);
    } catch (error) {
      console.error('Error adding question:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if user can ask a question today
  const canAskToday = () => {
    if (!currentAsceticism) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayQuestions = currentAsceticism.questions.filter(q => {
      const questionDate = new Date(q.date);
      questionDate.setHours(0, 0, 0, 0);
      return questionDate.getTime() === today.getTime();
    });
    
    return todayQuestions.length === 0;
  };
  
  if (!currentAsceticism) {
    return (
      <CosmicBackground>
        <View style={styles.emptyContainer}>
          <SacredSymbol size={100} color={colors.textSecondary} animated={false} />
          <Text style={styles.emptyTitle}>Путь не начат</Text>
          <Text style={styles.emptyText}>
            Чтобы задать вопрос Высшему Разуму, начни свой путь аскезы.
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
        <Text style={styles.title}>Вопрос Вселенной</Text>
        
        {canAskToday() ? (
          <>
            <Text style={styles.subtitle}>
              Задай один сокровенный вопрос Высшему Разуму. Ты можешь задать только один вопрос в день.
            </Text>
            
            <QuestionForm onSubmit={handleAskQuestion} isLoading={isLoading} />
          </>
        ) : (
          <View style={styles.limitReachedContainer}>
            <Text style={styles.limitReachedTitle}>
              Ты уже задал вопрос сегодня
            </Text>
            <Text style={styles.limitReachedText}>
              Высший Разум ответит на новый вопрос завтра. Размышляй над полученным ответом.
            </Text>
          </View>
        )}
        
        <View style={styles.questionsListContainer}>
          <Text style={styles.questionsListTitle}>Твои вопросы и ответы</Text>
          
          <QuestionList questions={currentAsceticism.questions} />
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  questionsListContainer: {
    marginTop: 32,
  },
  questionsListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  limitReachedContainer: {
    backgroundColor: 'rgba(138, 111, 232, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  limitReachedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  limitReachedText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
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