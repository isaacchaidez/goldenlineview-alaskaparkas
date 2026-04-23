import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/products"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const filteredProducts = searchParams.category
    ? PRODUCTS.filter((p) => p.category === searchParams.category)
    : PRODUCTS

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {searchParams.category
                ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)}'s Parkas`
                : "All Parkas"}
            </h1>
            <p className="text-lg text-muted-foreground">Premium winter parkas built for extreme Alaskan conditions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
