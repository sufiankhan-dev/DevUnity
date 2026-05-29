import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Globe, Code, Users } from "lucide-react";
import { BackgroundPattern } from "@/components/BackgroundPattern";

export default function OpenSourceSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <BackgroundPattern overlayClassName="bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-white mb-4">
            Open Source <span className="text-[#9CE630]">for All</span>
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            DevUnity is proudly open source. We believe in the power of
            community-driven development and welcome contributions from
            developers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 text-center">
            <Github className="h-12 w-12 text-[#9CE630] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Open Source
            </h3>
            <p className="text-zinc-400">
              Fully open source and free to use, modify, and distribute.
            </p>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 text-center">
            <Users className="h-12 w-12 text-[#9CE630] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Community Driven
            </h3>
            <p className="text-zinc-400">
              Built by developers, for developers. Your contributions matter.
            </p>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6 text-center">
            <Code className="h-12 w-12 text-[#9CE630] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Modern Stack
            </h3>
            <p className="text-zinc-400">
              Built with Next.js, TypeScript, and modern web technologies.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="https://github.com/sufiankhan-dev/DevUnity">
            <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520] px-8 py-6 text-lg">
              <Globe className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
