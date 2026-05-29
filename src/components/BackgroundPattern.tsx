type BackgroundPatternProps = {
  overlayClassName?: string;
};

export function BackgroundPattern({
  overlayClassName = "bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950",
}: BackgroundPatternProps) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />
      <div aria-hidden className={`absolute inset-0 ${overlayClassName}`} />
    </>
  );
}
