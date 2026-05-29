type BackgroundPatternProps = {
  overlayClassName?: string;
  showGlow?: boolean;
};

export function BackgroundPattern({
  overlayClassName = "bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950",
  showGlow = true,
}: BackgroundPatternProps) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] animate-grid-fade"
      />
      {showGlow && (
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[120px] animate-glow-pulse pointer-events-none"
        />
      )}
      <div aria-hidden className={`absolute inset-0 ${overlayClassName}`} />
    </>
  );
}
