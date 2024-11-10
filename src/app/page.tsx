import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Users, BookOpen, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OpenSourceSection from "@/components/OpenSource";

export default function Component() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          mask: "radial-gradient(circle at center, transparent, black)",
        }}
      />
      <Hero />
      <Features />
      <OpenSourceSection />
      {/* <Footer /> */}
    </div>
  );
}
