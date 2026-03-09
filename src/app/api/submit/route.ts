import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import Groq from 'groq-sdk';
import { calculateScore } from '@/lib/scoring';

const DISCLAIMER = "AI recommendations are based on general product information. Please verify specifications and price before purchase.";

// Initialize Groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productType, budget, usage, preferences } = body;

    // Validate input
    if (!productType || !budget || !usage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum) || budgetNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid budget value' },
        { status: 400 }
      );
    }

    // Normalize category
    let normalizedType = productType.toLowerCase().trim();
    if (normalizedType.includes('gaming')) normalizedType = 'gaming';
    if (normalizedType.includes('phone')) normalizedType = 'smartphone';
    if (normalizedType.includes('laptop')) normalizedType = 'laptop';

    console.log("Incoming productType:", productType);
    console.log("Normalized category:", normalizedType);

    // Fetch products from Supabase
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('category', normalizedType);

    console.log("Products found:", products?.length);

    if (fetchError) {
      console.error('Supabase error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch products from database' },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      console.warn("No products found for:", normalizedType);
      return NextResponse.json(
        { error: 'No products found in this category' },
        { status: 404 }
      );
    }

    // Filter by budget (exclude products more than 15% above budget)
    const filtered = products.filter(
      (p) => p.price <= budgetNum * 1.15
    );

    if (filtered.length === 0) {
      return NextResponse.json(
        { error: 'No products found within your budget' },
        { status: 404 }
      );
    }

    // Score and rank products
    const scored = filtered.map((p) => {
      const score = calculateScore(p, { budget: budgetNum, usage, preferences });
      return { ...p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top3 = scored.slice(0, 3);

    // Generate AI explanations
    const recommendations = await Promise.all(top3.map(async (product, index) => {
      try {
        const prompt = `Explain why this product is good for a user with these needs:
Usage: ${usage}
Budget: ${budgetNum}
Product: ${product.name}

Generate strictly this JSON format, nothing else, no markdown formatting:
{
  "reason": "short explanation 1-2 lines",
  "pros": ["pro 1", "pro 2", "pro 3"],
  "cons": ["con 1", "con 2"]
}`;

        const completion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'llama-3.1-8b-instant',
        });
        const text = completion.choices[0]?.message?.content || "{}";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : {
          reason: `Recommended for your ${usage} needs.`,
          pros: ["Good value", "Solid performance", "Reliable brand"],
          cons: ["Check local availability", "May lack premium features"]
        };

        return {
          id: product.id || `rec-${index}`,
          productId: product.id,
          productName: product.name,
          name: product.name,
          brand: product.brand,
          price: product.price,
          specs: product.specs,
          score: product.score,
          performance: product.performance,
          battery: product.battery,
          weight: product.weight,
          category: product.category,
          reason: aiData.reason,
          pros: aiData.pros,
          cons: aiData.cons,
          badge: index === 0 ? 'best_performance' : index === 1 ? 'best_budget' : 'balanced_choice'
        };
      } catch (err) {
        console.error('AI generation error for product:', product.name, err);
        return {
          ...product,
          productId: product.id,
          productName: product.name,
          reason: `Recommended for your ${usage} needs.`,
          pros: ["Good value", "Solid performance", "Reliable brand"],
          cons: ["Check local availability", "May lack premium features"],
          badge: 'balanced_choice'
        };
      }
    }));

    // Create request record in Supabase
    const { data: dbRequest, error: requestError } = await supabase
      .from('requests')
      .insert({
        product_type: productType,
        budget: budgetNum,
        usage,
        preferences,
      })
      .select()
      .single();

    if (requestError) {
      console.error('Request insert error:', requestError);
    }

    return NextResponse.json({
      requestId: dbRequest?.id || 'temp-id',
      recommendations,
      disclaimer: DISCLAIMER,
    });
  } catch (error) {
    console.error('Error in submit API:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
