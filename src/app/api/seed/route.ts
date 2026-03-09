import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import products from '../../../../prisma/seeds/products';

export async function GET() {
    try {
        console.log("Seeding Supabase...");

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

        // Insert the products
        const { data, error } = await supabase
            .from('products')
            .insert(formattedProducts)
            .select();

        if (error) {
            console.error("Error inserting products:", error);
            return NextResponse.json({
                success: false,
                error: error.message,
                hint: "If this says 'relation products does not exist', make sure you ran the SQL in the Supabase Dashboard. If it says RLS violated, make sure you enabled public inserts."
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Successfully inserted ${data?.length || 0} products into Supabase. You can return to the app now!`
        });
    } catch (err) {
        console.error("Exception seeding DB:", err);
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
