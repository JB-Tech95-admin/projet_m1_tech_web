const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD || "1234",
  port: process.env.DB_PORT || 5432,
})

const BASE_URL = process.env.BASE_URL || "http://localhost:3001"

const sampleProducts = [
  {
    name: "Adidas Court Bold Sneakers",
    brand: "adidas",
    price: 89.99,
    originalPrice: 110.0,
    discount: 18,
    image: `${BASE_URL}/images/products/adidas-blanc.png`,
    images: [`${BASE_URL}/images/products/adidas-blanc.png`],
    description:
      "Classic white court sneakers with gum sole. Perfect for everyday wear with a timeless design that never goes out of style.",
    features: ["Leather upper", "Gum rubber outsole", "Classic lace-up closure", "Comfortable cushioned insole"],
    category: "sneakers",
  },
  {
    name: "Nike Air Force 1 Pattern Edition",
    brand: "Nike",
    price: 125.0,
    originalPrice: 140.0,
    discount: 11,
    image: `${BASE_URL}/images/products/nike-marron.png`,
    images: [`${BASE_URL}/images/products/nike-marron.png`],
    description:
      "Unique patterned Nike Air Force 1 with brown accents and gum sole. A modern twist on the classic silhouette.",
    features: ["Premium synthetic upper", "Air cushioning", "Unique pattern design", "Gum rubber outsole"],
    category: "sneakers",
  },
  {
    name: "Nike Court Vision Low Gold",
    brand: "Nike",
    price: 95.0,
    image: `${BASE_URL}/images/products/nike-or.png`,
    images: [`${BASE_URL}/images/products/nike-or.png`],
    description: "Clean white sneakers with elegant gold accents. Inspired by basketball heritage with modern comfort.",
    features: [
      "Leather and synthetic upper",
      "Foam midsole",
      "Gold accent details",
      "Rubber outsole with pivot points",
    ],
    category: "sneakers",
  },
  {
    name: "Adidas Daily 3.0 Black",
    brand: "adidas",
    price: 75.0,
    originalPrice: 85.0,
    discount: 12,
    image: `${BASE_URL}/images/products/adidas-noir.png`,
    images: [`${BASE_URL}/images/products/adidas-noir.png`],
    description: "Classic black sneakers with iconic three stripes. Versatile design perfect for casual everyday wear.",
    features: ["Synthetic leather upper", "Three stripes design", "Comfortable fit", "Durable rubber outsole"],
    category: "sneakers",
  },
  {
    name: "Nike Air Force 1 High Light Blue",
    brand: "Nike",
    price: 135.0,
    image: `${BASE_URL}/images/products/nike-bleu.png`,
    images: [`${BASE_URL}/images/products/nike-bleu.png`],
    description:
      "Fresh light blue high-top sneakers with premium materials. Perfect for making a statement while staying comfortable.",
    features: ["High-top design", "Premium leather upper", "Air cushioning technology", "Ankle strap detail"],
    category: "sneakers",
  },
  {
    name: "Nike Dunk Low Green",
    brand: "Nike",
    price: 110.0,
    originalPrice: 125.0,
    discount: 12,
    image: `${BASE_URL}/images/products/nike-vert.png`,
    images: [`${BASE_URL}/images/products/nike-vert.png`],
    description: "Retro-inspired green and white Dunk Low sneakers. Classic basketball silhouette with vintage appeal.",
    features: ["Leather upper", "Perforated toe box", "Foam midsole", "Rubber outsole with circular traction pattern"],
    category: "sneakers",
  },
  {
    name: "Nike Air Max 90 Essential",
    brand: "Nike",
    price: 120.0,
    image: `${BASE_URL}/images/products/placeholder-nike.png`,
    images: [`${BASE_URL}/images/products/placeholder-nike.png`],
    description:
      "Iconic Air Max 90 with visible air cushioning. A timeless runner that combines style and performance.",
    features: ["Mesh and leather upper", "Visible Air Max unit", "Waffle rubber outsole", "Padded collar"],
    category: "sneakers",
  },
  {
    name: "Adidas Stan Smith Classic",
    brand: "adidas",
    price: 85.0,
    image: `${BASE_URL}/images/products/placeholder-adidas.png`,
    description:
      "The legendary Stan Smith in classic white and green. Clean, minimalist design that's always in style.",
    features: ["Leather upper", "Perforated 3-Stripes", "Green heel tab", "Rubber cupsole"],
    category: "sneakers",
  },
]

async function seedDatabase() {
  try {
    console.log("🌱 Insertion des données de test avec images locales...")

    // Clear existing data
    await pool.query("DELETE FROM cart_items")
    await pool.query("DELETE FROM carts")
    await pool.query("DELETE FROM products")

    console.log("🗑️  Données existantes supprimées")

    // Insert sample products
    for (const product of sampleProducts) {
      const query = `
        INSERT INTO products (name, brand, price, original_price, discount, image, images, description, features, category, in_stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `

      const values = [
        product.name,
        product.brand,
        product.price,
        product.originalPrice || null,
        product.discount || null,
        product.image,
        product.images ? JSON.stringify(product.images) : null,
        product.description,
        product.features ? JSON.stringify(product.features) : null,
        product.category,
        true,
      ]

      await pool.query(query, values)
      console.log(`✅ Produit ajouté: ${product.brand} ${product.name}`)
    }

    console.log(`\n🎉 ${sampleProducts.length} produits insérés avec succès!`)

    // Verify insertion
    const result = await pool.query("SELECT COUNT(*) FROM products")
    console.log(`📊 Total des produits en base: ${result.rows[0].count}`)

    // Show products summary
    const productsResult = await pool.query("SELECT brand, name, price, image FROM products ORDER BY brand, name")
    console.log("\n📋 Produits en base:")
    productsResult.rows.forEach((product) => {
      console.log(`  - ${product.brand} ${product.name} - $${product.price}`)
      console.log(`    Image: ${product.image}`)
    })
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion des données:", error)
  } finally {
    await pool.end()
  }
}

seedDatabase()
