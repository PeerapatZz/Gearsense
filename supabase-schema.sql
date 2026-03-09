-- Setup script for GearSense AI Supabase Database

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  specs jsonb NOT NULL,
  battery integer NOT NULL,
  performance integer NOT NULL,
  weight numeric NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_type text NOT NULL,
  budget numeric NOT NULL,
  usage text NOT NULL,
  preferences jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.recommendations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id uuid REFERENCES public.requests(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id),
  product_name text NOT NULL,
  price numeric NOT NULL,
  specs jsonb NOT NULL,
  reason text NOT NULL,
  pros jsonb NOT NULL,
  cons jsonb NOT NULL,
  badge text,
  score numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id uuid REFERENCES public.recommendations(id) ON DELETE CASCADE,
  feedback_type text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configure Row Level Security (RLS)
-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow anonymous access (since we use anon key in the app)
-- Allow anyone to read products
CREATE POLICY "Allow public read access to products" 
ON public.products FOR SELECT USING (true);

-- Allow anyone to insert requests and read their own (or all for simplicity in this app)
CREATE POLICY "Allow public insert to requests" 
ON public.requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to requests" 
ON public.requests FOR SELECT USING (true);

-- Allow anyone to insert and read recommendations
CREATE POLICY "Allow public insert to recommendations" 
ON public.recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to recommendations" 
ON public.recommendations FOR SELECT USING (true);

-- Allow anyone to insert feedback
CREATE POLICY "Allow public insert to feedback" 
ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read to feedback" 
ON public.feedback FOR SELECT USING (true);

-- Allow anyone to insert products (needed for the seeding script, can be disabled later)
CREATE POLICY "Allow public insert to products" 
ON public.products FOR INSERT WITH CHECK (true);
