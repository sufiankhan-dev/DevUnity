"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
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
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#9CE630]"
        >
          <Avatar className="h-9 w-9 border border-zinc-700">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name}
            />
            <AvatarFallback className="bg-zinc-800 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-gray-100 text-base hidden lg:block">
            {session.user.name}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-zinc-900 border-zinc-800 text-white"
      >
        <SheetTitle className="text-white">Account</SheetTitle>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name}
            />
            <AvatarFallback className="bg-zinc-800 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm text-zinc-400">{session.user.email}</p>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full border-zinc-700 text-white hover:bg-zinc-800"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
