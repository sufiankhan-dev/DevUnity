"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SkeletonPulse } from "@/components/LoadingGrid";
import { SpotlightCard } from "@/components/SpotlightCard";
import { PageShell } from "@/components/SectionShell";
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
}

function getReadTime(content: string): string {
  const wordCount = content.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
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
  const postId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : undefined;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(postId));
  const [error, setError] = useState<string | null>(
    postId ? null : "Invalid post ID"
  );
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!postId) return;

    const fetchBlogPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blogs/${postId}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
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
  }, [postId]);

  if (isLoading) return <BlogPostSkeleton />;

  if (error) {
    return (
      <PageShell>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <SpotlightCard className="w-full max-w-md p-8 text-center">
            <p className="text-red-400">{error}</p>
            <Link href="/blogs" className="mt-6 inline-block">
              <Button variant="outline" className="border-zinc-700 text-zinc-300">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
              </Button>
            </Link>
          </SpotlightCard>
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
          No blog post found
        </div>
      </PageShell>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <PageShell withPattern>
      <div className="container mx-auto max-w-4xl px-4 pb-20 pt-20">
        <Link href="/blogs" className="mb-8 inline-flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Blogs
          </Button>
        </Link>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="border-brand/20 bg-brand/5 text-brand font-normal"
              >
                <Clock className="mr-1 h-3 w-3" />
                {getReadTime(post.content)}
              </Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 font-normal">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <Avatar className="h-11 w-11 ring-2 ring-brand/20">
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
                <p className="font-medium text-white">{post.author}</p>
                <p className="text-sm text-zinc-500">Author</p>
              </div>
            </div>
          </header>

          <SpotlightCard className="mb-8 p-8 md:p-10">
            <div
              className="prose prose-invert max-w-none ProseMirror text-zinc-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </SpotlightCard>

          <div className="mb-10 flex flex-wrap gap-3">
            <Button
              className="bg-brand text-zinc-950 hover:bg-brand-dark"
              onClick={() => setLikes(likes + 1)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like ({likes})
            </Button>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
        </article>

        <Separator className="mb-8 bg-zinc-800" />

        <section>
          <h2 className="mb-6 text-xl font-bold text-white">
            Comments ({staticComments.length})
          </h2>
          <div className="space-y-4">
            {staticComments.map((comment) => (
              <SpotlightCard key={comment.id} className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback className="text-xs">
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-white">
                        {comment.author}
                      </h3>
                      <span className="shrink-0 text-xs text-zinc-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function BlogPostSkeleton() {
  return (
    <PageShell>
      <div className="container mx-auto max-w-4xl px-4 pb-20 pt-20">
        <SkeletonPulse className="mb-8 h-8 w-32" />
        <SkeletonPulse className="mb-4 h-6 w-24" />
        <SkeletonPulse className="mb-6 h-12 w-3/4" />
        <div className="mb-8 flex items-center gap-3">
          <SkeletonPulse className="h-11 w-11 rounded-full" />
          <div>
            <SkeletonPulse className="mb-1 h-4 w-28" />
            <SkeletonPulse className="h-3 w-16" />
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800/80 p-8 space-y-4">
          <SkeletonPulse className="h-4 w-full" />
          <SkeletonPulse className="h-4 w-full" />
          <SkeletonPulse className="h-4 w-3/4" />
        </div>
      </div>
    </PageShell>
  );
}
