import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const productType = searchParams.get('productType');
    const usage = searchParams.get('usage');

    // Build query
    let query = supabase
      .from('requests')
      .select(`
        id,
        product_type,
        budget,
        usage,
        preferences,
        created_at,
        recommendations (
          product_name,
          score,
          badge
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (productType && productType !== 'all') {
      query = query.eq('product_type', productType.toLowerCase());
    }
    if (usage && usage !== 'all') {
      query = query.eq('usage', usage.toLowerCase());
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch history' },
        { status: 500 }
      );
    }

    // Format history items
    const history = (requests || []).map((req: Record<string, unknown>) => {
      const recommendations = req.recommendations as Array<{ product_name: string; score: number; badge: string }> | undefined;
      return {
        id: req.id as string,
        productType: req.product_type as string,
        budget: req.budget as number,
        usage: req.usage as string,
        preferences: req.preferences,
        topRecommendation: recommendations?.[0]?.product_name || 'N/A',
        topScore: recommendations?.[0]?.score || 0,
        createdAt: req.created_at as string,
      };
    });

    // Get total count for pagination
    let countQuery = supabase
      .from('requests')
      .select('id', { count: 'exact', head: true });
    
    if (productType && productType !== 'all') {
      countQuery = countQuery.eq('product_type', productType.toLowerCase());
    }
    if (usage && usage !== 'all') {
      countQuery = countQuery.eq('usage', usage.toLowerCase());
    }

    const { count } = await countQuery;

    return NextResponse.json({
      history,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: offset + limit < (count || 0),
      },
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
