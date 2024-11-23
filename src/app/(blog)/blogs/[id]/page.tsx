"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  readTime: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

const staticComments: Comment[] = [
  {
    id: "1",
    author: "Alice Johnson",
    avatar: "/placeholder.svg",
    content: "Great article! I learned a lot from this.",
    date: "2023-05-15",
  },
  {
    id: "2",
    author: "Bob Smith",
    avatar: "/placeholder.svg",
    content:
      "I have a question about the third point. Can you elaborate more on that?",
    date: "2023-05-16",
  },
  {
    id: "3",
    author: "Charlie Brown",
    avatar: "/placeholder.svg",
    content: "This is exactly what I was looking for. Thanks for sharing!",
    date: "2023-05-17",
  },
];

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!id) {
      setError("Invalid post ID");
      return;
    }

    const fetchBlogPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("An error occurred while fetching the blog post.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-zinc-900 p-6 rounded-lg">
          <p className="text-red-500 text-center">{error}</p>
          <div className="mt-4 text-center">
            <Link href="/blogs">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog List
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        No blog post found
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="min-h-screen bg-zinc-950 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/blogs" className="hidden md:block">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </Link>
        <article className="bg-zinc-900 rounded-lg overflow-hidden">
          <header className="p-6 border-b border-zinc-800">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={post.avatar || "/placeholder.svg"}
                  alt={post.author}
                />
                <AvatarFallback>
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{post.author}</p>
                <div className="flex items-center text-xs text-zinc-400">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="ml-2 mr-1 h-3 w-3" />
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </div>
          </header>
          <div className="p-6">
            <div
              className="prose prose-invert max-w-none ProseMirror text-zinc-300"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
          <footer className="p-6 border-t border-zinc-800">
            <div className="flex items-center space-x-4">
              <Button
                className="bg-[#9CE630] text-black hover:bg-[#8BD520]"
                onClick={() => setLikes(likes + 1)}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({likes})
              </Button>
              <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comment
              </Button>
            </div>
          </footer>
        </article>
        <section className="mt-8 bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Comments</h2>
          <div className="space-y-6">
            {staticComments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-zinc-800 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">
                        {comment.author}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Skeleton className="w-32 h-10 mb-6 bg-zinc-800 hidden md:block" />
        <div className="bg-zinc-900 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <Skeleton className="h-10 w-3/4 mb-4 bg-zinc-800" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
              <div>
                <Skeleton className="h-4 w-24 mb-2 bg-zinc-800" />
                <Skeleton className="h-3 w-32 bg-zinc-800" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
            <Skeleton className="h-4 w-3/4 bg-zinc-800" />
          </div>
          <div className="p-6 border-t border-zinc-800">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-24 bg-zinc-800" />
              <Skeleton className="h-10 w-24 bg-zinc-800" />
            </div>
          </div>
        </div>
        <div className="mt-8 bg-zinc-900 rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-4 bg-zinc-800" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-b border-zinc-800 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 bg-zinc-800" />
                      <Skeleton className="h-3 w-16 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
