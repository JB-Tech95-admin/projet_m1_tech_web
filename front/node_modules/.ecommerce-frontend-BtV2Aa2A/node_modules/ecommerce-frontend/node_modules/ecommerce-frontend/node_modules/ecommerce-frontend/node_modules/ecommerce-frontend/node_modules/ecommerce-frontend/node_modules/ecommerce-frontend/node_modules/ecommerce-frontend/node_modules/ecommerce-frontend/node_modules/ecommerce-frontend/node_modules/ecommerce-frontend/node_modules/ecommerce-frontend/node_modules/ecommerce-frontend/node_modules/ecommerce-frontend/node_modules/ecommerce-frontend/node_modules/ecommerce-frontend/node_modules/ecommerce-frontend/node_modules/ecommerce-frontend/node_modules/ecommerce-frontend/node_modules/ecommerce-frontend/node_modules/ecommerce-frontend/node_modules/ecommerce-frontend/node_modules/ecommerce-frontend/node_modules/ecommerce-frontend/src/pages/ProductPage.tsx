import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "../types"
import { apiService } from "../services/api"
import { useCart } from "../context/CartContext"
import Button from "../components/ui/Button"
import QuantitySelector from "../components/ui/QuantitySelector"

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      try {
        setLoading(true)
        const fetchedProduct = await apiService.getProduct(id)
        setProduct(fetchedProduct)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Product not found"}</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images || [product.image]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4 max-h-[400px]">
          <div className="relative w-full h-full bg-gray-100 rounded-2xl p-8 aspect-square">
            <img
              src={images[currentImageIndex] || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              className="w-full h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {images.length > 0 && (
            <div className="flex space-x-2 justify-center p-5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? "bg-gray-900" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 flex flex-col justify-center shadow-xl rounded-xl">

          <div className="p-10 flex flex-col gap-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.brand}</h1>
            <p className="text-xl text-gray-600">{product.name}</p>


            <div className="flex items-center space-x-4">
              {product.originalPrice && product.originalPrice > product.price ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  )}
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              )}
            </div>
          </div>

          <hr />

          <div className="p-10 flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>
            <Button onClick={handleAddToCart} disabled={!product.in_stock} className="w-full" size="lg">
              {product.in_stock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>


        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductPage
