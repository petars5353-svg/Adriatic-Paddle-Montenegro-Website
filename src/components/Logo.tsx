/** Simple kayak-paddle mark used in the wordmark. Uses currentColor. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="23" className="fill-sea-100" />
      {/* paddle */}
      <path
        d="M14 14 L34 34"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M12 12 c-2.5 2.5 -1 6 1.5 3.5 c2.5 -2.5 -1 -6 -1.5 -3.5 Z"
        fill="currentColor"
      />
      <path
        d="M36 36 c2.5 -2.5 1 -6 -1.5 -3.5 c-2.5 2.5 1 6 1.5 3.5 Z"
        fill="currentColor"
      />
      {/* wave */}
      <path
        d="M9 30 c4 -3 7 3 11 0 c4 -3 7 3 11 0 c3 -2.2 5.5 1.4 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-sea-400"
        opacity="0.9"
      />
    </svg>
  );
}
