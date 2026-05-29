import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { GradientText } from "@/components/GradientText";

export default function OpenSourceSection() {
  return (
    <section className="border-t border-zinc-800/80 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 via-zinc-900/80 to-zinc-900/80 p-10 text-center backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(156,230,48,0.08),transparent_70%)]" />
          <div className="relative">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Open source{" "}
              <GradientText>for all</GradientText>
            </h2>
            <p className="mb-8 text-zinc-400">
              DevUnity is free and open source. Star the repo, open an issue, or
              submit your first pull request.
            </p>
            <Link
              href="https://github.com/sufiankhan-dev/DevUnity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-brand px-10 font-semibold text-zinc-950 shadow-[0_0_30px_-5px_rgba(156,230,48,0.4)] hover:bg-brand-dark"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
