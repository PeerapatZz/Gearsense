// AI Types and Client Functions for GearSense AI
// This file contains only types and API-calling functions (client-safe)

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ProductContext {
  name: string;
  brand: string;
  price: number;
  category: string;
  specs: Record<string, string | number>;
  performance: number;
  battery: number;
  weight: number;
  reason?: string;
  pros?: string[];
  cons?: string[];
  badge?: string;
  score?: number;
}

export const DISCLAIMER = "AI recommendations are based on general product information. Please verify specifications and price before purchase.";

export const LOADING_MESSAGES = [
  "Analyzing your requirements...",
  "Searching product database...",
  "Comparing specifications...",
  "Calculating best matches...",
  "Generating recommendations...",
  "Finalizing suggestions..."
];

export function getRandomLoadingMessage(index: number): string {
  return LOADING_MESSAGES[index % LOADING_MESSAGES.length];
}

// Debounce utility
function debounce<Args extends any[], R>(
  func: (...args: Args) => Promise<R>,
  wait: number
): (...args: Args) => Promise<R> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastResult: R;

  return async (...args: Args): Promise<R> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        lastResult = await func(...args);
        resolve(lastResult);
      }, wait);
    });
  };
}

// Client-side AI functions that call API routes
export async function askAboutProducts(
  question: string,
  products: ProductContext[],
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        products,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    const data = await response.json();
    return data.answer || data.response || "I couldn't process your question. Please try again.";
  } catch (error) {
    console.error('Chat error:', error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}

export async function askAboutProduct(
  question: string,
  product: ProductContext,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        selectedProduct: product,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    const data = await response.json();
    return data.answer || data.response || "I couldn't process your question. Please try again.";
  } catch (error) {
    console.error('Chat error:', error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}

// Debounced versions for typing in chat
export const debouncedAskAboutProducts = debounce(askAboutProducts, 300);
export const debouncedAskAboutProduct = debounce(askAboutProduct, 300);
