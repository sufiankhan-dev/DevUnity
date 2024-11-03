import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, BookOpen, Code } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      title: "Vibrant Community",
      description: "Connect with developers from around the world",
      icon: Users,
    },
    {
      title: "Knowledge Sharing",
      description: "Ask questions and share your expertise",
      icon: MessageSquare,
    },
    {
      title: "Blog Platform",
      description: "Write and read insightful tech articles",
      icon: BookOpen,
    },
    {
      title: "Code Collaboration",
      description: "Work together on exciting projects",
      icon: Code,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white text-center mt-12 md:mt-14">
          About DevUnity
        </h1>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-zinc-400">
            DevUnity is a thriving community platform designed to bring
            developers together, foster collaboration, and promote knowledge
            sharing. Our mission is to create an inclusive space where
            developers of all levels can learn, grow, and connect with
            like-minded individuals.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center space-x-4">
                <feature.icon className="h-8 w-8 text-[#9CE630]" />
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Join Our Community Today
          </h2>
          <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
