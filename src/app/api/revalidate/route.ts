import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to trigger on-demand revalidation
 * Triggered by WordPress webhooks when content changes.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');

  // Validate secret to prevent unauthorized revalidation
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const { tag } = await req.json();

    if (!tag) {
      return NextResponse.json({ message: 'Missing tag' }, { status: 400 });
    }

    // Trigger revalidation for the specific tag
    // @ts-ignore
    revalidateTag(tag);

    return NextResponse.json({ 
      revalidated: true, 
      tag,
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: (err as Error).message }, { status: 500 });
  }
}
