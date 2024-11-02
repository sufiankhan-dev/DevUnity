import React from "react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32 text-center">
      <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
        Developer <span className="text-[#9CE630]">Community</span>,
        <br />
        finally unified.
      </h1>
      <p className="mb-8 text-lg text-zinc-400 md:text-xl">
        Join a thriving community of developers. Ask questions, share knowledge,
        <br className="hidden md:inline" />
        and build connections in a collaborative environment.
      </p>
      <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Button className="h-12 px-8 bg-[#9CE630] text-black hover:bg-[#8BD520] flex flex-row items-center justify-center">
          Join Community
          <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-sm">
            Free
          </span>
        </Button>
        <Button className="h-12 px-8 border-zinc-700 bg-white text-black hover:bg-white/80 flex flex-row items-center justify-center">
          <Github className="mr-2 h-5 w-5" />
          Star on GitHub
        </Button>
      </div>
    </section>
  );
};

export default Hero;
