"use client"

import { Link } from "react-router-dom"
import type { Product } from "../../types"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-gray-100 rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900 text-left">{product.brand}</h3>
            <p className="text-sm text-gray-600 text-left">{product.name}</p>
          </div>
          <div className="text-right">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div>
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                <span className="text-lg font-semibold text-gray-900 ml-2">${product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-gray-900">${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
