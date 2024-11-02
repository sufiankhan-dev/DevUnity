import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Database,
  Globe,
  Layout,
  Smartphone,
  Terminal,
} from "lucide-react";

export default function ExplorePage() {
  const categories = [
    { name: "Web Development", icon: Globe },
    { name: "Mobile Development", icon: Smartphone },
    { name: "Backend Development", icon: Database },
    { name: "DevOps", icon: Terminal },
    { name: "UI/UX Design", icon: Layout },
    { name: "Data Science", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white">Explore Topics</h1>
        <div className="mb-8">
          <Input
            className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
            placeholder="Search topics..."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center space-x-4">
                <category.icon className="h-8 w-8 text-[#9CE630]" />
                <CardTitle className="text-white">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Explore topics related to {category.name.toLowerCase()}.
                </p>
                <Button className="mt-4 bg-[#9CE630] text-black hover:bg-[#8BD520]">
                  View Topics
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
