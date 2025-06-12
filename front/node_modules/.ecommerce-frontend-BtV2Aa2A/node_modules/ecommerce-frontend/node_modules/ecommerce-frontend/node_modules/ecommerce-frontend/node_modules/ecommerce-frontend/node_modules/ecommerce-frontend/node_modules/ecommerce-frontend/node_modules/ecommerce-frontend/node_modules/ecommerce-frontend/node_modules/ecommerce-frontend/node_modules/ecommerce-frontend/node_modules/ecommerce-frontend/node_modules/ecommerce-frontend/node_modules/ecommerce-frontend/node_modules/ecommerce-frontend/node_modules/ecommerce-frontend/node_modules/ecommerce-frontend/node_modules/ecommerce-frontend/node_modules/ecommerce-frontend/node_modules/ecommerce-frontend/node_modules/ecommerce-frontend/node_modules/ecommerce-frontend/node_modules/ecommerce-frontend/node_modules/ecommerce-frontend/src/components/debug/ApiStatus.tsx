import { useState, useEffect } from "react"
import { apiService } from "../../services/api"

const ApiStatus = () => {
  const [status, setStatus] = useState<{
    backend: "checking" | "connected" | "error"
    database: "checking" | "connected" | "error"
    products: number
    images: number
    error?: string
  }>({
    backend: "checking",
    database: "checking",
    products: 0,
    images: 0,
  })

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check backend health
        const health = await apiService.healthCheck()

        // Check products
        const products = await apiService.getProducts({ limit: 1 })

        // Check images
        const images = await apiService.getAvailableImages()

        setStatus({
          backend: health.status === "OK" ? "connected" : "error",
          database: health.database === "Connected" ? "connected" : "error",
          products: products.length,
          images: images.total,
        })
      } catch (error) {
        console.error("API Status check failed:", error)
        setStatus((prev) => ({
          ...prev,
          backend: "error",
          database: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        }))
      }
    }

    checkStatus()
  }, [])

  const getStatusIcon = (status: "checking" | "connected" | "error") => {
    switch (status) {
      case "checking":
        return "🔄"
      case "connected":
        return "✅"
      case "error":
        return "❌"
    }
  }

  const getStatusText = (status: "checking" | "connected" | "error") => {
    switch (status) {
      case "checking":
        return "Checking..."
      case "connected":
        return "Connected"
      case "error":
        return "Error"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm z-50">
      <h3 className="font-semibold mb-2">API Status</h3>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span>Backend:</span>
          <span className="flex items-center gap-1">
            {getStatusIcon(status.backend)}
            {getStatusText(status.backend)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Database:</span>
          <span className="flex items-center gap-1">
            {getStatusIcon(status.database)}
            {getStatusText(status.database)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Products:</span>
          <span>{status.products}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Images:</span>
          <span>{status.images}</span>
        </div>
      </div>

      {status.error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">{status.error}</div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        API: {"http://localhost:3001/api"}
      </div>
    </div>
  )
}

export default ApiStatus
