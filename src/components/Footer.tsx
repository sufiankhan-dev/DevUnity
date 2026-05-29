"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/community", label: "Community" },
  { href: "/blogs", label: "Blog" },
  { href: "/question", label: "Questions" },
  { href: "/explore", label: "Explore" },
];

const socialLinks = [
  {
    href: "https://github.com/sufiankhan-dev/DevUnity",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://twitter.com/devunity",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://linkedin.com/company/devunity",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  const hiddenRoutes = ["/sign-in", "/sign-up", "/complete-profile"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="relative border-t border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      <div className="container mx-auto px-4 py-14 lg:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-brand" />
              <span className="text-xl font-bold text-white">DevUnity</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              A developer community platform for sharing knowledge, answering
              questions, and publishing blogs — built open source, for
              developers.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-all hover:border-brand/30 hover:bg-brand/5 hover:text-brand"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 transition-colors hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Open Source
            </h3>
            <Link
              href="https://github.com/sufiankhan-dev/DevUnity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-light"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800/80" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} DevUnity. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
