"use client"

import Image from "next/image"
import { useMemo, useState, useTransition } from "react"
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk"

import { createSquarePayment } from "@/app/actions/square"
import { products } from "@/lib/products"

type CartItem = {
  id: string
  quantity: number
}

export function ShopClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

  function addToCart(productId: string) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { id: productId, quantity: 1 }]
    })

    setMessage("")
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )

    setMessage("")
  }

  const total = useMemo(() => {
    return cart.reduce((sum, cartItem) => {
      const product = products.find((item) => item.id === cartItem.id)
      return sum + (product?.price ?? 0) * cartItem.quantity
    }, 0)
  }, [cart])

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  if (!applicationId || !locationId) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">
          Square is not configured yet.
        </h1>
        <p className="mt-4 text-slate-600">
          Check your .env.local file and restart npm run dev.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Goldenline View, Inc.
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950 md:text-5xl">
          Shop Custom Parkas
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          All parkas are temporarily priced at $60 each.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  {product.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-700">
                  $60.00
                </p>

                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className="mt-5 w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-3xl border bg-slate-50 p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-2xl font-semibold text-slate-950">Cart</h2>

          {cart.length === 0 ? (
            <p className="mt-4 text-slate-600">Your cart is empty.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {cart.map((cartItem) => {
                const product = products.find((item) => item.id === cartItem.id)

                if (!product) return null

                return (
                  <div
                    key={cartItem.id}
                    className="flex items-center justify-between gap-4 border-b pb-4"
                  >
                    <div>
                      <p className="font-medium text-slate-950">
                        {product.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        ${product.price} × {cartItem.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-lg"
                      >
                        -
                      </button>

                      <span className="w-6 text-center text-sm font-semibold">
                        {cartItem.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-2xl font-bold">
              <span>Total</span>
              <span>${total}.00</span>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="mt-6">
              <PaymentForm
                applicationId={applicationId}
                locationId={locationId}
                cardTokenizeResponseReceived={async (token) => {
                  if (!token.token) {
                    setMessage("Payment token failed. Please try again.")
                    return
                  }

                  setMessage("Processing payment...")

                  startTransition(async () => {
                    try {
                      const result = await createSquarePayment({
                        sourceId: token.token,
                        cart,
                      })

                      setCart([])
                      setMessage(
                        `Payment successful. Status: ${result.status}. Total charged: $${result.total}.00`
                      )
                    } catch (error) {
                      console.error(error)
                      setMessage("Payment failed. Please check your card and try again.")
                    }
                  })
                }}
              >
                <CreditCard
                  buttonProps={{
                    css: {
                      backgroundColor: "#020617",
                      fontSize: "16px",
                      color: "#ffffff",
                      borderRadius: "999px",
                      height: "48px",
                      cursor: isPending ? "not-allowed" : "pointer",
                    },
                  }}
                >
                  {isPending ? "Processing..." : `Pay $${total}.00`}
                </CreditCard>
              </PaymentForm>
            </div>
          )}

          {message && (
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
              {message}
            </p>
          )}

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Sandbox mode is for testing. Use Square test cards, not a real card.
          </p>
        </aside>
      </div>
    </div>
  )
}