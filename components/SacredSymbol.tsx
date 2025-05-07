import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '@/constants/colors';

interface SacredSymbolProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

export const SacredSymbol: React.FC<SacredSymbolProps> = ({
  size = 120,
  color = colors.secondary,
  animated = true,
}) => {
  const rotation = new Animated.Value(0);
  const scale = new Animated.Value(1);
  
  useEffect(() => {
    if (animated) {
      // Rotation animation
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
      
      // Pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated]);
  
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.symbolContainer,
          {
            width: size,
            height: size,
            transform: [
              { rotate: spin },
              { scale: scale },
            ],
          },
        ]}
      >
        <Svg width={size} height={size} viewBox="0 0 100 100">
          {/* Outer circle */}
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
          
          {/* Inner hexagram */}
          <Path
            d="M50 5 L95 50 L50 95 L5 50 Z"
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
          
          {/* Inner circle */}
          <Circle
            cx="50"
            cy="50"
            r="20"
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
          
          {/* Cross lines */}
          <Path
            d="M5 50 L95 50 M50 5 L50 95"
            stroke={color}
            strokeWidth="1"
          />
          
          {/* Center dot */}
          <Circle
            cx="50"
            cy="50"
            r="3"
            fill={color}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});