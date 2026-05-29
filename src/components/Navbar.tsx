"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/community", label: "Community" },
  { href: "/blogs", label: "Blogs" },
  { href: "/question", label: "Questions" },
  { href: "/explore", label: "Explore" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const isSignedIn = Boolean(session?.user);

  const closeSheet = () => setIsOpen(false);

  const hiddenRoutes = ["/sign-in", "/sign-up", "/complete-profile"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="glass-nav fixed top-0 z-50 w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-6">
        <Link
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          href="/"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 ring-1 ring-brand/20 transition-all group-hover:bg-brand/15 group-hover:ring-brand/30">
            <Users className="h-5 w-5 text-brand" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            DevUnity
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 flex-grow justify-center">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-zinc-800" />
          ) : isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link href="/sign-in" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-brand text-zinc-950 font-semibold hover:bg-brand-dark shadow-[0_0_20px_-5px_rgba(156,230,48,0.4)]">
                  Sign up
                </Button>
              </Link>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
            >
              <Link href="/" onClick={closeSheet}>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Users className="text-brand" />
                  DevUnity
                </SheetTitle>
              </Link>
              <Separator className="my-6 bg-zinc-800" />
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeSheet}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      pathname === href
                        ? "bg-brand/10 text-brand"
                        : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              {!isSignedIn && (
                <>
                  <Separator className="my-6 bg-zinc-800" />
                  <Link href="/sign-in" onClick={closeSheet}>
                    <Button
                      variant="outline"
                      className="mb-3 w-full border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={closeSheet}>
                    <Button className="w-full bg-brand text-zinc-950 hover:bg-brand-dark">
                      Sign up free
                    </Button>
                  </Link>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
