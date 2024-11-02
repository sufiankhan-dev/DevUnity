import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-black border-zinc-800">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link className="flex items-center space-x-2" href="/">
          <Users className="h-8 w-8 text-[#9CE630]" />
          <span className="text-xl font-bold text-white">DevUnity</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link className="text-zinc-400 hover:text-white" href="/explore">
            Explore
          </Link>
          <Link className="text-zinc-400 hover:text-white" href="/community">
            Community
          </Link>
          <Link className="text-zinc-400 hover:text-white" href="/blogs">
            Blog
          </Link>
          <Link className="text-zinc-400 hover:text-white" href="/about">
            About
          </Link>
          <Link className="text-zinc-400 hover:text-white" href="/question">
            Ouestions
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-zinc-400 hover:text-white">
            Sign in
          </Button>
          <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520]">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
