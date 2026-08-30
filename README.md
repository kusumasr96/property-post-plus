# Property Post Maker — Nestora Properties

Turn four property details into a polished, Instagram-ready real estate creative (1080 × 1350) and download it as a PNG. No backend required.

## Features

- Four-field property form (Property & Type, Location, Price, Highlights) with validation, character counters and friendly error messages
- Sample data pre-filled so the concept is visible immediately
- Live 4:5 preview that updates as you type, plus a generating state and empty state
- Automatic branding: logo mark, brand name, tagline, consultant and contact — the user never types them
- High-resolution PNG export of the creative only (`property-post-[timestamp].png`, 1080 × 1350)
- Reset clears fields, errors and the preview
- Toast notifications for success and failure
- Responsive across desktop, laptop, tablet and mobile
- Accessible: labelled inputs, keyboard-operable controls, visible focus rings, descriptive alt text

## Tech stack

React 19 · TanStack Start (Vite 7) · TypeScript · Tailwind CSS v4 · html-to-image · sonner

## Local setup

```bash
bun install      # or: npm install
bun run dev      # or: npm run dev
```

The app runs at http://localhost:8080.

## Build

```bash
bun run build    # or: npm run build
```

## Deployment

The project builds to a standard Vite output and deploys to Vercel without extra configuration:

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Build command: `npm run build`. Install command: `npm install`.
4. Deploy.

It can also be published directly from Lovable via the Publish button.

## Branding configuration

All branding lives in one object in `src/lib/brand.ts`:

```ts
export const BRAND = {
  name: "Nestora Properties",
  contact: "+91 98765 43210",
  consultant: "Kusuma SR",
  tagline: "Premium Real Estate Solutions",
};
```

## Project structure

```
src/
  assets/property-hero.jpg     luxury property image used in the creative
  components/Header.tsx        dashboard header
  components/BrandStrip.tsx    CSS logo mark + brand lockup
  components/PropertyForm.tsx  validated input form
  components/PropertyPreview.tsx  1080x1350 post + empty state
  lib/brand.ts                 branding + sample data
  routes/index.tsx             dashboard, generation, PNG download
```
