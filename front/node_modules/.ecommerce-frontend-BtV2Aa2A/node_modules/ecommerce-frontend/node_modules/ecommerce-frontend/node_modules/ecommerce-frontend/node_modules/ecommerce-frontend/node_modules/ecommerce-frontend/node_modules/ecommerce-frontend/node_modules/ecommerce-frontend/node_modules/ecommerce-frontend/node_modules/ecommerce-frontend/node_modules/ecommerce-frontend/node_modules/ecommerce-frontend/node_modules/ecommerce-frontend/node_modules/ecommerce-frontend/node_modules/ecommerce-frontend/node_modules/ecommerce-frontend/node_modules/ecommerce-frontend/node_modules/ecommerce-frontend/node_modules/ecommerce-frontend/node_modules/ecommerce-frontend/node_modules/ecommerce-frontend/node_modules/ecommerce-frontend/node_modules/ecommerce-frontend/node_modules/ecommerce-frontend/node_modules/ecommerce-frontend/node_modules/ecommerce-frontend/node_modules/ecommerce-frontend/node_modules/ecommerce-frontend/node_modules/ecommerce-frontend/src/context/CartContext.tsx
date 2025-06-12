"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Cart, Product } from "../types"
import { apiService } from "../services/api"

interface CartState {
  cart: Cart | null
  isOpen: boolean
  loading: boolean
  error: string | null
}

type CartAction =
  | { type: "SET_CART"; payload: Cart }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getCartItemsCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, loading: false, error: null }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "OPEN_CART":
      return { ...state, isOpen: true }
    case "CLOSE_CART":
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const initialState: CartState = {
  cart: null,
  isOpen: false,
  loading: false,
  error: null,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Generate or get cart ID from localStorage
  const getCartId = () => {
    let cartId = localStorage.getItem("cartId")
    if (!cartId) {
      cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("cartId", cartId)
    }
    return cartId
  }

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true })
        const cartId = getCartId()
        const cart = await apiService.getCart(cartId)
        dispatch({ type: "SET_CART", payload: cart })
      } catch (error) {
        console.error("Failed to load cart:", error)
        dispatch({ type: "SET_ERROR", payload: "Failed to load cart" })
      }
    }

    loadCart()
  }, [])

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const cartId = getCartId()
      const updatedCart = await apiService.addToCart(cartId, product.id, quantity)
      dispatch({ type: "SET_CART", payload: updatedCart })
      dispatch({ type: "OPEN_CART" })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to add item to cart" })
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const cartId = getCartId()
      const updatedCart = await apiService.updateCartItem(cartId, productId, quantity)
      dispatch({ type: "SET_CART", payload: updatedCart })
    } catch (error) {
      console.error("Failed to update quantity:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to update quantity" })
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const cartId = getCartId()
      const updatedCart = await apiService.removeFromCart(cartId, productId)
      dispatch({ type: "SET_CART", payload: updatedCart })
    } catch (error) {
      console.error("Failed to remove from cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to remove item from cart" })
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const cartId = getCartId()
      const updatedCart = await apiService.clearCart(cartId)
      dispatch({ type: "SET_CART", payload: updatedCart })
    } catch (error) {
      console.error("Failed to clear cart:", error)
      dispatch({ type: "SET_ERROR", payload: "Failed to clear cart" })
    }
  }

  const toggleCart = () => dispatch({ type: "TOGGLE_CART" })
  const openCart = () => dispatch({ type: "OPEN_CART" })
  const closeCart = () => dispatch({ type: "CLOSE_CART" })

  const getCartItemsCount = () => {
    return state.cart?.items.reduce((total, item) => total + item.quantity, 0) || 0
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
