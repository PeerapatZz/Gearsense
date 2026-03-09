import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recommendationId, feedbackType } = body;

    if (!recommendationId || !feedbackType) {
      return NextResponse.json(
        { error: 'Missing recommendationId or feedbackType' },
        { status: 400 }
      );
    }

    // Validate feedback type
    const validTypes = ['selected', 'not_suitable'];
    if (!validTypes.includes(feedbackType)) {
      return NextResponse.json(
        { error: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    // Insert feedback record
    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert({
        recommendation_id: recommendationId,
        feedback_type: feedbackType,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback: {
        id: feedback.id,
        recommendationId: feedback.recommendation_id,
        feedbackType: feedback.feedback_type,
        createdAt: feedback.created_at,
      },
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { count: total, error: totalError } = await supabase
      .from('feedback')
      .select('id', { count: 'exact', head: true });

    if (totalError) {
      console.error('Supabase error:', totalError);
    }

    const { count: selected, error: selectedError } = await supabase
      .from('feedback')
      .select('id', { count: 'exact', head: true })
      .eq('feedback_type', 'selected');

    if (selectedError) {
      console.error('Supabase error:', selectedError);
    }

    const { count: notSuitable, error: notSuitableError } = await supabase
      .from('feedback')
      .select('id', { count: 'exact', head: true })
      .eq('feedback_type', 'not_suitable');

    if (notSuitableError) {
      console.error('Supabase error:', notSuitableError);
    }

    const totalFeedback = total || 0;
    const selectedCount = selected || 0;
    const satisfactionRate = totalFeedback > 0 
      ? Math.round((selectedCount / totalFeedback) * 100) 
      : 0;

    return NextResponse.json({
      total: totalFeedback,
      selected: selectedCount,
      notSuitable: notSuitable || 0,
      satisfactionRate,
    });
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback stats' },
      { status: 500 }
    );
  }
}
