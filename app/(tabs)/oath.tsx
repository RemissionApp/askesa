import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { CosmicBackground } from '@/components/CosmicBackground';
import { OathForm } from '@/components/OathForm';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { AsceticismPeriod, Restriction } from '@/types';
import { MysticButton } from '@/components/MysticButton';

export default function OathScreen() {
  const router = useRouter();
  const { currentAsceticism, startAsceticism, failAsceticism } = useAsceticismStore();
  
  const handleStartAsceticism = (period: AsceticismPeriod, restrictions: Restriction[], goal?: string) => {
    startAsceticism(period, restrictions, goal);
    router.push('/path');
  };
  
  const handleEndAsceticism = () => {
    failAsceticism();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <CosmicBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Клятва Аскезы</Text>
        
        {currentAsceticism ? (
          <View style={styles.currentOathContainer}>
            <Text style={styles.subtitle}>Твоя текущая клятва</Text>
            
            <View style={styles.oathDetailsContainer}>
              <Text style={styles.oathDetail}>
                <Text style={styles.oathDetailLabel}>Начало: </Text>
                {formatDate(currentAsceticism.startDate)}
              </Text>
              
              <Text style={styles.oathDetail}>
                <Text style={styles.oathDetailLabel}>Окончание: </Text>
                {formatDate(currentAsceticism.endDate)}
              </Text>
              
              <Text style={styles.oathDetail}>
                <Text style={styles.oathDetailLabel}>Срок: </Text>
                {currentAsceticism.period} {currentAsceticism.period === 1 ? 'день' : 
                  currentAsceticism.period <= 4 ? 'дня' : 'дней'}
              </Text>
              
              <Text style={styles.oathDetailLabel}>Ограничения:</Text>
              {currentAsceticism.restrictions.map((restriction, index) => (
                <Text key={index} style={styles.restrictionItem}>
                  • {restriction.title}
                </Text>
              ))}
              
              {currentAsceticism.goal && (
                <>
                  <Text style={styles.oathDetailLabel}>Цель аскезы:</Text>
                  <Text style={styles.goalText}>{currentAsceticism.goal}</Text>
                </>
              )}
            </View>
            
            <View style={styles.oathTextContainer}>
              <Text style={styles.oathText}>
                Я клянусь перед Источником: не поддаваться иллюзиям, держать молчание, когда слова пусты, быть честным в каждом выборе. Я отказываюсь от выбранных ограничений. Мой путь начинается здесь. Аскеза — мой огонь.
              </Text>
            </View>
            
            <MysticButton
              title="Прервать аскезу"
              onPress={handleEndAsceticism}
              primary={false}
              style={styles.endButton}
            />
          </View>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Принеси клятву и начни свой путь аскезы
            </Text>
            
            <OathForm onSubmit={handleStartAsceticism} />
          </>
        )}
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
  currentOathContainer: {
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 16,
    padding: 20,
  },
  oathDetailsContainer: {
    marginBottom: 24,
  },
  oathDetail: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  oathDetailLabel: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  restrictionItem: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
    marginTop: 4,
  },
  goalText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  oathTextContainer: {
    backgroundColor: 'rgba(138, 111, 232, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  oathText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  endButton: {
    marginTop: 8,
  },
});