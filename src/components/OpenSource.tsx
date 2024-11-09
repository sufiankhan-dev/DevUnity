import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Globe, Code, Users } from "lucide-react";

export default function OpenSourceSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950/70" />
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

        <div className="grid md:grid-cols-1 gap-8 mb-12 animate-fade-in-up animation-delay-300">
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 transition-all duration-300">
            <Globe className="h-12 w-12 text-[#9CE630] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Global Collaboration
            </h3>
            <p className="text-zinc-400">
              Connect with developers from around the world and contribute to a
              platform that empowers the community.
            </p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 transition-all duration-300">
            <Code className="h-12 w-12 text-[#9CE630] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Improve the Codebase
            </h3>
            <p className="text-zinc-400">
              Help enhance DevUnity's features, fix bugs, and optimize
              performance to create a better experience for all users.
            </p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 transition-all duration-300">
            <Users className="h-12 w-12 text-[#9CE630] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Shape the Future
            </h3>
            <p className="text-zinc-400">
              Influence the direction of DevUnity by suggesting new features and
              participating in discussions.
            </p>
          </div>
        </div>

        <div className="text-center animate-fade-in-up animation-delay-600">
          <Link href="https://github.com/sufiankhan-dev/DevUnity" passHref>
            <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520] text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#9CE630]/20">
              <Github className="mr-2 h-5 w-5" />
              Contribute on GitHub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
