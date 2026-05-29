"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/SectionShell";
import { PageHeader } from "@/components/PageHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  Code,
  Database,
  Globe,
  Layout,
  Smartphone,
  Terminal,
  Search,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    icon: Globe,
    topics: 42,
    description: "Frontend, backend, and full-stack web technologies.",
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    topics: 28,
    description: "iOS, Android, React Native, and cross-platform apps.",
  },
  {
    name: "Backend Development",
    icon: Database,
    topics: 35,
    description: "APIs, databases, microservices, and server architecture.",
  },
  {
    name: "DevOps",
    icon: Terminal,
    topics: 22,
    description: "CI/CD, containers, cloud infrastructure, and automation.",
  },
  {
    name: "UI/UX Design",
    icon: Layout,
    topics: 18,
    description: "Design systems, accessibility, and user experience.",
  },
  {
    name: "Data Science",
    icon: Code,
    topics: 31,
    description: "ML, analytics, Python, and data engineering.",
  },
];

const allTags = [
  "All",
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "DevOps",
  "AI/ML",
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell withPattern>
      <div className="container mx-auto px-4 pb-16">
        <PageHeader
          title="Explore"
          highlight="Topics"
          subtitle="Discover content across development disciplines and find your niche."
        />

        <div className="mb-6 relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            className="border-zinc-700 bg-zinc-900/60 pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-brand/50"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTag === tag
                  ? "bg-brand text-zinc-950"
                  : "border border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-brand/30 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ name, icon: Icon, topics, description }) => (
            <SpotlightCard key={name} className="p-6 flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20">
                  <Icon className="h-6 w-6 text-brand" />
                </span>
                <Badge
                  variant="outline"
                  className="border-zinc-700 text-zinc-400 font-normal"
                >
                  {topics} topics
                </Badge>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{name}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
              <Button
                variant="outline"
                className="w-full border-zinc-700 text-zinc-300 hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
              >
                View Topics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
