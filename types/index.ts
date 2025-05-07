export type Restriction = {
  id: string;
  title: string;
  description: string;
  custom?: string;
};

export type AsceticismPeriod = 1 | 3 | 7 | 21 | 40;

export type AsceticismState = 'not_started' | 'in_progress' | 'completed' | 'failed';

export type Asceticism = {
  id: string;
  startDate: string;
  endDate: string;
  period: AsceticismPeriod;
  restrictions: Restriction[];
  state: AsceticismState;
  currentDay: number;
  journalEntries: JournalEntry[];
  questions: Question[];
  amulet?: Amulet;
  goal?: string; // Добавлено поле для цели аскезы
};

export type JournalEntry = {
  id: string;
  date: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
};

export type Question = {
  id: string;
  date: string;
  question: string;
  answer: string;
};

export type Amulet = {
  id: string;
  symbol: string;
  name: string;
  description: string;
  date: string;
};