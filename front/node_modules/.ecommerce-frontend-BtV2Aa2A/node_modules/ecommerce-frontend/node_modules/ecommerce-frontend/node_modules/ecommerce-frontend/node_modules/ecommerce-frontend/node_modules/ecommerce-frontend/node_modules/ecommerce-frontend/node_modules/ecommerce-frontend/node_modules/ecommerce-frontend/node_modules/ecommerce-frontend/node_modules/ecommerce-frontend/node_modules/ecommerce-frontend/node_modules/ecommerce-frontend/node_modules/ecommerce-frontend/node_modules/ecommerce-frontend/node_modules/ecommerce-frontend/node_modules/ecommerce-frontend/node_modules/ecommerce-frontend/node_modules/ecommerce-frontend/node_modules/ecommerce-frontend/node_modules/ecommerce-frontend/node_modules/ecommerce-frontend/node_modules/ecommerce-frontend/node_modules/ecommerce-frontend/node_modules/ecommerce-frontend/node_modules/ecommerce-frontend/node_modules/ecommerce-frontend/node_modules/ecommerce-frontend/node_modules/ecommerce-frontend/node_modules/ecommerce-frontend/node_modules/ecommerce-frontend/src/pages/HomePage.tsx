import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import type { Product } from "../types"
import { apiService } from "../services/api"
import ProductGrid from "../components/product/ProductGrid"
import Button from "../components/ui/Button"

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Test API connection first
        console.log("🔍 Testing API connection...")
        await apiService.healthCheck()
        console.log("✅ API connection successful")

        // Fetch products
        console.log("📦 Fetching products...")
        const fetchedProducts = await apiService.getProducts()
        console.log(`✅ Fetched ${fetchedProducts.length} products`)

        setProducts(fetchedProducts)
      } catch (err) {
        console.error("❌ Error in HomePage:", err)
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
          <p className="text-sm text-gray-400 mt-2">
            Connecting to API: {"http://localhost:3001/api"}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
          <p className="text-red-600 mb-4">{error}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <h3 className="font-semibold mb-2">Troubleshooting:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Make sure the backend server is running on port 3001</li>
              <li>• Check if PostgreSQL database is connected</li>
              <li>• Verify API URL: {"http://localhost:3001/api"}</li>
              <li>
                • Run: <code className="bg-gray-200 px-1 rounded">cd backend && npm run dev</code>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("http://localhost:3001/health", "_blank")}
              className="w-full"
            >
              Check Backend Health
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-4">The database seems to be empty.</p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">Run the seed command to add sample products:</p>
            <code className="block mt-2 bg-blue-100 p-2 rounded text-sm">cd backend && npm run seed</code>
          </div>

          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
     

      {/* Hero Section */}
      <div className="bg-gray-100 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-orange-500 text-2xl font-bold">25% OFF</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Summer Sale</h1>
              <p className="text-gray-600">Discover our summer styles with discount</p>
            </div>

            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Shop Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="relative">
            <img
              src="http://localhost:3001/images/products/nike-vert.png"
              alt="Summer Sale Shoe"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <ProductGrid products={products} title="Explore our latest drops" />

    </div>
  )
}

export default HomePage
