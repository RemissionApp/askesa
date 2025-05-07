import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { CosmicBackground } from '@/components/CosmicBackground';
import { SacredSymbol } from '@/components/SacredSymbol';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { FontAwesome } from '@expo/vector-icons';
import { MysticButton } from '@/components/MysticButton';

export default function TempleScreen() {
  const router = useRouter();
  const { currentAsceticism } = useAsceticismStore();
  
  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
    <CosmicBackground>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Храм Искателя</Text>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => router.push('/settings')}
            >
              <FontAwesome name="cog" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.symbolContainer}>
            <SacredSymbol size={150} color={colors.secondary} />
          </View>
          
          <Text style={styles.welcomeText}>
            {currentAsceticism 
              ? `День ${currentAsceticism.currentDay} твоей аскезы`
              : "Добро пожаловать в Храм Искателя"}
          </Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('/oath')}
            >
              <View style={styles.menuIconContainer}>
                <FontAwesome name="book" size={32} color={colors.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Клятва</Text>
                <Text style={styles.menuDescription}>
                  {currentAsceticism 
                    ? "Твоя текущая клятва"
                    : "Принять клятву аскезы"}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('/path')}
            >
              <View style={styles.menuIconContainer}>
                <FontAwesome name="road" size={32} color={colors.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Путь</Text>
                <Text style={styles.menuDescription}>
                  {currentAsceticism 
                    ? "Твой прогресс и дневник"
                    : "Начни свой путь аскезы"}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigateTo('/question')}
            >
              <View style={styles.menuIconContainer}>
                <FontAwesome name="comment" size={32} color={colors.primary} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>Вопрос</Text>
                <Text style={styles.menuDescription}>
                  {currentAsceticism 
                    ? "Задай вопрос Высшему Разуму"
                    : "Доступно после начала пути"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {!currentAsceticism && (
            <MysticButton
              title="Начать путь аскезы"
              onPress={() => navigateTo('/oath')}
              style={styles.startButton}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  settingsButton: {
    padding: 8,
  },
  symbolContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  menuContainer: {
    gap: 16,
    marginBottom: 32,
  },
  menuItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  startButton: {
    marginTop: 16,
  },
});