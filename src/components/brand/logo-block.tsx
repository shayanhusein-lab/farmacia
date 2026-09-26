import { cn } from "@/lib/utils";

/** Blue FARMACIA wordmark block; each letter is its own span for GSAP. */
export function LogoBlock({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="FARMACIA"
      className={cn(
        "logo-block inline-flex max-w-full bg-blue",
        "rounded-[clamp(14px,2vw,24px)] px-[clamp(16px,2.6vw,30px)] pt-[clamp(10px,1.6vw,18px)] pb-[clamp(8px,1.2vw,14px)]",
        "shadow-[clamp(8px,1.2vw,14px)_clamp(10px,1.4vw,16px)_0_var(--color-blue-deep)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="flex font-logo text-[min(clamp(44px,9vw,118px),13cqi)] leading-none tracking-[0.01em] text-white"
      >
        {"FARMACIA".split("").map((ch, i) => (
          <span key={i} className="logo-letter inline-block origin-bottom">
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
