import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { CosmicBackground } from '@/components/CosmicBackground';
import { MysticButton } from '@/components/MysticButton';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';

const { width } = Dimensions.get('window');

export default function IntroductionScreen() {
  const router = useRouter();
  const { setHasSeenIntroduction } = useAsceticismStore();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const introPages = [
    {
      title: "Что такое Аскеза?",
      content: [
        "АСКЕЗА — это обет.",
        "Это не лишение, а очищение.",
        "Ты добровольно покидаешь мир избытка, чтобы услышать себя.",
        "Каждый твой шаг — шаг к свободе.",
        "Каждый день — вызов. Каждое молчание — знание.",
      ],
    },
    {
      title: "Твой Путь",
      content: [
        "Ты выбираешь ограничения сам.",
        "Ты определяешь срок своей аскезы.",
        "Ты даёшь клятву и следуешь ей.",
        "Ты ведёшь дневник своего пути.",
        "Ты задаёшь вопросы Высшему Разуму.",
      ],
    },
    {
      title: "Твоя Награда",
      content: [
        "Ясность мысли.",
        "Свобода от зависимостей.",
        "Глубокое понимание себя.",
        "Связь с Высшим Разумом.",
        "Уникальный амулет в конце пути.",
      ],
    },
  ];
  
  const handleNext = () => {
    if (currentPage < introPages.length - 1) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Change page
        setCurrentPage(currentPage + 1);
        scrollViewRef.current?.scrollTo({ x: width * (currentPage + 1), animated: false });
        
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Last page, proceed to main app
      setHasSeenIntroduction(true);
      router.push('/(tabs)');
    }
  };

  return (
    <CosmicBackground>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {introPages.map((page, index) => (
            <Animated.View
              key={index}
              style={[
                styles.pageContainer,
                { width, opacity: currentPage === index ? fadeAnim : 0 },
              ]}
            >
              <Text style={styles.title}>{page.title}</Text>
              
              <View style={styles.contentContainer}>
                {page.content.map((line, lineIndex) => (
                  <Text key={lineIndex} style={styles.contentLine}>
                    {line}
                  </Text>
                ))}
              </View>
            </Animated.View>
          ))}
        </ScrollView>
        
        <View style={styles.paginationContainer}>
          {introPages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentPage === index && styles.activePaginationDot,
              ]}
            />
          ))}
        </View>
        
        <MysticButton
          title={currentPage < introPages.length - 1 ? "Далее" : "Принять вызов"}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  contentContainer: {
    marginBottom: 40,
  },
  contentLine: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 28,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surface,
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: colors.primary,
  },
  button: {
    width: '80%',
    marginBottom: 40,
  },
});