import { forwardRef } from "react";
import heroImage from "@/assets/property-hero.jpg";
import { BRAND, type PropertyData } from "@/lib/brand";

interface Props {
  data: PropertyData;
  generated: boolean;
}

/** Rendered at exact 1080x1350 and scaled down visually for the preview. */
export const PropertyPost = forwardRef<HTMLDivElement, Props>(
  ({ data, generated }, ref) => {
    return (
      <div
        ref={ref}
        style={{ width: 1080, height: 1350 }}
        className={`flex flex-col overflow-hidden bg-card font-body transition-opacity duration-500 ${
          generated ? "opacity-100" : "opacity-95"
        }`}
      >
        {/* Brand strip */}
        <div className="flex items-center justify-between bg-primary px-14 py-10">
          <div className="flex items-center gap-6">
            <div className="grid h-[86px] w-[86px] place-items-center rounded-2xl bg-gradient-gold font-display text-4xl font-semibold text-primary">
              N
            </div>
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight text-primary-foreground">
                {BRAND.name}
              </p>
              <p className="mt-1 text-lg uppercase tracking-[0.3em] text-accent">
                {BRAND.tagline}
              </p>
            </div>
          </div>
          <div className="h-[3px] w-32 rounded-full bg-gradient-gold" />
        </div>

        {/* Property image */}
        <div className="relative h-[540px] w-full overflow-hidden bg-secondary">
          <img
            src={heroImage}
            alt="Luxury property exterior at golden hour"
            width={1080}
            height={540}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute left-14 top-12 rounded-full bg-gradient-gold px-7 py-3 text-xl font-semibold uppercase tracking-[0.2em] text-primary">
            Premium Property
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between px-14 pb-10 pt-11">
          <div className="min-w-0">
            <h2 className="break-words font-display text-[58px] font-semibold leading-[1.08] tracking-tight text-foreground">
              {data.property}
            </h2>
            <p className="mt-5 break-words text-[30px] text-muted-foreground">
              📍 {data.location}
            </p>

            <div className="mt-8 flex items-end gap-6 border-t border-border pt-8">
              <div className="min-w-0">
                <p className="text-xl uppercase tracking-[0.28em] text-muted-foreground">
                  Starting from
                </p>
                <p className="mt-2 break-words font-display text-[52px] font-semibold leading-tight text-accent">
                  {data.price}
                </p>
              </div>
            </div>

            <p className="mt-7 break-words rounded-2xl bg-secondary px-8 py-6 text-[26px] leading-snug text-foreground">
              {data.highlights}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between gap-6 rounded-2xl bg-primary px-10 py-7">
            <p className="text-[26px] text-primary-foreground">
              📱 {BRAND.contact} <span className="text-accent">|</span>{" "}
              {BRAND.consultant}
            </p>
            <p className="font-display text-[26px] font-semibold text-accent">
              {BRAND.name}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
PropertyPost.displayName = "PropertyPost";

export function EmptyPreview() {
  return (
    <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-gold font-display text-2xl font-semibold text-primary">
          N
        </div>
        <p className="mt-5 font-display text-lg font-semibold text-foreground">
          Your creative appears here
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill in the property details and click Generate Post.
        </p>
      </div>
    </div>
  );
}
