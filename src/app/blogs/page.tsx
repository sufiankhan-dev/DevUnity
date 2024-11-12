"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { PenSquare } from "lucide-react";

interface BlogPost {
  _id: any;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col">
      <CardHeader>
        <CardTitle className="text-white">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-zinc-400 line-clamp-2">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
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
            <p className="text-xs text-zinc-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Link href={`/blogs/${post._id}`}>
          <Button
            variant="ghost"
            className="text-[#9CE630] hover:text-[#8BD520] hover:bg-zinc-800"
          >
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const SkeletonCard = () => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-2/3 bg-zinc-800" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
        <Skeleton className="h-4 w-4/5 bg-zinc-800" />
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
          <div>
            <Skeleton className="h-4 w-24 bg-zinc-800" />
            <Skeleton className="h-3 w-16 bg-zinc-800 mt-1" />
          </div>
        </div>
        <Skeleton className="h-9 w-24 bg-zinc-800" />
      </CardFooter>
    </Card>
  );
};

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 mt-12 md:mt-14">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Blog Posts
          </h1>
          <Link href="/blog-add">
            <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
              <PenSquare className="mr-2 h-4 w-4" />
              Post Blog
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
