const { pool } = require("../config/database")

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique du produit
 *         name:
 *           type: string
 *           description: Nom du produit
 *         brand:
 *           type: string
 *           description: Marque du produit
 *         price:
 *           type: number
 *           description: Prix du produit
 *         originalPrice:
 *           type: number
 *           description: Prix original (avant réduction)
 *         discount:
 *           type: number
 *           description: Pourcentage de réduction
 *         image:
 *           type: string
 *           description: URL de l'image principale
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs des images supplémentaires
 *         description:
 *           type: string
 *           description: Description du produit
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: Caractéristiques du produit
 *         category:
 *           type: string
 *           description: Catégorie du produit
 *         inStock:
 *           type: boolean
 *           description: Disponibilité en stock
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

class Product {
  static async findAll(filters = {}) {
    try {
      const { category, brand, limit = 50, offset = 0 } = filters

      let query = "SELECT * FROM products WHERE 1=1"
      const params = []
      let paramCount = 0

      if (category) {
        paramCount++
        query += ` AND category = $${paramCount}`
        params.push(category)
      }

      if (brand) {
        paramCount++
        query += ` AND brand ILIKE $${paramCount}`
        params.push(`%${brand}%`)
      }

      query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`
      params.push(limit, offset)

      const result = await pool.query(query, params)

      // Parse JSON fields
      return result.rows.map((product) => ({
        ...product,
        images: product.images ? product.images : null,
        features: product.features ? product.features : null,
      }))
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`)
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [id])

      if (result.rows.length === 0) {
        return null
      }

      const product = result.rows[0]
      // Parse JSON fields
      product.images = product.images ? product.images : null
      product.features = product.features ? product.features : null

      return product
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`)
    }
  }

  static async exists(id) {
    try {
      const result = await pool.query("SELECT id FROM products WHERE id = $1", [id])
      return result.rows.length > 0
    } catch (error) {
      throw new Error(`Error checking product existence: ${error.message}`)
    }
  }
}

module.exports = Product
