"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn.email({
      email,
      password,
    });

    if (result.error) {
      setError(result.error.message ?? "Sign in failed");
      setLoading(false);
      return;
    }

    router.push("/blogs");
    router.refresh();
  };

  return (
    <div className="min-h-screen md:max-h-screen bg-zinc-950 flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundPattern />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div className="lg:w-1/2 text-white mb-12 lg:mb-0 hidden lg:block">
          <h1 className="text-4xl font-bold mb-6">
            Welcome Back to <span className="text-[#9CE630]">DevUnity</span>
          </h1>
          <p className="text-xl mb-8">
            Sign in to continue your journey in our growing developer community.
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="bg-zinc-900/80 p-8 rounded-lg backdrop-blur-sm border border-zinc-800 shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#9CE630] text-black hover:bg-[#8BD520]"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-[#9CE630] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
