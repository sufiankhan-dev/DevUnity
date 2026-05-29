"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useSession } from "@/lib/auth-client";
import { PageShell } from "@/components/SectionShell";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { LoadingGrid, SkeletonPulse } from "@/components/LoadingGrid";
import { EmptyState } from "@/components/EmptyState";
import { Github, Linkedin, Users, Sparkles, X } from "lucide-react";

const SkeletonCard = () => (
  <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-6">
    <div className="flex flex-col items-center">
      <SkeletonPulse className="h-24 w-24 rounded-full" />
      <SkeletonPulse className="mt-4 h-5 w-32" />
      <SkeletonPulse className="mt-2 h-4 w-24" />
      <SkeletonPulse className="mt-4 h-4 w-full" />
      <SkeletonPulse className="mt-2 h-4 w-5/6" />
      <div className="mt-4 flex gap-3">
        <SkeletonPulse className="h-8 w-8 rounded-lg" />
        <SkeletonPulse className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  </div>
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
    <PageShell withPattern>
      {showConfetti && typeof window !== "undefined" && (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand/20 bg-zinc-900/95 p-8 text-center shadow-[0_0_60px_-10px_rgba(156,230,48,0.2)] backdrop-blur-xl"
            >
              <button
                onClick={handleCloseWelcome}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Close welcome modal"
              >
                <X className="h-4 w-4" />
              </button>
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-brand" />
              <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                Welcome to{" "}
                <span className="text-brand">DevUnity</span>,{" "}
                {session?.user?.name || "Developer"}!
              </h2>
              <p className="mb-8 text-zinc-400 leading-relaxed">
                Your journey begins now. Connect, learn, and grow with fellow
                developers from around the world.
              </p>
              <Button
                onClick={handleCloseWelcome}
                size="lg"
                className="bg-brand px-10 text-zinc-950 font-semibold hover:bg-brand-dark"
              >
                Let&apos;s Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 pb-16">
        <PageHeader
          title="Our"
          highlight="Community"
          subtitle="Meet the developers building, sharing, and growing together on DevUnity."
        />

        {!isLoading && users.length > 0 && (
          <Badge
            variant="outline"
            className="mb-8 border-brand/20 bg-brand/5 text-brand"
          >
            <Users className="mr-1.5 h-3.5 w-3.5" />
            {users.length} member{users.length !== 1 ? "s" : ""}
          </Badge>
        )}

        {isLoading ? (
          <LoadingGrid count={6} renderItem={(i) => <SkeletonCard key={i} />} />
        ) : users.length === 0 ? (
          <EmptyState
            icon={<Users className="h-6 w-6" />}
            title="No members yet"
            description="Be the first to complete your profile and join the community."
            action={
              <Link href="/sign-up">
                <Button className="bg-brand text-zinc-950 hover:bg-brand-dark">
                  Join DevUnity
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {users.map((profile) => (
              <SpotlightCard key={profile.id} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 ring-2 ring-brand/20 ring-offset-2 ring-offset-zinc-900">
                    <AvatarImage
                      src={profile.profileImage}
                      alt={profile.username}
                    />
                    <AvatarFallback className="bg-zinc-800 text-lg">
                      {profile.username
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {profile.username}
                  </h3>
                  <Badge
                    variant="outline"
                    className="mt-1.5 border-zinc-700 text-zinc-400 font-normal"
                  >
                    {profile.role}
                  </Badge>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {profile.description}
                  </p>
                  <div className="mt-5 flex gap-3">
                    {profile.github && (
                      <Link
                        href={profile.github}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/80 text-zinc-400 transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    )}
                    {profile.linkedin && (
                      <Link
                        href={profile.linkedin}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700/80 text-zinc-400 transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
