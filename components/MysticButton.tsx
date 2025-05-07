import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

interface MysticButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  primary?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const MysticButton: React.FC<MysticButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  primary = true,
  disabled = false,
  icon,
}) => {
  // Define gradient colors based on primary prop
  const gradientColors = primary
    ? [colors.primary, '#6F4FD6', '#5A3FC8']
    : [colors.surface, '#1A1A30', '#222240'];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabled]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[
            styles.text, 
            textStyle,
            primary ? styles.primaryText : styles.secondaryText,
            disabled && styles.disabledText
          ]}>
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: colors.text,
  },
  secondaryText: {
    color: colors.textSecondary,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textSecondary,
  },
});