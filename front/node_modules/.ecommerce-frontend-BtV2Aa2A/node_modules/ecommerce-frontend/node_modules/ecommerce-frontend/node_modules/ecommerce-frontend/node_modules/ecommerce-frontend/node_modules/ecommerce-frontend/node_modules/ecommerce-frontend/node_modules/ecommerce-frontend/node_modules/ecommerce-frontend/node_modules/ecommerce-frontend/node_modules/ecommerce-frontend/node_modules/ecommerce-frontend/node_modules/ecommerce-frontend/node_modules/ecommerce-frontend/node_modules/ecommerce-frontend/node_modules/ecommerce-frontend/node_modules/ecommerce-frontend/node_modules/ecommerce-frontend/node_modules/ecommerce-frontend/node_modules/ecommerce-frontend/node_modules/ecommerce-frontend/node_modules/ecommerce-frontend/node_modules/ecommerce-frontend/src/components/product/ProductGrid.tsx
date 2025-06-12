import type { Product } from "../../types"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  title?: string
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <section className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-gray-900 text-left">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
