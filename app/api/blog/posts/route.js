import { NextResponse } from 'next/server';
import { fetchAllPosts } from '@/lib/util/posts';

// Handler to fetch all blog posts
export async function GET() {
  try {
    const posts = await fetchAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
