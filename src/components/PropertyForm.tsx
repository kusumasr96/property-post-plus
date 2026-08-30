import type { PropertyData } from "@/lib/brand";

export type Errors = Partial<Record<keyof PropertyData, string>>;

const FIELDS: {
  key: keyof PropertyData;
  label: string;
  placeholder: string;
  max: number;
  multiline?: boolean;
}[] = [
  {
    key: "property",
    label: "Property & Type",
    placeholder: "4 BHK Luxury Villa, Ansal Golf City",
    max: 70,
  },
  {
    key: "location",
    label: "Location",
    placeholder: "Sushant Golf City, Lucknow",
    max: 60,
  },
  { key: "price", label: "Price", placeholder: "₹2.5 Cr onwards", max: 30 },
  {
    key: "highlights",
    label: "Highlights",
    placeholder: "3000 sq.ft · Corner plot · Ready to move",
    max: 90,
    multiline: true,
  },
];

interface Props {
  values: PropertyData;
  errors: Errors;
  generating: boolean;
  onChange: (key: keyof PropertyData, value: string) => void;
  onGenerate: () => void;
  onReset: () => void;
}

export function PropertyForm({
  values,
  errors,
  generating,
  onChange,
  onGenerate,
  onReset,
}: Props) {
  return (
    <form
      className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}
      noValidate
    >
      <h2 className="font-display text-lg font-semibold text-foreground">
        Property Details
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Branding and contact details are added automatically.
      </p>

      <div className="mt-6 space-y-5">
        {FIELDS.map((f) => {
          const err = errors[f.key];
          const id = `field-${f.key}`;
          const common = {
            id,
            value: values[f.key],
            placeholder: f.placeholder,
            maxLength: f.max,
            "aria-invalid": Boolean(err),
            "aria-describedby": err ? `${id}-error` : undefined,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => onChange(f.key, e.target.value),
            className: `w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent ${
              err ? "border-destructive" : "border-input"
            }`,
          };
          return (
            <div key={f.key}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <label
                  htmlFor={id}
                  className="text-sm font-medium text-foreground"
                >
                  {f.label}
                </label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {values[f.key].length}/{f.max}
                </span>
              </div>
              {f.multiline ? (
                <textarea rows={2} {...common} />
              ) : (
                <input type="text" {...common} />
              )}
              {err && (
                <p
                  id={`${id}-error`}
                  role="alert"
                  className="mt-2 text-xs font-medium text-destructive"
                >
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={generating}
          className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {generating ? "Generating…" : "Generate Post"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
