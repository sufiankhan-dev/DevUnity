import {
  MessageSquare,
  Users,
  BookOpen,
  Search,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GradientText } from "@/components/GradientText";
import { SectionShell } from "@/components/SectionShell";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: MessageSquare,
    title: "Ask & Answer",
    description:
      "Post technical questions and help others by sharing your expertise.",
  },
  {
    icon: BookOpen,
    title: "Developer Blogs",
    description:
      "Share insights through rich blog posts with a built-in editor.",
  },
  {
    icon: Users,
    title: "Community Profiles",
    description:
      "Connect with developers worldwide and showcase your work.",
  },
  {
    icon: Search,
    title: "Explore Topics",
    description: "Discover content across web, mobile, DevOps, and more.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "Built in the open — contribute, fork, and make it yours.",
  },
];

const Features = () => {
  return (
    <SectionShell
      className="border-t border-zinc-800/80 py-20 md:py-28"
      withPattern
      patternOverlay="bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950"
    >
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand/80">
            Built for developers, by developers
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Everything you need to{" "}
            <GradientText>level up</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            DevUnity is an inclusive space where developers of all levels can
            learn, grow, and connect — without jumping between fragmented tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.slice(0, 3).map(({ icon: Icon, title, description }) => (
            <SpotlightCard key={title} className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20 transition-colors group-hover:bg-brand/15">
                <Icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
            </SpotlightCard>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl gap-6 md:grid-cols-2">
          {features.slice(3).map(({ icon: Icon, title, description }) => (
            <SpotlightCard key={title} className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 ring-1 ring-brand/20 transition-colors group-hover:bg-brand/15">
                <Icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

export default Features;
