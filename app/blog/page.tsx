import { getAllPosts } from "@/lib/posts";
import { BlogClient } from "./BlogClient";

// ISR fallback: re-render at most once per hour so new posts appear
// even if the Vercel Deploy Hook isn't triggered.
export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogClient posts={posts} />;
}
