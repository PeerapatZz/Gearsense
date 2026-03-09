// GearSense AI Store
// Manages application state with Zustand

import { create } from 'zustand';

export type Page = 'home' | 'recommend' | 'loading' | 'results' | 'history' | 'dashboard';

export interface ProductRecommendation {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  price: number;
  specs: Record<string, string | number>;
  reason: string;
  pros: string[];
  cons: string[];
  badge: 'best_performance' | 'best_budget' | 'balanced_choice';
  score: number;
  performance: number;
  battery: number;
  weight: number;
  category: string;
}

export interface RecommendationRequest {
  productType: string;
  budget: number;
  usage: string;
  preferences: {
    batteryImportant: boolean;
    lightweight: boolean;
    highPerformance: boolean;
  };
}

export interface AppState {
  // Navigation
  currentPage: Page;
  setCurrentPage: (page: Page) => void;

  // Request form
  request: RecommendationRequest | null;
  setRequest: (request: RecommendationRequest) => void;

  // Results
  recommendations: ProductRecommendation[];
  setRecommendations: (recommendations: ProductRecommendation[]) => void;
  disclaimer: string;
  setDisclaimer: (disclaimer: string) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;

  // Selected recommendation for feedback
  selectedRecommendation: string | null;
  setSelectedRecommendation: (id: string | null) => void;

  // Chat panel state
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  selectedProductForChat: ProductRecommendation | null;
  setSelectedProductForChat: (product: ProductRecommendation | null) => void;

  // Form step
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;



  // Reset
  reset: () => void;
  resetForm: () => void;
}

const initialState = {
  currentPage: 'home' as Page,
  request: null,
  recommendations: [],
  disclaimer: '',
  isLoading: false,
  loadingProgress: 0,
  loadingMessage: '',
  selectedRecommendation: null,
  isChatOpen: false,
  selectedProductForChat: null,
  currentStep: 1,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  setCurrentPage: (page) => set({ currentPage: page }),

  setRequest: (request) => set({ request }),

  setRecommendations: (recommendations) => set({ recommendations }),

  setDisclaimer: (disclaimer) => set({ disclaimer }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),

  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),

  setSelectedRecommendation: (selectedRecommendation) => set({ selectedRecommendation }),

  isChatOpen: false,
  setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  selectedProductForChat: null,
  setSelectedProductForChat: (selectedProductForChat) => set({ selectedProductForChat }),

  currentStep: 1,
  setCurrentStep: (currentStep) => set({ currentStep }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),



  reset: () => set(initialState),
  resetForm: () => set({
    currentStep: 1,
    request: null,
    recommendations: [],
    disclaimer: '',
    selectedRecommendation: null,
    selectedProductForChat: null,
    isChatOpen: false,
  }),
}));
