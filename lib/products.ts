export const products = [
  {
    id: "solid-red-parka",
    name: "Solid Red Parka",
    price: 119,
    image: "/solidredparka.jpg",
  },
  {
    id: "red-santa-parka",
    name: "Red Santa Parka",
    price: 60,
    image: "/redsantaparka.jpg",
  },
  {
    id: "purple-parka",
    name: "Purple Parka",
    price: 60,
    image: "/purpleparka.jpg",
  },
  {
    id: "colored-parka",
    name: "Colored Parka",
    price: 60,
    image: "/coloredparka.jpg",
  },
  {
    id: "close-up-red-parka",
    name: "Close Up Red Parka",
    price: 60,
    image: "/closeupred.jpg",
  },
]

export const PRODUCTS = products

export const sizes = ["Small", "Medium", "Large"] as const

export type Product = (typeof products)[number]
export type Size = (typeof sizes)[number]