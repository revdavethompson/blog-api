import Link from 'next/link'

export default async function Page() {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/posts/`)
    const posts = await res.json();

    console.log(posts)


    return (
      <div>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/posts/${post.id}`}>
                {console.log(`Your post.id is \n\n${post.title}\n\n`)}
                <h2>{post.title}</h2>
                <p>{post.date}</p>
                {/* Potentially display excerpt or a preview of post.content */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    setError('Failed to load posts. Please try again later.');
  }

}