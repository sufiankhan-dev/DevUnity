"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Github,
  Linkedin,
  User,
  Briefcase,
  FileText,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

const CompleteProfile = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: user?.fullName || "Anonymous",
    role: "",
    description: "",
    linkedin: "",
    github: "",
    profileImageUrl: user?.imageUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    role: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "description") {
      const words = value.trim().split(/\s+/);
      if (words.length > 30) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: words.slice(0, 30).join(" "),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { role: string; description: string } = {
      role: "",
      description: "",
    };
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        localStorage.setItem("fromCompleteProfile", "true");
        router.push("/community");
      } else {
        throw new Error(
          `Failed to add user: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = formData.description.trim().split(/\s+/).length;

  return (
    <div className="min-h-screen flex items-center py-5 justify-center bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />
      </div>

      <Card className="w-full max-w-md bg-zinc-900/80 border-zinc-800 backdrop-blur-sm shadow-xl relative z-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <Input
                  id="role"
                  type="text"
                  name="role"
                  placeholder="Backend Developer"
                  value={formData.role}
                  onChange={handleChange}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Short Description (Max 30 words)
              </Label>
              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-zinc-400"
                  size={18}
                />
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about yourself..."
                  value={formData.description}
                  onChange={handleChange}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                />
              </div>
              <p className="text-sm text-zinc-400">
                Word count: {wordCount}/30
              </p>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-white">
                LinkedIn Profile
              </Label>
              <div className="relative">
                <Linkedin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <Input
                  id="linkedin"
                  type="text"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="text-white">
                GitHub Profile
              </Label>
              <div className="relative">
                <Github
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400"
                  size={18}
                />
                <Input
                  id="github"
                  type="text"
                  name="github"
                  placeholder="https://github.com/johndoe"
                  value={formData.github}
                  onChange={handleChange}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#9CE630] text-black hover:bg-[#8BD520]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
