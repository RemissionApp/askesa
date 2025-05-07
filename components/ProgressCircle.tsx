import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '@/constants/colors';

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  total: number;
  children?: React.ReactNode;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size = 200,
  strokeWidth = 10,
  progress,
  total,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressPercentage = progress / total;
  const strokeDashoffset = circumference * (1 - progressPercentage);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.surface}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      
      <View style={[styles.content, { width: size, height: size }]}>
        {children || (
          <View style={styles.textContainer}>
            <Text style={styles.progressText}>{progress}</Text>
            <Text style={styles.totalText}>из {total}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
});