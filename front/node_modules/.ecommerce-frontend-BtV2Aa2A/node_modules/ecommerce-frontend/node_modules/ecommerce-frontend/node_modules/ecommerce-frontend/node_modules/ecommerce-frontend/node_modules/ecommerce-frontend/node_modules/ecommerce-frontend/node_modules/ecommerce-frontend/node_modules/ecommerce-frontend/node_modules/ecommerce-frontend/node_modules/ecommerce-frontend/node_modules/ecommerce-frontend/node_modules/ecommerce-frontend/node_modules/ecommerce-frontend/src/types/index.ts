export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  images?: string[]
  description: string
  features?: string[]
  category: string
  in_stock: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product?: Product
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  message: string
}
