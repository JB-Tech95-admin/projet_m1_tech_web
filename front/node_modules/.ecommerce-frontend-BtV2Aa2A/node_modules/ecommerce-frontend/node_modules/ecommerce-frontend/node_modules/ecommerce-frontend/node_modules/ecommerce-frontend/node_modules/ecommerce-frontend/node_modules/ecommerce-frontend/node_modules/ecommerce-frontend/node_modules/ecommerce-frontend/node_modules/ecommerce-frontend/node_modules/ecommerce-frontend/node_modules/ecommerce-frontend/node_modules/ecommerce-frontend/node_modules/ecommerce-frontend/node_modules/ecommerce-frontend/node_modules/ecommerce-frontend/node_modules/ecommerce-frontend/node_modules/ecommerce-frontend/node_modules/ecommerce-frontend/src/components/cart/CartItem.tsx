"use client"

import { Trash2 } from "lucide-react"
import type { CartItem as CartItemType } from "../../types"
import { useCart } from "../../context/CartContext"
import QuantitySelector from "../ui/QuantitySelector"
import Button from "../ui/Button"

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.productId, quantity)
  }

  const handleRemove = () => {
    removeFromCart(item.productId)
  }

  const product = item.product

  if (!product) {
    return null
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b last:border-b-0 gap-4">
      <div className="md:w-36 md:h-36 w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
        <img
          src={product.image || "/placeholder.svg?height=100&width=100"}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      <div className="flex-1 md:h-36 h-20 flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{product.brand}</h3>
            <p className="text-sm text-gray-600">{product.name}</p>
          </div>
          <span className="font-semibold text-gray-900">${product.price}</span>
        </div>

        <div className="flex items-center gap-12">
          <QuantitySelector quantity={item.quantity} onQuantityChange={handleQuantityChange} />

          <button
            onClick={handleRemove}
            className="border-b bg-white text-grey-700 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
