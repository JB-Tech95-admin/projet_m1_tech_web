const { pool } = require("../config/database")

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: ID de l'item du panier
 *         productId:
 *           type: string
 *           description: ID du produit
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantité du produit
 *         product:
 *           $ref: '#/components/schemas/Product'
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID du panier
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         subtotal:
 *           type: number
 *           description: Sous-total
 *         shipping:
 *           type: number
 *           description: Frais de livraison
 *         tax:
 *           type: number
 *           description: Taxes
 *         discount:
 *           type: number
 *           description: Réduction
 *         total:
 *           type: number
 *           description: Total
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class Cart {
  static calculateTotals(cartItems) {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.product ? item.product.price * item.quantity : 0)
    }, 0)

    const shipping = subtotal > 0 ? 30 : 0
    const tax = subtotal * 0.1
    const discount = subtotal > 100 ? 6 : 0
    const total = subtotal + shipping + tax - discount

    return { subtotal, shipping, tax, discount, total }
  }

  static async findById(cartId) {
    try {
      // Get or create cart
      let cartResult = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId])

      if (cartResult.rows.length === 0) {
        // Create new cart
        await pool.query("INSERT INTO carts (id) VALUES ($1)", [cartId])
        cartResult = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId])
      }

      // Get cart items with product details
      const itemsResult = await pool.query(
        `
        SELECT ci.*, p.name, p.brand, p.price, p.image, p.description, p.category, p.in_stock,
               p.original_price, p.discount, p.images, p.features
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1
      `,
        [cartId],
      )

      const items = itemsResult.rows.map((item) => ({
        id: item.id,
        productId: item.product_id,
        quantity: item.quantity,
        product: {
          id: item.product_id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          originalPrice: item.original_price,
          discount: item.discount,
          image: item.image,
          images: item.images ? item.images : null,
          description: item.description,
          features: item.features ? item.features : null,
          category: item.category,
          inStock: item.in_stock,
        },
      }))

      const totals = this.calculateTotals(items)
      const cart = cartResult.rows[0]

      return {
        id: cart.id,
        items,
        ...totals,
        createdAt: cart.created_at,
        updatedAt: cart.updated_at,
      }
    } catch (error) {
      throw new Error(`Error fetching cart: ${error.message}`)
    }
  }

  static async addItem(cartId, productId, quantity) {
    try {
      // Ensure cart exists
      await pool.query(
        `
        INSERT INTO carts (id) VALUES ($1) 
        ON CONFLICT (id) DO NOTHING
      `,
        [cartId],
      )

      // Check if item already exists in cart
      const existingItemResult = await pool.query("SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2", [
        cartId,
        productId,
      ])

      if (existingItemResult.rows.length > 0) {
        // Update existing item
        await pool.query(
          "UPDATE cart_items SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE cart_id = $2 AND product_id = $3",
          [quantity, cartId, productId],
        )
      } else {
        // Add new item
        await pool.query("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)", [
          cartId,
          productId,
          quantity,
        ])
      }

      // Update cart timestamp
      await pool.query("UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId])

      return await this.findById(cartId)
    } catch (error) {
      throw new Error(`Error adding item to cart: ${error.message}`)
    }
  }

  static async updateItem(cartId, productId, quantity) {
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        await pool.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cartId, productId])
      } else {
        // Update quantity
        const result = await pool.query(
          "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE cart_id = $2 AND product_id = $3 RETURNING *",
          [quantity, cartId, productId],
        )

        if (result.rows.length === 0) {
          throw new Error("Item not found in cart")
        }
      }

      // Update cart timestamp
      await pool.query("UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId])

      return await this.findById(cartId)
    } catch (error) {
      throw new Error(`Error updating cart item: ${error.message}`)
    }
  }

  static async removeItem(cartId, productId) {
    try {
      const result = await pool.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *", [
        cartId,
        productId,
      ])

      if (result.rows.length === 0) {
        throw new Error("Item not found in cart")
      }

      // Update cart timestamp
      await pool.query("UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId])

      return await this.findById(cartId)
    } catch (error) {
      throw new Error(`Error removing item from cart: ${error.message}`)
    }
  }

  static async clear(cartId) {
    try {
      // Delete all items from cart
      await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId])

      // Update cart timestamp
      await pool.query("UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1", [cartId])

      return {
        id: cartId,
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
      }
    } catch (error) {
      throw new Error(`Error clearing cart: ${error.message}`)
    }
  }
}

module.exports = Cart
