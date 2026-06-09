"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState, useTransition } from "react"
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk"

import { createSquarePayment } from "@/app/actions/square"
import { products } from "@/lib/products"

type CartItem = {
  id: string
  quantity: number
}

export function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID

  useEffect(() => {
    const savedCart = localStorage.getItem("goldenline-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  function saveCart(updatedCart: CartItem[]) {
    setCart(updatedCart)
    localStorage.setItem("goldenline-cart", JSON.stringify(updatedCart))
  }

  function addItem(productId: string) {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )

    saveCart(updatedCart)
  }

  function removeItem(productId: string) {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)

    saveCart(updatedCart)
  }

  function clearCart() {
    saveCart([])
    localStorage.removeItem("goldenline-cart")
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

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold text-slate-950">Your Cart</h1>
        <p className="mt-3 text-lg text-slate-600">
          Review your custom parka order before checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-950">
            Your cart is empty.
          </h2>
          <p className="mt-3 text-slate-600">
            Add a parka from the shop to begin your order.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-5">
            {cart.map((cartItem) => {
              const product = products.find((item) => item.id === cartItem.id)

              if (!product) return null

              return (
                <div
                  key={cartItem.id}
                  className="flex gap-5 rounded-3xl border bg-white p-5 shadow-sm"
                >
                  <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-slate-600">$60.00 each</p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-lg"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {cartItem.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => addItem(product.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border bg-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>

          <aside className="h-fit rounded-3xl border bg-slate-50 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3 border-b pb-6">
              <div className="flex justify-between text-slate-700">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-slate-950">
                <span>Total</span>
                <span>${total}.00</span>
              </div>
            </div>

            {!applicationId || !locationId ? (
              <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-red-600">
                Square is not configured. Make sure `.env.local` is in the root
                folder and restart npm run dev.
              </div>
            ) : (
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

                        clearCart()
                        setMessage(
                          `Payment successful. Total charged: $${result.total}.00`
                        )
                      } catch (error) {
                        console.error(error)
                        setMessage(
                          "Payment failed. Please check your card and try again."
                        )
                      }
                    })
                  }}
                >
                  <CreditCard
                    buttonProps={{
                      css: {
                        backgroundColor: "#020617",
                        color: "#ffffff",
                        fontSize: "16px",
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

            <button
              type="button"
              onClick={clearCart}
              className="mt-4 w-full rounded-full border px-5 py-3 font-semibold text-slate-700 hover:bg-white"
            >
              Clear Cart
            </button>

            {message && (
              <p className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
                {message}
              </p>
            )}

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Sandbox mode is for testing. Use Square test cards only.
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}