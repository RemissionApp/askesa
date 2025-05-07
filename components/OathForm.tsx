import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { MysticButton } from './MysticButton';
import { restrictions } from '@/constants/restrictions';
import { colors } from '@/constants/colors';
import { Restriction, AsceticismPeriod } from '@/types';
import { FontAwesome } from '@expo/vector-icons';

interface OathFormProps {
  onSubmit: (period: AsceticismPeriod, selectedRestrictions: Restriction[], goal?: string) => void;
}

export const OathForm: React.FC<OathFormProps> = ({ onSubmit }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<AsceticismPeriod | null>(null);
  const [selectedRestrictions, setSelectedRestrictions] = useState<Restriction[]>([]);
  const [customRestriction, setCustomRestriction] = useState('');
  const [goal, setGoal] = useState('');
  const [oathConfirmed, setOathConfirmed] = useState(false);
  
  const periods: AsceticismPeriod[] = [1, 3, 7, 21, 40];
  
  const toggleRestriction = (restriction: Restriction) => {
    if (selectedRestrictions.some(r => r.id === restriction.id)) {
      setSelectedRestrictions(selectedRestrictions.filter(r => r.id !== restriction.id));
    } else {
      if (selectedRestrictions.length < 3) {
        setSelectedRestrictions([...selectedRestrictions, restriction]);
      }
    }
  };
  
  const addCustomRestriction = () => {
    if (customRestriction.trim() && selectedRestrictions.length < 3) {
      const custom: Restriction = {
        id: 'custom_' + Date.now(),
        title: customRestriction,
        description: 'Пользовательское ограничение',
        custom: customRestriction,
      };
      setSelectedRestrictions([...selectedRestrictions, custom]);
      setCustomRestriction('');
    }
  };
  
  const confirmOath = () => {
    Alert.alert(
      "Подтверждение клятвы",
      "Произнесите вслух следующую клятву:\n\n\"Я клянусь перед Источником: не поддаваться иллюзиям, держать молчание, когда слова пусты, быть честным в каждом выборе. Я отказываюсь от выбранных ограничений. Мой путь начинается здесь. Аскеза — мой огонь.\"",
      [
        {
          text: "Я произнес(ла) клятву",
          onPress: () => setOathConfirmed(true)
        },
        {
          text: "Отмена",
          style: "cancel"
        }
      ]
    );
  };
  
  const handleSubmit = () => {
    if (!selectedPeriod || selectedRestrictions.length === 0 || !oathConfirmed) return;
    onSubmit(selectedPeriod, selectedRestrictions, goal.trim() || undefined);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Выберите срок аскезы</Text>
      <View style={styles.periodContainer}>
        {periods.map(period => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedPeriodText,
              ]}
            >
              {period} {period === 1 ? 'день' : period <= 4 ? 'дня' : 'дней'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Выберите ограничения (до 3)</Text>
      <View style={styles.restrictionsContainer}>
        {restrictions.filter(r => r.id !== 'custom').map(restriction => (
          <TouchableOpacity
            key={restriction.id}
            style={[
              styles.restrictionButton,
              selectedRestrictions.some(r => r.id === restriction.id) &&
                styles.selectedRestrictionButton,
            ]}
            onPress={() => toggleRestriction(restriction)}
          >
            <Text
              style={[
                styles.restrictionTitle,
                selectedRestrictions.some(r => r.id === restriction.id) &&
                  styles.selectedRestrictionTitle,
              ]}
            >
              {restriction.title}
            </Text>
            <Text
              style={[
                styles.restrictionDescription,
                selectedRestrictions.some(r => r.id === restriction.id) &&
                  styles.selectedRestrictionDescription,
              ]}
            >
              {restriction.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Своё ограничение</Text>
      <View style={styles.customRestrictionContainer}>
        <TextInput
          style={styles.customRestrictionInput}
          placeholder="Введите своё ограничение"
          placeholderTextColor={colors.textSecondary}
          value={customRestriction}
          onChangeText={setCustomRestriction}
        />
        <MysticButton
          title="Добавить"
          onPress={addCustomRestriction}
          style={styles.addButton}
          primary={false}
          disabled={!customRestriction.trim() || selectedRestrictions.length >= 3}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Цель аскезы</Text>
      <Text style={styles.goalDescription}>
        Что вы хотите получить в результате этой аскезы? Какое изменение или осознание ищете?
      </Text>
      <TextInput
        style={styles.goalInput}
        placeholder="Опишите вашу цель..."
        placeholderTextColor={colors.textSecondary}
        multiline
        value={goal}
        onChangeText={setGoal}
        textAlignVertical="top"
      />
      
      <Text style={styles.sectionTitle}>Клятва аскезы</Text>
      <View style={styles.oathContainer}>
        <Text style={styles.oathInstructions}>
          Для подтверждения своей решимости вы должны произнести клятву вслух:
        </Text>
        
        <View style={styles.oathTemplate}>
          <Text style={styles.oathTemplateText}>
            "Я клянусь перед Источником: не поддаваться иллюзиям, держать молчание, когда слова пусты, быть честным в каждом выборе. Я отказываюсь от выбранных ограничений. Мой путь начинается здесь. Аскеза — мой огонь."
          </Text>
        </View>
        
        <View style={styles.oathConfirmContainer}>
          <TouchableOpacity 
            style={styles.oathConfirmButton}
            onPress={confirmOath}
          >
            <Text style={styles.oathConfirmText}>
              Произнести клятву вслух
            </Text>
          </TouchableOpacity>
          
          <View style={styles.oathStatusContainer}>
            {oathConfirmed ? (
              <View style={styles.oathConfirmedContainer}>
                <FontAwesome name="check-circle" size={20} color={colors.success} />
                <Text style={styles.oathConfirmedText}>Клятва произнесена</Text>
              </View>
            ) : (
              <Text style={styles.oathNotConfirmedText}>Клятва не произнесена</Text>
            )}
          </View>
        </View>
      </View>
      
      <MysticButton
        title="Принять клятву"
        onPress={handleSubmit}
        style={styles.submitButton}
        disabled={!selectedPeriod || selectedRestrictions.length === 0 || !oathConfirmed}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  periodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  periodButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedPeriodButton: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
  },
  periodText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  selectedPeriodText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  restrictionsContainer: {
    gap: 12,
  },
  restrictionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedRestrictionButton: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
  },
  restrictionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  restrictionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedRestrictionTitle: {
    color: colors.text,
  },
  selectedRestrictionDescription: {
    color: colors.textSecondary,
  },
  customRestrictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customRestrictionInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: colors.text,
  },
  addButton: {
    height: 48,
  },
  goalDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  goalInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  oathInstructions: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  oathContainer: {
    backgroundColor: 'rgba(20, 20, 40, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  oathTemplate: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  oathTemplateText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  oathConfirmContainer: {
    alignItems: 'center',
  },
  oathConfirmButton: {
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  oathConfirmText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  oathStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oathConfirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oathConfirmedText: {
    color: colors.success,
    marginLeft: 8,
    fontSize: 14,
  },
  oathNotConfirmedText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  submitButton: {
    marginVertical: 24,
  },
});