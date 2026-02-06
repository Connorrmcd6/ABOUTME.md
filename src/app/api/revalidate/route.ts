import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { env } from '@/lib/env';

/**
 * API endpoint for on-demand revalidation
 *
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&path=/portfolio
 * POST /api/revalidate?secret=YOUR_SECRET&path=/articles
 * POST /api/revalidate?secret=YOUR_SECRET&path=/
 *
 * Can be triggered by GitHub webhooks for instant updates
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Check for secret to confirm this is a valid request
  if (env.REVALIDATION_TOKEN && secret !== env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json(
      { message: 'Missing path parameter' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for testing (only in development)
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Not available in production' },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '/';

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
