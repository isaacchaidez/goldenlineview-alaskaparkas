export const products = [
  {
    id: "solid-red-parka",
    name: "Solid Red Parka",
    description: "Custom solid red parka from Goldenline View, Inc.",
    price: 119,
    priceInCents: 11900,
    image: "/solidredparka.jpg",
    category: "custom",
  },
  {
    id: "red-santa-parka",
    name: "Red Santa Parka",
    description: "Custom red Santa style parka from Goldenline View, Inc.",
    price: 60,
    priceInCents: 6000,
    image: "/redsantaparka.jpg",
    category: "custom",
  },
  {
    id: "purple-parka",
    name: "Purple Parka",
    description: "Custom purple parka from Goldenline View, Inc.",
    price: 60,
    priceInCents: 6000,
    image: "/purpleparka.jpg",
    category: "custom",
  },
  {
    id: "colored-parka",
    name: "Colored Parka",
    description: "Custom colored parka from Goldenline View, Inc.",
    price: 60,
    priceInCents: 6000,
    image: "/coloredparka.jpg",
    category: "custom",
  },
  {
    id: "close-up-red-parka",
    name: "Close Up Red Parka",
    description: "Custom close up red parka from Goldenline View, Inc.",
    price: 60,
    priceInCents: 6000,
    image: "/closeupred.jpg",
    category: "custom",
  },
]

export const PRODUCTS = products

export const sizes = ["Small", "Medium", "Large"] as const

export type Product = (typeof products)[number]
export type Size = (typeof sizes)[number]

export function formatPrice(amount: number) {
  const dollars = amount >= 1000 ? amount / 100 : amount

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(dollars)
}