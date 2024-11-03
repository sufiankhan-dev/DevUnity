"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { CgMenuRight } from "react-icons/cg";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="border-b z-50 absolute w-full bg-black/50 border-zinc-800">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-6">
        <Link className="flex items-center space-x-2" href="/">
          <Users className="h-8 w-8 text-[#9CE630]" />
          <span className="text-xl font-bold text-white">DevUnity</span>
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
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
            Questions
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="text-gray-700 hover:text-black bg-white hover:bg-white/80 ">
            Sign in
          </Button>
          <Button className="bg-[#9CE630] text-black hover:bg-[#8BD520] hidden lg:block">
            Sign up
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <CgMenuRight className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-zinc-900 border-none"
            >
              <Link href="/" onClick={closeSheet}>
                <SheetTitle className="text-bold text-white flex items-center">
                  <Users className="mr-2 text-[#9CE630]" />
                  DevUnity
                </SheetTitle>
              </Link>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link
                  className="text-zinc-400 hover:text-white"
                  href="/explore"
                  onClick={closeSheet}
                >
                  Explore
                </Link>
                <Link
                  className="text-zinc-400 hover:text-white"
                  href="/community"
                  onClick={closeSheet}
                >
                  Community
                </Link>
                <Link
                  className="text-zinc-400 hover:text-white"
                  href="/blogs"
                  onClick={closeSheet}
                >
                  Blog
                </Link>
                <Link
                  className="text-zinc-400 hover:text-white"
                  href="/about"
                  onClick={closeSheet}
                >
                  About
                </Link>
                <Link
                  className="text-zinc-400 hover:text-white"
                  href="/question"
                  onClick={closeSheet}
                >
                  Questions
                </Link>
                <Button
                  className="bg-[#9CE630] text-black hover:bg-[#8BD520] w-full mt-4"
                  onClick={closeSheet}
                >
                  Sign up
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
