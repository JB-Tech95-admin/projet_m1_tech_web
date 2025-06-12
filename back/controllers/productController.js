const Product = require("../models/Product")

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const { category, brand, limit, offset } = req.query
      const filters = { category, brand, limit, offset }

      const products = await Product.findAll(filters)
	    
      res.json(products)
    } catch (error) {
      console.error("Error in getAllProducts:", error)
      res.status(500).json({ error: "Erreur lors de la récupération des produits ok ok" })
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params
      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" })
      }

      res.json(product)
    } catch (error) {
      console.error("Error in getProductById:", error)
      res.status(500).json({ error: "Erreur lors de la récupération du produit" })
    }
  }
}

module.exports = ProductController
