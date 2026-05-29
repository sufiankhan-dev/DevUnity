import { cn } from "@/lib/utils";
import { BackgroundPattern } from "@/components/BackgroundPattern";

type SectionShellProps = {
  children: React.ReactNode;
  className?: string;
  withPattern?: boolean;
  patternOverlay?: string;
  id?: string;
};

export function SectionShell({
  children,
  className,
  withPattern = false,
  patternOverlay,
  id,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      {withPattern && (
        <div className="absolute inset-0 z-0">
          <BackgroundPattern overlayClassName={patternOverlay} />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  withPattern?: boolean;
};

export function PageShell({
  children,
  className,
  withPattern = false,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-zinc-950 text-foreground relative overflow-hidden",
        className
      )}
    >
      {withPattern && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BackgroundPattern />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
