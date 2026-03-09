import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for Supabase tables
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  specs: Record<string, string | number>;
  performance: number;
  battery: number;
  weight: number;
  image_url?: string;
  created_at: string;
}

export interface RequestRecord {
  id: string;
  product_type: string;
  budget: number;
  usage: string;
  preferences: Record<string, unknown> | null;
  created_at: string;
}

export interface RecommendationRecord {
  id: string;
  request_id: string;
  product_id: string;
  product_name: string;
  price: number;
  specs: Record<string, string | number>;
  reason: string;
  pros: string[];
  cons: string[];
  badge: string;
  score: number;
  created_at: string;
}

export interface ChatMessageRecord {
  id: string;
  request_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface FeedbackRecord {
  id: string;
  recommendation_id: string;
  feedback_type: 'selected' | 'not_suitable';
  created_at: string;
}
