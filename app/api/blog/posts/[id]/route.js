import { NextResponse } from 'next/server';
import { fetchPostById } from '@/lib/util/posts';

// This function acts as the handler for the "/api/blog/posts/[id]" route
export async function GET(request, { params }) {
  console.log(params.id);

  // Await the logic to fetch the post using the postId
  const post = await fetchPostById(params.id);  // Important to use await here!

  // Return the post data as a JSON response
  return NextResponse.json(post);
}
