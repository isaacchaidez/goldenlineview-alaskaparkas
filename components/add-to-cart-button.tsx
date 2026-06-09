"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Size, sizes } from "@/lib/products"

type CartItem = {
  id: string
  size: Size
  quantity: number
}

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<Size>("Medium")

  function addToCart() {
    const savedCart = localStorage.getItem("goldenline-cart")
    const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : []

    const existingItem = cart.find(
      (item) => item.id === productId && item.size === selectedSize
    )

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === productId && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { id: productId, size: selectedSize, quantity: 1 }]

    localStorage.setItem("goldenline-cart", JSON.stringify(updatedCart))
    router.push("/cart")
  }

  return (
    <div className="mt-4 space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Select Size
      </label>

      <select
        value={selectedSize}
        onChange={(event) => setSelectedSize(event.target.value as Size)}
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-slate-950"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={addToCart}
        className="w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        Add to Cart
      </button>
    </div>
  )
}