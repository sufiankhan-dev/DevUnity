import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Github, ArrowRight } from "lucide-react";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { GradientText } from "@/components/GradientText";

const Hero = () => {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundPattern overlayClassName="bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />
      </div>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#9CE630"
      />

      <div className="container relative z-10 mx-auto px-4 py-28 md:py-36">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            Where developers{" "}
            <GradientText>connect</GradientText>, learn, and{" "}
            <span className="relative inline-block">
              grow
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-brand/80 to-brand-light/40" />
            </span>
          </h1>

          <div className="mx-auto mb-10 max-w-2xl [&_div]:mt-0 [&_div_div]:text-lg [&_div_div]:font-normal [&_div_div]:leading-relaxed [&_span]:text-zinc-400">
            <TextGenerateEffect
              words="Ask questions, publish blogs, and join a thriving community of builders sharing knowledge — all in one unified platform."
              duration={0.4}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 bg-brand px-8 font-semibold text-zinc-950 shadow-[0_0_30px_-5px_rgba(156,230,48,0.5)] hover:bg-brand-dark"
              >
                Join Community
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="https://github.com/sufiankhan-dev/DevUnity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-zinc-700 bg-zinc-900/50 px-8 text-zinc-200 backdrop-blur-sm hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
              >
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
