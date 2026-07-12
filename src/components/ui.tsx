import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sea-500 disabled:opacity-60 disabled:pointer-events-none";
const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
const variants = {
  primary: "bg-coral text-white hover:bg-coral-dark shadow-lg shadow-coral/30 hover:-translate-y-0.5",
  secondary: "bg-sea-600 text-white hover:bg-sea-700 shadow-lg shadow-sea-600/20 hover:-translate-y-0.5",
  ghost: "bg-white/80 text-sea-800 ring-1 ring-sea-600/20 hover:bg-white backdrop-blur",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sea-600">
      <span className="h-px w-6 bg-sea-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink text-balance">{title}</h2>
      {intro && <p className="mt-4 text-lg text-sea-800/80 leading-relaxed">{intro}</p>}
    </div>
  );
}
