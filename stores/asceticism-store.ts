import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asceticism, AsceticismPeriod, AsceticismState, Restriction, Question, Amulet } from '@/types';

interface AsceticismStore {
  currentAsceticism: Asceticism | null;
  pastAsceticisms: Asceticism[];
  isFirstLaunch: boolean;
  hasSeenIntroduction: boolean;
  
  // Actions
  startAsceticism: (period: AsceticismPeriod, restrictions: Restriction[], goal?: string) => void;
  completeDay: () => void;
  failAsceticism: () => void;
  completeAsceticism: (amulet: Amulet) => void;
  addQuestion: (question: string, answer: string) => void;
  setHasSeenIntroduction: (value: boolean) => void;
  resetFirstLaunch: () => void;
}

export const useAsceticismStore = create<AsceticismStore>()(
  persist(
    (set, get) => ({
      currentAsceticism: null,
      pastAsceticisms: [],
      isFirstLaunch: true,
      hasSeenIntroduction: false,
      
      startAsceticism: (period, restrictions, goal) => {
        const startDate = new Date().toISOString();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + period);
        
        const newAsceticism: Asceticism = {
          id: Date.now().toString(),
          startDate,
          endDate: endDate.toISOString(),
          period,
          restrictions,
          state: 'in_progress',
          currentDay: 1,
          journalEntries: [],
          questions: [],
          goal, // Добавляем цель аскезы
        };
        
        set({ currentAsceticism: newAsceticism });
      },
      
      completeDay: () => {
        const { currentAsceticism } = get();
        if (!currentAsceticism) return;
        
        const updatedAsceticism = {
          ...currentAsceticism,
          currentDay: currentAsceticism.currentDay + 1,
        };
        
        // Check if asceticism is completed
        if (updatedAsceticism.currentDay > updatedAsceticism.period) {
          updatedAsceticism.state = 'completed';
        }
        
        set({ currentAsceticism: updatedAsceticism });
      },
      
      failAsceticism: () => {
        const { currentAsceticism, pastAsceticisms } = get();
        if (!currentAsceticism) return;
        
        const failedAsceticism = {
          ...currentAsceticism,
          state: 'failed' as AsceticismState,
          endDate: new Date().toISOString(),
        };
        
        set({
          currentAsceticism: null,
          pastAsceticisms: [...pastAsceticisms, failedAsceticism],
        });
      },
      
      completeAsceticism: (amulet) => {
        const { currentAsceticism, pastAsceticisms } = get();
        if (!currentAsceticism) return;
        
        const completedAsceticism = {
          ...currentAsceticism,
          state: 'completed' as AsceticismState,
          amulet,
        };
        
        set({
          currentAsceticism: null,
          pastAsceticisms: [...pastAsceticisms, completedAsceticism],
        });
      },
      
      addQuestion: (question, answer) => {
        const { currentAsceticism } = get();
        if (!currentAsceticism) return;
        
        const newQuestion: Question = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          question,
          answer,
        };
        
        const updatedAsceticism = {
          ...currentAsceticism,
          questions: [...currentAsceticism.questions, newQuestion],
        };
        
        set({ currentAsceticism: updatedAsceticism });
      },
      
      setHasSeenIntroduction: (value) => {
        set({ hasSeenIntroduction: value });
      },
      
      resetFirstLaunch: () => {
        set({ isFirstLaunch: false });
      },
    }),
    {
      name: 'asceticism-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);