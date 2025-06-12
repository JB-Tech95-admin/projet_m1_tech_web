const Cart = require("../models/Cart")
const Product = require("../models/Product")

class CartController {
  static async getCart(req, res) {
    try {
      const { cartId } = req.params
      const cart = await Cart.findById(cartId)
      res.json(cart)
    } catch (error) {
      console.error("Error in getCart:", error)
      res.status(500).json({ error: "Erreur lors de la récupération du panier" })
    }
  }

  static async addToCart(req, res) {
    try {
      const { cartId } = req.params
      const { productId, quantity } = req.body
      console.log(req.params)
      console.log(req.body)

      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ error: "ProductId et quantity sont requis" })
      }

      // Check if product exists
      const productExists = await Product.exists(productId)
      if (!productExists) {
        return res.status(404).json({ error: "Produit non trouvé" })
      }

      const cart = await Cart.addItem(cartId, productId, quantity)
      res.json(cart)
    } catch (error) {
      console.error("Error in addToCart:", error)
      res.status(500).json({ error: "Erreur lors de l'ajout au panier" })
    }
  }

  static async updateCartItem(req, res) {
    try {
      const { cartId, productId } = req.params
      const { quantity } = req.body

      const cart = await Cart.updateItem(cartId, productId, quantity)
      res.json(cart)
    } catch (error) {
      console.error("Error in updateCartItem:", error)
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: "Produit non trouvé dans le panier" })
      }
      res.status(500).json({ error: "Erreur lors de la mise à jour du panier" })
    }
  }

  static async removeFromCart(req, res) {
    try {
      const { cartId, productId } = req.params

      const cart = await Cart.removeItem(cartId, productId)
      res.json(cart)
    } catch (error) {
      console.error("Error in removeFromCart:", error)
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: "Produit non trouvé dans le panier" })
      }
      res.status(500).json({ error: "Erreur lors de la suppression du panier" })
    }
  }

  static async clearCart(req, res) {
    try {
      const { cartId } = req.params

      const cart = await Cart.clear(cartId)
      res.json(cart)
    } catch (error) {
      console.error("Error in clearCart:", error)
      res.status(500).json({ error: "Erreur lors du vidage du panier" })
    }
  }
}

module.exports = CartController
