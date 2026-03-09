import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let selectedCategory = category?.toLowerCase().trim();
    if (selectedCategory?.includes('gaming')) selectedCategory = 'gaming';
    if (selectedCategory?.includes('phone')) selectedCategory = 'smartphone';
    if (selectedCategory?.includes('laptop')) selectedCategory = 'laptop';

    if (!selectedCategory || selectedCategory === 'all') {
      const { data } = await supabase.from("products").select("brand");
      const brands = [...new Set(data?.map(p => p.brand) || [])];
      return NextResponse.json({ brands: brands.sort((a, b) => a.localeCompare(b)) });
    }

    const { data, error } = await supabase
      .from("products")
      .select("brand")
      .eq("category", selectedCategory);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 });
    }

    const brands = [...new Set(data?.map(p => p.brand) || [])];
    const sortedBrands = brands.sort((a, b) => a.localeCompare(b));

    return NextResponse.json({ brands: sortedBrands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}
