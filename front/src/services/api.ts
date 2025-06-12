import type { Product, Cart } from "../types"

const API_BASE_URL = "http://localhost:3001/api"

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    }

    try {
      console.log(`🔗 API Request: ${config.method || "GET"} ${url}`)

      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error(`❌ API Error: ${response.status}`, errorData)
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ API Success: ${config.method || "GET"} ${url}`, data)
      return data
    } catch (error) {
      console.error("❌ API request failed:", error)
      throw error
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; database: string }> {
    try {
      const response = await fetch(`${API_BASE_URL.replace("/api", "")}/health`)
      return await response.json()
    } catch (error) {
      console.error("Health check failed:", error)
      throw error
    }
  }

  // Products
  async getProducts(filters?: {
    category?: string
    brand?: string
    limit?: number
    offset?: number
  }): Promise<Product[]> {
    const params = new URLSearchParams()

    if (filters?.category) params.append("category", filters.category)
    if (filters?.brand) params.append("brand", filters.brand)
    if (filters?.limit) params.append("limit", filters.limit.toString())
    if (filters?.offset) params.append("offset", filters.offset.toString())

    const queryString = params.toString()
    const endpoint = `/products${queryString ? `?${queryString}` : ""}`

    return this.request<Product[]>(endpoint)
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`)
  }

  // Cart
  async getCart(cartId: string): Promise<Cart> {
    return this.request<Cart>(`/cart/${cartId}`)
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<Cart> {
    return this.request<Cart>(`/cart/${cartId}/items`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  }

  async updateCartItem(cartId: string, productId: string, quantity: number): Promise<Cart> {
    return this.request<Cart>(`/cart/${cartId}/items/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })
  }

  async removeFromCart(cartId: string, productId: string): Promise<Cart> {
    return this.request<Cart>(`/cart/${cartId}/items/${productId}`, {
      method: "DELETE",
    })
  }

  async clearCart(cartId: string): Promise<Cart> {
    return this.request<Cart>(`/cart/${cartId}`, {
      method: "DELETE",
    })
  }

  // Images
  async getAvailableImages(): Promise<{ total: number; images: Array<{ filename: string; url: string }> }> {
    try {
      const response = await fetch(`${API_BASE_URL}/images`)
      return await response.json()
    } catch (error) {
      console.error("Failed to get available images:", error)
      throw error
    }
  }
}

export const apiService = new ApiService()

// Export for debugging
if (typeof window !== "undefined") {
  ;(window as any).apiService = apiService
}
