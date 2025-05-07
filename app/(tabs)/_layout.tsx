import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Храм',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="oath"
        options={{
          title: 'Клятва',
          tabBarIcon: ({ color, size }) => <FontAwesome name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="path"
        options={{
          title: 'Путь',
          tabBarIcon: ({ color, size }) => <FontAwesome name="road" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="question"
        options={{
          title: 'Вопрос',
          tabBarIcon: ({ color, size }) => <FontAwesome name="comment" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}