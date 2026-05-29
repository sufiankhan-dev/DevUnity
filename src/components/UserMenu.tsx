"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    return null;
  }

  const initials = session.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-full outline-none ring-1 ring-zinc-700/50 pl-1 pr-3 py-1 transition-all hover:ring-brand/30 focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <Avatar className="h-8 w-8 border border-zinc-700">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name}
            />
            <AvatarFallback className="bg-zinc-800 text-xs text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[120px] truncate text-sm font-medium text-zinc-200 lg:block">
            {session.user.name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-zinc-800 bg-zinc-950 text-zinc-200"
      >
        <DropdownMenuLabel className="font-normal">
          <p className="font-semibold text-white">{session.user.name}</p>
          <p className="truncate text-xs text-zinc-400">{session.user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-800 focus:text-white">
          <Link href="/community" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-brand" />
            Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-800 focus:text-white">
          <Link href="/blogs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-brand" />
            My Blogs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem
          className="cursor-pointer text-zinc-300 focus:bg-zinc-800 focus:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
