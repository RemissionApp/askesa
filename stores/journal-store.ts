import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '@/types';
import { useAsceticismStore } from './asceticism-store';

interface JournalStore {
  entries: JournalEntry[];
  addEntry: (content: string, mood: JournalEntry['mood']) => void;
  getEntriesForCurrentAsceticism: () => JournalEntry[];
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],
      
      addEntry: (content, mood) => {
        const currentAsceticism = useAsceticismStore.getState().currentAsceticism;
        if (!currentAsceticism) return;
        
        const newEntry: JournalEntry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          content,
          mood,
        };
        
        set({ entries: [...get().entries, newEntry] });
        
        // Update the current asceticism with the new journal entry
        const updatedAsceticism = {
          ...currentAsceticism,
          journalEntries: [...currentAsceticism.journalEntries, newEntry],
        };
        
        useAsceticismStore.setState({ currentAsceticism: updatedAsceticism });
      },
      
      getEntriesForCurrentAsceticism: () => {
        const currentAsceticism = useAsceticismStore.getState().currentAsceticism;
        if (!currentAsceticism) return [];
        
        return get().entries.filter(entry => {
          const entryDate = new Date(entry.date);
          const startDate = new Date(currentAsceticism.startDate);
          const endDate = new Date(currentAsceticism.endDate);
          
          return entryDate >= startDate && entryDate <= endDate;
        });
      },
    }),
    {
      name: 'journal-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);