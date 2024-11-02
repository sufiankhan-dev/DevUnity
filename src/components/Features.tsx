import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Users, BookOpen } from "lucide-react";

const Features = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <MessageSquare className="h-12 w-12 text-[#9CE630]" />
            <CardTitle className="text-white pt-4">Ask & Answer</CardTitle>
            <CardDescription className="text-zinc-400">
              Post your questions and help others by sharing your knowledge
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <BookOpen className="h-12 w-12 text-[#9CE630]" />
            <CardTitle className="text-white pt-4">Blog Posts</CardTitle>
            <CardDescription className="text-zinc-400">
              Share your insights and experiences through detailed blog posts
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <Users className="h-12 w-12 text-[#9CE630]" />
            <CardTitle className="text-white pt-4">Community</CardTitle>
            <CardDescription className="text-zinc-400">
              Connect with like-minded developers and grow together
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Features;
