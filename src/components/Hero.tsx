import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-pattern.png"
          alt="Background Pattern"
          fill
          style={{ objectFit: "cover" }}
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 mt-16 text-center">
        <div className="animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Developer <span className="text-[#9CE630]">Community</span>,
            <br />
            finally{" "}
            <span className="relative inline-block">
              unified
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#9CE630] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </span>
            .
          </h1>
          <p className="mb-8 text-lg text-zinc-400 md:text-xl max-w-3xl mx-auto">
            Join a thriving community of developers. Ask questions, share
            knowledge, and build connections in a collaborative environment.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Button className="h-12 z-10 px-8 bg-[#9CE630] text-black hover:bg-[#8BD520] flex flex-row items-center justify-center">
              Join Community
              <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-sm">
                Free
              </span>
            </Button>
            <Link href={"https://github.com/sufiankhan-dev/DevUnity"}>
              <Button className="h-12 z-10 px-8 border-2 border-[#9CE630] bg-transparent text-[#9CE630] hover:bg-[#9CE630] hover:text-black flex flex-row items-center justify-center">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
