// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Github, Linkedin } from "lucide-react";

// export default function CommunityPage() {
//   const members = [
//     {
//       name: "Abeer Khan",
//       role: "Frontend Developer",
//       description:
//         "Passionate about creating beautiful and accessible user interfaces.",
//       avatar: "/placeholder.svg?height=100&width=100",
//       github: "",
//       linkedin: "",
//     },
//     {
//       name: "Ahmed Khan",
//       role: "Backend Engineer",
//       description: "Experienced in building scalable server-side applications.",
//       avatar: "/placeholder.svg?height=100&width=100",
//       github: "",
//       linkedin: "",
//     },
//     {
//       name: "Sufian Khan",
//       role: "Full Stack Developer",
//       description:
//         "Loves working on end-to-end solutions and learning new technologies.",
//       avatar: "/placeholder.svg?height=100&width=100",
//       github: "https://github.com/sufiankhan-dev",
//       linkedin: "https://www.linkedin.com/in/sufian-khan-dev",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-zinc-950">
//       <div className="container mx-auto px-4 py-8 ">
//         <h1 className="mb-8 text-4xl font-bold text-white mt-14">
//           Our Community
//         </h1>
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {members.map((member, index) => (
//             <Card key={index} className="bg-zinc-900 border-zinc-800">
//               <CardHeader className="flex flex-col items-center">
//                 <Avatar className="h-24 w-24">
//                   <AvatarImage src={member.avatar} alt={member.name} />
//                   <AvatarFallback>
//                     {member.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <CardTitle className="mt-4 text-white">{member.name}</CardTitle>
//                 <p className="text-sm text-zinc-400">{member.role}</p>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="mb-4 text-zinc-400">{member.description}</p>
//                 <div className="flex justify-center space-x-4">
//                   <Link
//                     href={member.github}
//                     className="text-zinc-400 hover:text-white"
//                   >
//                     <Github className="h-6 w-6" />
//                     <span className="sr-only">GitHub</span>
//                   </Link>
//                   <Link
//                     href={member.linkedin}
//                     className="text-zinc-400 hover:text-white"
//                   >
//                     <Linkedin className="h-6 w-6" />
//                     <span className="sr-only">LinkedIn</span>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

const SkeletonCard = () => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-col items-center">
      <Skeleton className="h-20 w-24 rounded-full bg-zinc-800" />
      <Skeleton className="h-6 w-32 mt-4 bg-zinc-800" />
      <Skeleton className="h-4 w-24 mt-2 bg-zinc-800" />
    </CardHeader>
    <CardContent className="text-center">
      <Skeleton className="h-4 w-full mb-2 bg-zinc-800" />
      <Skeleton className="h-4 w-5/6 mx-auto mb-2 bg-zinc-800" />
      <Skeleton className="h-4 w-4/6 mx-auto mb-4 bg-zinc-800" />
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
        <Skeleton className="h-6 w-6 rounded-full bg-zinc-800" />
      </div>
    </CardContent>
  </Card>
);

export default function CommunityPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white mt-14">
          Our Community
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : users.map((user, index) => (
                <Card key={index} className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={user.profileImage}
                        alt={user.username}
                      />
                      <AvatarFallback>
                        {user.username
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-white">
                      {user.username}
                    </CardTitle>
                    <p className="text-sm text-zinc-400">{user.role}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4 text-zinc-400">{user.description}</p>
                    <div className="flex justify-center space-x-4">
                      {user.github && (
                        <Link
                          href={user.github}
                          className="text-zinc-400 hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-6 w-6" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      )}
                      {user.linkedin && (
                        <Link
                          href={user.linkedin}
                          className="text-zinc-400 hover:text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-6 w-6" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}
