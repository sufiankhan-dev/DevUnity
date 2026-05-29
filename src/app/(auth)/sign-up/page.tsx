"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signUp.email({ name, email, password });

    if (result.error) {
      setError(result.error.message ?? "Sign up failed");
      setLoading(false);
      return;
    }

    router.push("/complete-profile");
    router.refresh();
  };

  return (
    <AuthLayout
      title="Join"
      highlight="DevUnity"
      description="Create your account and become part of a growing community of developers sharing knowledge and building together."
    >
      <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
      <p className="text-sm text-zinc-400 mb-6">
        Free forever. No credit card required.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-zinc-700 bg-zinc-800/80 text-white focus-visible:ring-brand/50"
            placeholder="Jane Developer"
          />
        </div>
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
            placeholder="At least 8 characters"
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
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-brand hover:text-brand-light">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
