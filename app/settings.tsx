import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CosmicBackground } from '@/components/CosmicBackground';
import { colors } from '@/constants/colors';
import { useAsceticismStore } from '@/stores/asceticism-store';
import { MysticButton } from '@/components/MysticButton';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const { pastAsceticisms, setHasSeenIntroduction } = useAsceticismStore();
  
  const resetIntroduction = () => {
    Alert.alert(
      "Сбросить введение",
      "Вы уверены, что хотите снова увидеть введение при следующем запуске?",
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { 
          text: "Сбросить", 
          onPress: () => setHasSeenIntroduction(false)
        }
      ]
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <CosmicBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Настройки</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Архив аскез</Text>
          
          {pastAsceticisms.length === 0 ? (
            <Text style={styles.emptyText}>
              У вас пока нет завершенных аскез.
            </Text>
          ) : (
            <View style={styles.asceticismList}>
              {pastAsceticisms.map((asceticism, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.asceticismItem}
                  onPress={() => {
                    if (asceticism.amulet) {
                      router.push('/gift');
                    }
                  }}
                >
                  <View style={styles.asceticismHeader}>
                    <View style={styles.asceticismInfo}>
                      <Text style={styles.asceticismPeriod}>
                        {asceticism.period} {asceticism.period === 1 ? 'день' : 
                          asceticism.period <= 4 ? 'дня' : 'дней'}
                      </Text>
                      <Text style={styles.asceticismDate}>
                        {formatDate(asceticism.startDate)} - {formatDate(asceticism.endDate)}
                      </Text>
                    </View>
                    
                    <View style={[
                      styles.asceticismStatus,
                      asceticism.state === 'completed' ? styles.statusCompleted : styles.statusFailed
                    ]}>
                      <Text style={styles.statusText}>
                        {asceticism.state === 'completed' ? 'Завершено' : 'Прервано'}
                      </Text>
                    </View>
                  </View>
                  
                  {asceticism.amulet && (
                    <View style={styles.amuletIndicator}>
                      <Ionicons name="medal" size={16} color={colors.secondary} />
                      <Text style={styles.amuletText}>Амулет получен</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Приложение</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={resetIntroduction}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="information-circle" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingText}>Показать введение снова</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="time" size={20} color={colors.primary} />
            </View>
            <Text style={styles.settingText}>Напоминания</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>О приложении</Text>
          <Text style={styles.aboutText}>
            АСКЕЗА — это приложение для духовного роста через осознанное ограничение. Версия 1.0.0
          </Text>
        </View>
      </ScrollView>
    </CosmicBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  asceticismList: {
    gap: 12,
  },
  asceticismItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  asceticismHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asceticismInfo: {
    flex: 1,
  },
  asceticismPeriod: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  asceticismDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  asceticismStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusCompleted: {
    backgroundColor: 'rgba(111, 232, 165, 0.2)',
  },
  statusFailed: {
    backgroundColor: 'rgba(232, 111, 111, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
  amuletIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  amuletText: {
    fontSize: 14,
    color: colors.secondary,
    marginLeft: 8,
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(138, 111, 232, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
  aboutSection: {
    backgroundColor: 'rgba(20, 20, 40, 0.7)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});