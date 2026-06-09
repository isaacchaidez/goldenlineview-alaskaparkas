import Image from "next/image"
import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { products } from "@/lib/products"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main>
        <section className="relative min-h-[720px] overflow-hidden bg-slate-950">
          <Image
            src="/hero.jpg"
            alt="Goldenline View custom parka and Alaska scenery"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/35 to-slate-950/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.45)_75%)]" />

          <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6">
            <div className="max-w-3xl text-white">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Goldenline View, Inc.
              </p>

              <h1 className="text-5xl font-semibold leading-tight tracking-[0.08em] md:text-7xl">
                CUSTOM PARKAS
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
                Explore handmade parka styles, choose your size, add your order
                to cart, and checkout securely online.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex justify-center rounded-full bg-white px-8 py-4 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-200"
                >
                  Shop Parkas
                </Link>

                <Link
                  href="/#parkas"
                  className="inline-flex justify-center rounded-full border border-white/40 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 rounded-[2rem] bg-slate-50 p-8 shadow-sm md:grid-cols-[1fr_1.2fr] md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                About
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                About Goldenline View, Inc.
              </h2>
            </div>

            <p className="text-lg leading-9 text-slate-700">
              Goldenline View, Inc. is working toward improving its
              organizational real estate investment opportunities. Research is
              also in progress for start up of tourism involving production of
              mining for gold and seasonal activities of interest.
            </p>
          </div>
        </section>

        <section id="parkas" className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Parka Gallery
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Custom Parka Styles
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Select a parka, choose your size, and add it to your cart.
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
                  <h3 className="text-xl font-semibold text-slate-950">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-slate-700">
                    ${product.price}.00
                  </p>

                  <AddToCartButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-xl">
            <div className="grid gap-8 p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Contact
                </p>

                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Interested in a Custom Parka?
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Contact Goldenline View, Inc. to discuss custom parka designs,
                  sizes, colors, and specialty requests.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 text-slate-100">
                <p className="font-semibold">Goldenline View, Inc.</p>
                <p className="mt-3 text-slate-300">907-378-2991</p>
                <p className="mt-2 text-slate-300">
                  goldenline.view@gmail.com
                </p>
                <p className="mt-2 text-slate-300">
                  1369 N Becker Ridge Rd
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}