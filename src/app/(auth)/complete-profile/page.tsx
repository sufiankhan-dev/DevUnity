"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PageShell } from "@/components/SectionShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GradientText } from "@/components/GradientText";
import {
  Github,
  Linkedin,
  Briefcase,
  FileText,
  Loader2,
  UserCheck,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const CompleteProfile = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    description: "",
    linkedin: "",
    github: "",
    profileImageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ role: "", description: "" });

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  const completedFields = [
    formData.role.trim(),
    formData.description.trim(),
    formData.github.trim() || formData.linkedin.trim(),
  ].filter(Boolean).length;

  const progress = Math.round((completedFields / 3) * 100);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "description") {
      const words = value.trim().split(/\s+/);
      if (words.length > 30) {
        setFormData((prev) => ({
          ...prev,
          [name]: words.slice(0, 30).join(" "),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { role: "", description: "" };
    if (!formData.role.trim()) newErrors.role = "Role is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";

    if (newErrors.role || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          username: formData.username || session?.user?.name || "Anonymous",
          profileImageUrl:
            formData.profileImageUrl || session?.user?.image || "",
        }),
      });

      if (response.ok) {
        localStorage.setItem("fromCompleteProfile", "true");
        router.push("/community");
      } else {
        throw new Error(`Failed to add user: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = formData.description.trim()
    ? formData.description.trim().split(/\s+/).length
    : 0;

  return (
    <PageShell withPattern>
      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <SpotlightCard className="w-full max-w-lg p-8">
          <div className="mb-6 text-center">
            <UserCheck className="mx-auto mb-3 h-10 w-10 text-brand" />
            <h1 className="text-2xl font-bold text-white">
              Complete Your <GradientText>Profile</GradientText>
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Step 2 of 2 — Tell the community about yourself
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs text-zinc-500">
              <span>Profile completion</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-zinc-800 [&>div]:bg-brand" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-zinc-300">
                Role
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="role"
                  name="role"
                  placeholder="Backend Developer"
                  value={formData.role}
                  onChange={handleChange}
                  className="border-zinc-700 bg-zinc-800/80 pl-10 text-white focus-visible:ring-brand/50"
                />
              </div>
              {errors.role && (
                <p className="text-sm text-red-400">{errors.role}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-300">
                Short Description
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about yourself..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px] border-zinc-700 bg-zinc-800/80 pl-10 text-white focus-visible:ring-brand/50"
                />
              </div>
              <p className="text-xs text-zinc-500">{wordCount}/30 words</p>
              {errors.description && (
                <p className="text-sm text-red-400">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-zinc-300">
                LinkedIn
              </Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="border-zinc-700 bg-zinc-800/80 pl-10 text-white focus-visible:ring-brand/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="text-zinc-300">
                GitHub
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="github"
                  name="github"
                  placeholder="https://github.com/johndoe"
                  value={formData.github}
                  onChange={handleChange}
                  className="border-zinc-700 bg-zinc-800/80 pl-10 text-white focus-visible:ring-brand/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-2 w-full bg-brand text-zinc-950 font-semibold hover:bg-brand-dark"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Complete Profile & Join Community"
              )}
            </Button>
          </form>
        </SpotlightCard>
      </div>
    </PageShell>
  );
};

export default CompleteProfile;
