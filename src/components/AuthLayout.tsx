import { BackgroundPattern } from "@/components/BackgroundPattern";
import { GradientText } from "@/components/GradientText";
import { Users, Code2, MessageSquare, BookOpen } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
};

const highlights = [
  { icon: MessageSquare, text: "Ask & answer with peers" },
  { icon: BookOpen, text: "Publish developer blogs" },
  { icon: Code2, text: "Open source community" },
];

export function AuthLayout({
  children,
  title,
  highlight,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row items-stretch relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundPattern overlayClassName="bg-gradient-to-br from-zinc-950 via-zinc-950/95 to-zinc-950/80" />
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12 xl:px-20 py-16 border-r border-zinc-800/50">
        <div className="flex items-center gap-2 mb-8">
          <Users className="h-8 w-8 text-brand" />
          <span className="text-xl font-bold text-white">DevUnity</span>
        </div>
        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
          {title}{" "}
          <GradientText>{highlight}</GradientText>
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-md leading-relaxed">
          {description}
        </p>
        <ul className="space-y-4">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-zinc-300">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon className="h-4 w-4" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 relative z-10 flex items-center justify-center px-4 py-16 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Users className="h-7 w-7 text-brand" />
            <span className="text-lg font-bold text-white">DevUnity</span>
          </div>
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-[0_0_60px_-15px_rgba(156,230,48,0.08)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
