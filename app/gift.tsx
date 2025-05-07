import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CosmicBackground } from '@/components/CosmicBackground';
import { AmuletDisplay } from '@/components/AmuletDisplay';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { MysticButton } from '@/components/MysticButton';
import { useRouter } from 'expo-router';
import { Amulet } from '@/types';

// Sample amulets
const amulets: Amulet[] = [
  {
    id: '1',
    symbol: 'fire',
    name: 'Амулет Внутреннего Огня',
    description: 'Этот амулет символизирует твою силу воли и способность преодолевать трудности. Он напоминает о том, что истинная сила находится внутри тебя.',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    symbol: 'water',
    name: 'Амулет Текучей Мудрости',
    description: 'Этот амулет отражает твою способность адаптироваться и находить гармонию в любых обстоятельствах. Он напоминает о важности гибкости и принятия.',
    date: new Date().toISOString(),
  },
  {
    id: '3',
    symbol: 'air',
    name: 'Амулет Ясного Разума',
    description: 'Этот амулет символизирует твою способность к ясному мышлению и интуитивному пониманию. Он напоминает о важности осознанности и присутствия в моменте.',
    date: new Date().toISOString(),
  },
];

export default function GiftScreen() {
  const router = useRouter();
  const { currentAsceticism, pastAsceticisms, completeAsceticism } = useAsceticismStore();
  
  // Get a random amulet
  const getRandomAmulet = (): Amulet => {
    const index = Math.floor(Math.random() * amulets.length);
    return {
      ...amulets[index],
      date: new Date().toISOString(),
    };
  };
  
  // Get the latest completed asceticism with an amulet
  const getLatestAmulet = (): Amulet | undefined => {
    const completedAsceticisms = pastAsceticisms.filter(
      a => a.state === 'completed' && a.amulet
    );
    
    if (completedAsceticisms.length > 0) {
      const latest = completedAsceticisms.sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      )[0];
      
      return latest.amulet;
    }
    
    return undefined;
  };
  
  const handleCompleteAsceticism = () => {
    if (currentAsceticism) {
      const amulet = getRandomAmulet();
      completeAsceticism(amulet);
      router.push('/(tabs)');
    }
  };
  
  const amulet = getLatestAmulet() || getRandomAmulet();

  return (
    <CosmicBackground intensity={1.5}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Дар Вселенной</Text>
        
        {currentAsceticism && currentAsceticism.currentDay >= currentAsceticism.period ? (
          <>
            <Text style={styles.congratsText}>
              Поздравляем! Ты успешно завершил свой путь аскезы длиной в {currentAsceticism.period} {currentAsceticism.period === 1 ? 'день' : currentAsceticism.period <= 4 ? 'дня' : 'дней'}.
            </Text>
            
            {currentAsceticism.goal && (
              <View style={styles.goalContainer}>
                <Text style={styles.goalLabel}>Твоя цель была:</Text>
                <Text style={styles.goalText}>{currentAsceticism.goal}</Text>
              </View>
            )}
            
            <Text style={styles.subtitle}>
              В награду за твою силу духа и преданность пути, Вселенная дарит тебе особый амулет:
            </Text>
            
            <AmuletDisplay amulet={getRandomAmulet()} />
            
            <MysticButton
              title="Принять дар"
              onPress={handleCompleteAsceticism}
              style={styles.button}
            />
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Твой амулет — символ пройденного пути и обретенной мудрости.
            </Text>
            
            {amulet ? (
              <AmuletDisplay amulet={amulet} />
            ) : (
              <Text style={styles.noAmuletText}>
                У тебя пока нет амулетов. Завершите путь аскезы, чтобы получить свой первый амулет.
              </Text>
            )}
            
            <MysticButton
              title="Вернуться"
              onPress={() => router.back()}
              style={styles.button}
              primary={false}
            />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  congratsText: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  goalContainer: {
    backgroundColor: 'rgba(232, 193, 111, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
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
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '80%',
    marginTop: 32,
  },
  noAmuletText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 40,
  },
});