export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  images: string[]
  category: "men" | "women" | "unisex"
  features: string[]
  inStock: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "arctic-explorer",
    name: "Arctic Explorer Parka",
    description: "Built for extreme Alaskan winters. Premium goose down insulation rated to -40°F.",
    priceInCents: 34900, // $349.00
    images: ["/navy-blue-heavy-duty-winter-parka-with-fur-hood.jpg"],
    category: "unisex",
    features: ["650-fill goose down", "Waterproof shell", "Removable fur hood", "Interior pockets"],
    inStock: true,
  },
  {
    id: "denali-extreme",
    name: "Denali Extreme Parka",
    description: "Our warmest parka. Trusted by Alaskan guides and outdoor professionals.",
    priceInCents: 49900, // $499.00
    images: ["/black-heavy-expedition-winter-parka-with-fur-trim.jpg"],
    category: "unisex",
    features: ["850-fill goose down", "Gore-Tex shell", "Reinforced shoulders", "Expedition rated"],
    inStock: true,
  },
  {
    id: "yukon-classic",
    name: "Yukon Classic Parka",
    description: "Timeless style meets Alaskan durability. Perfect for everyday winter wear.",
    priceInCents: 27900, // $279.00
    images: ["/olive-green-classic-winter-parka-jacket.jpg"],
    category: "unisex",
    features: ["550-fill down", "Water-resistant", "Classic fit", "Multiple pockets"],
    inStock: true,
  },
  {
    id: "northern-lights-womens",
    name: "Northern Lights Women's Parka",
    description: "Tailored fit designed specifically for women who brave the cold.",
    priceInCents: 32900, // $329.00
    images: ["/burgundy-red-womens-fitted-winter-parka-with-hood.jpg"],
    category: "women",
    features: ["Contoured fit", "650-fill down", "Adjustable waist", "Fleece-lined pockets"],
    inStock: true,
  },
  {
    id: "frontier-mens",
    name: "Frontier Men's Parka",
    description: "Rugged design built for the hardest working men in the coldest conditions.",
    priceInCents: 36900, // $369.00
    images: ["/dark-gray-mens-heavy-duty-work-winter-parka.jpg"],
    category: "men",
    features: ["Reinforced construction", "700-fill down", "Tool pockets", "Extended length"],
    inStock: true,
  },
  {
    id: "glacier-lightweight",
    name: "Glacier Lightweight Parka",
    description: "Packable warmth for active adventures. Great for skiing and snowshoeing.",
    priceInCents: 22900, // $229.00
    images: ["/bright-blue-lightweight-winter-parka-jacket.jpg"],
    category: "unisex",
    features: ["Lightweight design", "550-fill down", "Packable", "Breathable fabric"],
    inStock: true,
  },
]

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
