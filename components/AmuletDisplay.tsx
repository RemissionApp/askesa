import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SacredSymbol } from './SacredSymbol';
import { colors } from '@/constants/colors';
import { Amulet } from '@/types';

interface AmuletDisplayProps {
  amulet: Amulet;
}

export const AmuletDisplay: React.FC<AmuletDisplayProps> = ({ amulet }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.symbolContainer}>
        <SacredSymbol size={120} color={colors.secondary} animated={true} />
      </View>
      
      <Text style={styles.title}>{amulet.name}</Text>
      <Text style={styles.date}>Получен {formatDate(amulet.date)}</Text>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{amulet.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 16,
    alignItems: 'center',
  },
  symbolContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(232, 193, 111, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});