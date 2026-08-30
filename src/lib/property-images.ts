import heroImage from "@/assets/property-hero.jpg";
import apartmentImage from "@/assets/property-apartment.jpg";
import commercialImage from "@/assets/property-commercial.jpg";
import houseImage from "@/assets/property-house.jpg";
import plotImage from "@/assets/property-plot.jpg";
import villaImage from "@/assets/property-villa.jpg";

export const propertyImages = {
  villa: villaImage,
  house: houseImage,
  apartment: apartmentImage,
  plot: plotImage,
  commercial: commercialImage,
  default: heroImage,
} as const;

export type PropertyCategory = keyof typeof propertyImages;

const MATCHERS: { category: PropertyCategory; keywords: string[] }[] = [
  { category: "villa", keywords: ["villa"] },
  {
    category: "house",
    keywords: ["independent house", "independent home", "house"],
  },
  { category: "apartment", keywords: ["apartment", "flat"] },
  { category: "plot", keywords: ["plot", "land", "site"] },
  { category: "commercial", keywords: ["commercial", "office", "shop"] },
];

/**
 * Returns the image asset matching the property text.
 * Matching is case-insensitive; falls back to a default real-estate image.
 */
export function getPropertyImage(propertyText: string): string {
  const text = propertyText.toLowerCase();
  for (const { category, keywords } of MATCHERS) {
    if (keywords.some((k) => text.includes(k))) {
      return propertyImages[category];
    }
  }
  return propertyImages.default;
}
