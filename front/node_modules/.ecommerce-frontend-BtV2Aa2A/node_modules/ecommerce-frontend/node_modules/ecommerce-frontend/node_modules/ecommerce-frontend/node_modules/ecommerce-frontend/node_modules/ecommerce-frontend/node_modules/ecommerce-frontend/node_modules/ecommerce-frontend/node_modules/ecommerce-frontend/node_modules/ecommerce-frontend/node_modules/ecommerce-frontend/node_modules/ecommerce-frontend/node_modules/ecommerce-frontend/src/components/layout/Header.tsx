"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"


const Header = () => {
  const { toggleCart, getCartItemsCount } = useCart()
  const itemsCount = getCartItemsCount()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="http://localhost:3001/images/products/icon.png" alt="" />
            </div>
            <span className="text-xl font-bold text-gray-900">SUN CO.</span>
          </Link>

          <Link
          to='/cart'
            className="relative py-2 px-5 border border-gray-500 rounded-xl text-gray-600 hover:text-gray-900 transition-colors flex items-center"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">View Cart</span>
            {itemsCount > 0 && (
              <span className="ml-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
