export type MealShift = 'lunch' | 'dinner';

export interface DailyMenuData {
  day: 'today' | 'tomorrow';
  dateLabel: string;
  shift: MealShift;
  dispatchTime: string;
  isSlotActive: boolean;
  cutoffTime: string;
  customCutoff?: string;
  mainCurries: string;
  breadsGrains: string;
  specialNote: string;
  standardMealRate: number;
  photoUrl: string | null;
  notifySubscribers: boolean;
  activeRegularsCount: number;
}

export interface DishPreset {
  id: string;
  name: string;
  category: string;
  mainCurries: string;
  breadsGrains: string;
  specialNote: string;
  rate: number;
  imageUrl?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  tiffinId: string;
  phone: string;
  address: string;
  streakDays: number;
  dietaryNote: string;
  isLunchConfirmed: boolean;
  isDinnerConfirmed: boolean;
  plan: 'Monthly Deluxe' | 'Weekly Trial' | 'Daily Prepaid';
}

export interface KitchenMetrics {
  totalSubscribers: number;
  confirmedCount: number;
  skippedCount: number;
  pendingCount: number;
  dispatchedCount: number;
}

export type ThemePreset = 'terracotta' | 'turmeric' | 'sage' | 'umber';
