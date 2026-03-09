import { createClient } from '@supabase/supabase-js';
import products from './prisma/seeds/products';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedSupabase() {
    console.log("Starting to seed Supabase...");

    const formattedProducts = products.map(p => ({
        name: p.name,
        brand: p.brand,
        category: p.category,
        price: p.price,
        specs: p.specs, // Supabase jsonb handles this
        battery: p.battery,
        performance: p.performanceLevel,
        weight: p.weight
    }));

    const { data, error } = await supabase
        .from('products')
        .insert(formattedProducts)
        .select();

    if (error) {
        console.error("Error inserting products:", error);
    } else {
        console.log(`Successfully inserted ${data.length} products into Supabase.`);
    }
}

seedSupabase()
    .catch(console.error)
    .finally(() => process.exit(0));
