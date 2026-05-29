import { cn } from "@/lib/utils";
import { GradientText } from "@/components/GradientText";

type PageHeaderProps = {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  centered?: boolean;
};

export function PageHeader({
  title,
  highlight,
  subtitle,
  className,
  children,
  centered = false,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-10 pt-20 md:pt-24",
        centered && "text-center",
        className
      )}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}{" "}
        {highlight && (
          <GradientText className="inline">{highlight}</GradientText>
        )}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
