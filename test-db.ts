import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log("Testing Supabase connection at", supabaseUrl);

    // Test categories
    const categories = ['smartphone', 'laptop', 'gaming'];

    for (const cat of categories) {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category", cat);

        if (error) {
            console.error(`Error fetching ${cat}:`, error.message);
        } else {
            console.log(`Found ${data.length} products for category: ${cat}`);
            if (data.length > 0) {
                console.log(`Sample internal product:`, data[0].name);
            }
        }
    }
}

testConnection()
    .catch(console.error)
    .finally(() => process.exit(0));
