import Image from "next/image"
import Link from "next/link"
import { type Product, formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {!product.inStock && (
            <Badge className="absolute top-4 right-4" variant="secondary">
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
        <p className="text-2xl font-bold">{formatPrice(product.priceInCents)}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" disabled={!product.inStock}>
          <Link href={`/products/${product.id}`}>{product.inStock ? "View Details" : "Out of Stock"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
