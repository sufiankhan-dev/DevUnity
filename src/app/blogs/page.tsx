import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenSquare } from "lucide-react";

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Getting Started with React Hooks",
      excerpt:
        "Learn how to use React Hooks to simplify your components and manage state more efficiently.",
      author: "Abeer Khan",
      date: "2024-03-15",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt:
        "Discover best practices for creating robust and scalable backend services using Node.js and Express.",
      author: "Sufian Khan",
      date: "2024-03-10",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Introduction to GraphQL",
      excerpt:
        "Explore the benefits of GraphQL and how it can improve your API development process.",
      author: "Ahmed Khan",
      date: "2024-03-05",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 mt-12 md:mt-14">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Blog Posts
          </h1>
          <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
            <PenSquare className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {post.author}
                    </p>
                    <p className="text-xs text-zinc-400">{post.date}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#9CE630] hover:text-[#8BD520] hover:bg-zinc-800"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
