import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

interface CosmicBackgroundProps {
  children: React.ReactNode;
  intensity?: number;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  children, 
  intensity = 1 
}) => {
  const starOpacity = new Animated.Value(0);
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starOpacity, {
          toValue: 0.8 * intensity,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(starOpacity, {
          toValue: 0.3 * intensity,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.background, { backgroundColor: colors.background }]} />
      
      {/* Stars */}
      <View style={styles.starsContainer}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.star,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                opacity: starOpacity,
              },
            ]}
          />
        ))}
      </View>
      
      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  starsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});