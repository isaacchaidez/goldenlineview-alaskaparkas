import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PRODUCTS, formatPrice } from "@/lib/products"
import { Check } from "lucide-react"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              <div>
                <Badge className="mb-4">{product.category}</Badge>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold mb-6">{formatPrice(product.priceInCents)}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div>
                {product.inStock ? (
                  <p className="text-green-600 font-medium">In Stock - Ships within 2-3 business days</p>
                ) : (
                  <p className="text-red-600 font-medium">Currently Out of Stock</p>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Button asChild size="lg" className="flex-1" disabled={!product.inStock}>
                  <Link href={`/checkout/${product.id}`}>{product.inStock ? "Buy Now" : "Out of Stock"}</Link>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Free Shipping</h4>
                  <p className="text-muted-foreground">Free standard shipping on all orders within Alaska</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Lifetime Warranty</h4>
                  <p className="text-muted-foreground">All parkas come with our lifetime warranty against defects</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">30-Day Returns</h4>
                  <p className="text-muted-foreground">Not satisfied? Return within 30 days for a full refund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
