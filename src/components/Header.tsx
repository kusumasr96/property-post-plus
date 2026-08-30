import { BrandMark } from "./BrandStrip";

export function Header() {
  return (
    <header className="border-b border-border/70 bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark />
        <div className="sm:text-right">
          <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
            Property Post Maker
          </h1>
          <p className="text-sm text-muted-foreground">
            Create professional property creatives in seconds.
          </p>
        </div>
      </div>
    </header>
  );
}
