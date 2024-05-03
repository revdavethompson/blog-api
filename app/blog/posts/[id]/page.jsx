import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

export default async function Page({params}) {
  console.log(`params.id is ${params.id}`)
  const res = await fetch(`http://localhost:3000/api/blog/posts/${params.id}`)
  const post = await res.json();
  const markdown = await post.content
  
  console.log(post)
  

  return (
    <>
      <div>
        <Link href={`/blog/posts/${post.id}`}>
          <h1 className="text-violet-400">{post.title}</h1>
        </Link>
        <p>{post.date}</p>
        <MDXRemote source={markdown} />
      </div>
    </>
  )
}