"use server"

import crypto from "crypto"
import { squareClient } from "@/lib/square"
import { products, Size } from "@/lib/products"

type CartItem = {
  id: string
  size: Size
  quantity: number
}

type CreateSquarePaymentInput = {
  sourceId: string
  cart: CartItem[]
}

export async function createSquarePayment({
  sourceId,
  cart,
}: CreateSquarePaymentInput) {
  if (!sourceId) {
    throw new Error("Missing Square payment source")
  }

  if (!cart.length) {
    throw new Error("Cart is empty")
  }

  let total = 0

  const orderSummary = cart
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.id)

      if (!product) {
        throw new Error(`Product not found: ${cartItem.id}`)
      }

      total += product.price * cartItem.quantity

      return `${product.name} - Size ${cartItem.size} x${cartItem.quantity}`
    })
    .join(", ")

  const response = await squareClient.payments.create({
    sourceId,
    idempotencyKey: crypto.randomUUID(),
    amountMoney: {
      amount: BigInt(total * 100),
      currency: "USD",
    },
    note: `Goldenline View parka order: ${orderSummary}`,
  })

  return {
    paymentId: response.payment?.id,
    status: response.payment?.status,
    total,
  }
}