import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-brand via-brand-light to-brand bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
