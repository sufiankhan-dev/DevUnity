"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, PenSquare, Clock, ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import DOMPurify from "isomorphic-dompurify";
import { PageShell } from "@/components/SectionShell";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { LoadingGrid, SkeletonPulse } from "@/components/LoadingGrid";
import { EmptyState } from "@/components/EmptyState";
import { BookOpen } from "lucide-react";

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

const BlogCard = ({ post }: { post: BlogPost }) => {
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const plainTextContent = sanitizedContent.replace(/<[^>]+>/g, "");

  return (
    <SpotlightCard className="flex flex-col h-full">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-brand/20 bg-brand/5 text-brand font-normal text-xs"
          >
            <Clock className="mr-1 h-3 w-3" />
            {getReadTime(post.content)}
          </Badge>
        </div>
        <h3 className="mb-3 text-lg font-semibold text-white line-clamp-2 leading-snug">
          {post.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-3">
          {plainTextContent}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8 ring-1 ring-zinc-700">
              <AvatarImage
                src={post.avatar || "/placeholder.svg"}
                alt={post.author}
              />
              <AvatarFallback className="text-xs">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{post.author}</p>
              <p className="flex items-center text-xs text-zinc-500">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Link href={`/blogs/${post._id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-brand hover:bg-brand/10 hover:text-brand-light"
            >
              Read
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
};

const SkeletonCard = () => (
  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
    <SkeletonPulse className="mb-4 h-5 w-20" />
    <SkeletonPulse className="mb-3 h-6 w-3/4" />
    <SkeletonPulse className="mb-2 h-4 w-full" />
    <SkeletonPulse className="mb-2 h-4 w-full" />
    <SkeletonPulse className="mb-6 h-4 w-4/5" />
    <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
      <div className="flex items-center gap-2">
        <SkeletonPulse className="h-8 w-8 rounded-full" />
        <div>
          <SkeletonPulse className="h-4 w-20 mb-1" />
          <SkeletonPulse className="h-3 w-16" />
        </div>
      </div>
      <SkeletonPulse className="h-8 w-16" />
    </div>
  </div>
);

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const isSignedIn = Boolean(session?.user);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handlePostBlog = () => {
    if (isSignedIn) {
      router.push("/blog-add");
    } else {
      toast.error("You must be logged in to post a blog.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid rgba(156,230,48,0.3)",
        },
      });
    }
  };

  return (
    <PageShell withPattern>
      <Toaster />
      <div className="container mx-auto px-4 pb-16">
        <PageHeader
          title="Developer"
          highlight="Insights"
          subtitle="Stories, tutorials, and perspectives from the DevUnity community."
        >
          <Button
            className="bg-brand text-zinc-950 font-semibold hover:bg-brand-dark shadow-[0_0_20px_-5px_rgba(156,230,48,0.3)]"
            onClick={handlePostBlog}
          >
            <PenSquare className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Share Your Knowledge</span>
            <span className="md:hidden">Write Post</span>
          </Button>
        </PageHeader>

        {isLoading ? (
          <LoadingGrid count={6} renderItem={(i) => <SkeletonCard key={i} />} />
        ) : blogPosts.length === 0 ? (
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="No blog posts yet"
            description="Be the first to share your knowledge with the community."
            action={
              <Button
                className="bg-brand text-zinc-950 hover:bg-brand-dark"
                onClick={handlePostBlog}
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Write the first post
              </Button>
            }
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
