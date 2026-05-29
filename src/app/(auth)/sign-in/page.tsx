"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/AuthLayout";
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

    const result = await signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message ?? "Sign in failed");
      setLoading(false);
      return;
    }

    router.push("/blogs");
    router.refresh();
  };

  return (
    <AuthLayout
      title="Welcome back to"
      highlight="DevUnity"
      description="Sign in to continue your journey — ask questions, write blogs, and connect with developers worldwide."
    >
      <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
      <p className="text-sm text-zinc-400 mb-6">
        Enter your credentials to access your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-zinc-700 bg-zinc-800/80 text-white focus-visible:ring-brand/50"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-zinc-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="border-zinc-700 bg-zinc-800/80 text-white focus-visible:ring-brand/50"
            placeholder="••••••••"
          />
        </div>
        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand text-zinc-950 font-semibold hover:bg-brand-dark"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-brand hover:text-brand-light">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
