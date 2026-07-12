/** Decorative wave divider. `flip` points the wave upward; `fill`/`className` set colour. */
export function WaveDivider({
  className = "text-foam",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div className={`pointer-events-none w-full leading-[0] ${flip ? "rotate-180" : ""}`} aria-hidden>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-[60px] w-full sm:h-[90px] ${className}`}
      >
        <path
          fill="currentColor"
          d="M0,32 C240,90 480,90 720,58 C960,26 1200,26 1440,58 L1440,90 L0,90 Z"
        />
      </svg>
    </div>
  );
}
