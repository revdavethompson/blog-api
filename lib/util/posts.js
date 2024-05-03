import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function fetchPostById(id) {
  const fullPath = `.${process.env.POSTS_DIRECTORY}/${id}.mdx`;
  console.log(`The fullPath Name is: \n\n${fullPath}\n\n`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf-8');
    console.log(`Your fileContents are:\n\n${fileContents}\n\n`);

    // Use gray-matter to parse the markdown front matter
    const { data, content } = matter(fileContents);
    return { ...data, content };  // Combine metadata with content

  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}

// Function to fetch all posts
export async function fetchAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  try {
    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      return { ...data, content };  // Combine metadata with content
    }));
    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;  // Re-throw to be caught by the route handler
  }
}