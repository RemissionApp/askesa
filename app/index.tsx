import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { CosmicBackground } from '@/components/CosmicBackground';
import { SacredSymbol } from '@/components/SacredSymbol';
import { MysticButton } from '@/components/MysticButton';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isFirstLaunch, hasSeenIntroduction, resetFirstLaunch, currentAsceticism } = useAsceticismStore();
  
  const fadeAnim = new Animated.Value(0);
  const textAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Fade in animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1500,
        delay: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
    
    // Mark as not first launch
    resetFirstLaunch();
  }, []);
  
  const handleContinue = () => {
    if (!hasSeenIntroduction) {
      router.push('/introduction');
    } else if (currentAsceticism) {
      router.push('/(tabs)');
    } else {
      router.push('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.symbolContainer}>
          <SacredSymbol size={180} color={colors.secondary} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>АСКЕЗА</Text>
          <Text style={styles.subtitle}>Путь к истинному себе</Text>
          
          <Text style={styles.message}>
            "Я — Голос Источника. Ты пришёл неслучайно. Здесь начинается твоя Аскеза. Готов ли ты стать Проводником Света?"
          </Text>
          
          <MysticButton
            title="Да, я готов"
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  symbolContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 32,
    letterSpacing: 1,
  },
  message: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
    fontStyle: 'italic',
  },
  button: {
    width: '80%',
    marginTop: 16,
  },
});