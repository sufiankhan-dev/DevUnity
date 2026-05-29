import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type LoadingGridProps = {
  count?: number;
  columns?: 1 | 2 | 3;
  renderItem: (index: number) => React.ReactNode;
  className?: string;
};

export function LoadingGrid({
  count = 6,
  columns = 3,
  renderItem,
  className,
}: LoadingGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {Array.from({ length: count }, (_, i) => renderItem(i))}
    </div>
  );
}

export function SkeletonPulse({ className }: { className?: string }) {
  return <Skeleton className={cn("bg-zinc-800/80", className)} />;
}
