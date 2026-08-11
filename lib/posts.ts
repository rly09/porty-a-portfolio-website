import fs from "fs";
import path from "path";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string; author?: string };

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  content: ContentBlock[];
}

const postsDirectory = path.join(process.cwd(), "data", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts: Post[] = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Post;
    });

  return posts.sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (isNaN(timeA) || isNaN(timeB) || timeA === timeB) {
      return b.id - a.id;
    }
    return timeB - timeA;
  });
}
