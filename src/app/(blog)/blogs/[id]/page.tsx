"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  readTime: string;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!post) {
    return <div>No blog post found</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Card className="w-full max-w-3xl bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6">
            <p className="text-red-500 text-center">{error}</p>
            <div className="mt-4 text-center">
              <Link href="/blog">
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog List
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <Link href="/blog">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog List
          </Button>
        </Link>
        <Card className="w-full max-w-3xl mx-auto bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {post.title}
            </CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-zinc-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button
              variant="outline"
              className="text-zinc-400 hover:text-white"
            >
              Share
            </Button>
            <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
              Follow Author
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <Skeleton className="w-32 h-10 mb-6 bg-zinc-800" />
        <Card className="w-full max-w-3xl mx-auto bg-zinc-900 border-zinc-800">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4 bg-zinc-800" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
              <div>
                <Skeleton className="h-4 w-24 mb-2 bg-zinc-800" />
                <Skeleton className="h-3 w-32 bg-zinc-800" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
            <Skeleton className="h-4 w-full mb-4 bg-zinc-800" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
