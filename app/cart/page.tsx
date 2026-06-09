import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartClient } from "@/components/cart-client"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartClient />
      <Footer />
    </div>
  )
}