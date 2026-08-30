import { BRAND } from "@/lib/brand";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 text-base" : "h-12 w-12 text-xl";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${box} grid place-items-center rounded-xl bg-gradient-gold font-display font-semibold text-primary shadow-gold`}
        aria-hidden="true"
      >
        N
      </div>
      <div className="leading-tight">
        <p
          className={`font-display font-semibold tracking-tight text-foreground ${
            size === "sm" ? "text-sm" : "text-lg"
          }`}
        >
          {BRAND.name}
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent">
          {BRAND.tagline}
        </p>
      </div>
    </div>
  );
}
