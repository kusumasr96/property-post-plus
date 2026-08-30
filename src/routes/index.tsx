import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { PropertyForm, type Errors } from "@/components/PropertyForm";
import { EmptyPreview, PropertyPost } from "@/components/PropertyPreview";
import { SAMPLE, type PropertyData } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Property Post Maker | Nestora Properties" },
      {
        name: "description",
        content:
          "Generate professional, ready-to-share real estate social media creatives in seconds — 1080x1350 PNG export, no design skills needed.",
      },
      {
        property: "og:title",
        content: "Property Post Maker | Nestora Properties",
      },
      {
        property: "og:description",
        content:
          "Turn four property details into a premium Instagram-ready real estate post.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [values, setValues] = useState<PropertyData>(SAMPLE);
  const [errors, setErrors] = useState<Errors>({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [scale, setScale] = useState(0.3);

  const postRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / 1080),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [generated]);

  const handleChange = (key: keyof PropertyData, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    (Object.keys(values) as (keyof PropertyData)[]).forEach((k) => {
      if (!values[k].trim()) next[k] = "This field is required to build the post.";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) {
      toast.error("Please fill in all four property details.");
      return;
    }
    setGenerating(true);
    setGenerated(false);
    window.setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Your property post is ready.");
    }, 700);
  };

  const handleReset = () => {
    setValues({ property: "", location: "", price: "", highlights: "" });
    setErrors({});
    setGenerated(false);
    toast("Form cleared.");
  };

  const handleDownload = async () => {
    if (!postRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(postRef.current, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        cacheBust: true,
        style: { transform: "none" },
      });
      const link = document.createElement("a");
      link.download = `property-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Downloaded as PNG (1080 × 1350).");
    } catch (err) {
      console.error(err);
      toast.error("Download failed. Please try again in a moment.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-12">
        <PropertyForm
          values={values}
          errors={errors}
          generating={generating}
          onChange={handleChange}
          onGenerate={handleGenerate}
          onReset={handleReset}
        />

        <section aria-label="Live property post preview" className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Live Preview
              </h2>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                1080 × 1350
              </span>
            </div>

            {generated ? (
              <div
                ref={frameRef}
                className="relative w-full overflow-hidden rounded-2xl shadow-soft"
                style={{ aspectRatio: "4 / 5" }}
              >
                <div
                  className="absolute left-0 top-0 origin-top-left"
                  style={{ transform: `scale(${scale})` }}
                >
                  <PropertyPost ref={postRef} data={values} generated />
                </div>
              </div>
            ) : (
              <EmptyPreview />
            )}

            <button
              type="button"
              onClick={handleDownload}
              disabled={!generated || downloading}
              className="mt-5 w-full rounded-xl bg-gradient-gold px-5 py-3 text-sm font-semibold text-primary shadow-gold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? "Preparing PNG…" : "Download as PNG"}
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        Nestora Properties · Premium Real Estate Solutions
      </footer>
    </div>
  );
}
