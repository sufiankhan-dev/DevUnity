"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

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
  const [{ showWelcome, showConfetti }, setWelcomeState] = useState(() => {
    if (typeof window === "undefined") {
      return { showWelcome: false, showConfetti: false };
    }

    const fromCompleteProfile = localStorage.getItem("fromCompleteProfile");
    if (fromCompleteProfile === "true") {
      localStorage.removeItem("fromCompleteProfile");
      return { showWelcome: true, showConfetti: true };
    }

    return { showWelcome: false, showConfetti: false };
  });
  const { data: session } = useSession();

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

  const handleCloseWelcome = () => {
    setWelcomeState({ showWelcome: false, showConfetti: true });
    setTimeout(
      () => setWelcomeState((state) => ({ ...state, showConfetti: false })),
      1500
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={200}
          colors={["#9CE630", "#8BD520", "#FFFFFF"]}
        />
      )}

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-zinc-900 p-8 rounded-lg shadow-lg text-center max-w-lg w-full mx-4">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                Welcome to <span className="text-[#8BD520]">DevUnity,</span>{" "}
                {session?.user?.name || "Developer"}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-6 text-zinc-300"
              >
                Your journey as part of our community begins now. Connect,
                learn, and grow with fellow developers from around the world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              ></motion.div>
              <Button
                onClick={handleCloseWelcome}
                className="bg-[#9CE630] text-black hover:bg-[#8BD520] text-lg px-8 py-3"
              >
                Let's Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white mt-14">
          Our Community
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : users.map((profile) => (
                <Card key={profile.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={profile.profileImage}
                        alt={profile.username}
                      />
                      <AvatarFallback>
                        {profile.username
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-white">
                      {profile.username}
                    </CardTitle>
                    <p className="text-sm text-zinc-400">{profile.role}</p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4 text-zinc-400">{profile.description}</p>
                    <div className="flex justify-center space-x-4">
                      {profile.github && (
                        <Link
                          href={profile.github}
                          className="text-zinc-400 hover:text-[#8BD520]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-6 w-6" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      )}
                      {profile.linkedin && (
                        <Link
                          href={profile.linkedin}
                          className="text-zinc-400 hover:text-[#8BD520]"
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
