import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin } from "lucide-react";

export default function CommunityPage() {
  const members = [
    {
      name: "Abeer Khan",
      role: "Frontend Developer",
      description:
        "Passionate about creating beautiful and accessible user interfaces.",
      avatar: "/placeholder.svg?height=100&width=100",
      github: "",
      linkedin: "",
    },
    {
      name: "Ahmed Khan",
      role: "Backend Engineer",
      description: "Experienced in building scalable server-side applications.",
      avatar: "/placeholder.svg?height=100&width=100",
      github: "",
      linkedin: "",
    },
    {
      name: "Sufian Khan",
      role: "Full Stack Developer",
      description:
        "Loves working on end-to-end solutions and learning new technologies.",
      avatar: "/placeholder.svg?height=100&width=100",
      github: "https://github.com/sufiankhan-dev",
      linkedin: "https://www.linkedin.com/in/sufian-khan-dev",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="mb-8 text-4xl font-bold text-white mt-14">
          Our Community
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-white">{member.name}</CardTitle>
                <p className="text-sm text-zinc-400">{member.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4 text-zinc-400">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href={member.github}
                    className="text-zinc-400 hover:text-white"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href={member.linkedin}
                    className="text-zinc-400 hover:text-white"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
