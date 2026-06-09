import Image from "next/image"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { products } from "@/lib/products"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Goldenline View Shop
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Shop Custom Parkas
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Choose your parka style, select your size, and add it to your cart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  {product.name}
                </h2>

                <p className="mt-2 text-lg font-semibold text-slate-700">
                  ${product.price}.00
                </p>

                <AddToCartButton productId={product.id} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}