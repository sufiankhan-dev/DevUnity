import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OpenSourceSection from "@/components/OpenSource";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Hero />
      <Features />
      <OpenSourceSection />
    </div>
  );
}
