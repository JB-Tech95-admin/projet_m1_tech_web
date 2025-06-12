const express = require("express")
const cors = require("cors")
const path = require("path")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
require("dotenv").config()

// Import routes
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")

// Import database connection
const { pool, connectDB } = require("./config/database")

const app = express()
const PORT = process.env.PORT || 3001

// Test database connection
connectDB()

// Enhanced CORS configuration
const corsOptions = {
  origin: ["http://localhost:5473", "http://127.0.0.1:5473", process.env.CORS_ORIGIN].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Serve static files (images)
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/public", express.static(path.join(__dirname, "public")))

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API with PostgreSQL",
      version: "1.0.0",
      description: "API pour la gestion des produits et du panier avec PostgreSQL",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
}

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// API Routes
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)

// Route pour lister les images disponibles
app.get("/api/images", (req, res) => {
  const fs = require("fs")
  const imagesPath = path.join(__dirname, "public/images/products")

  try {
    if (!fs.existsSync(imagesPath)) {
      return res.json({
        total: 0,
        images: [],
        message: "Images directory not found. Run 'npm run download-images' to create it.",
      })
    }

    const files = fs.readdirSync(imagesPath)
    const imageFiles = files.filter(
      (file) =>
        file.toLowerCase().endsWith(".jpg") ||
        file.toLowerCase().endsWith(".jpeg") ||
        file.toLowerCase().endsWith(".png") ||
        file.toLowerCase().endsWith(".webp"),
    )

    const imageUrls = imageFiles.map((file) => ({
      filename: file,
      url: `http://localhost:${PORT}/images/products/${file}`,
    }))

    res.json({
      total: imageUrls.length,
      images: imageUrls,
    })
  } catch (error) {
    console.error("Error reading images directory:", error)
    res.status(500).json({
      error: "Erreur lors de la lecture du dossier images",
      message: error.message,
    })
  }
})

// Route de base avec informations de debug
app.get("/", (req, res) => {
  res.json({
    message: "API E-commerce - SUN CO. avec PostgreSQL",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      documentation: `http://localhost:${PORT}/api-docs`,
      health: `http://localhost:${PORT}/health`,
      products: `http://localhost:${PORT}/api/products`,
      images: `http://localhost:${PORT}/api/images`,
      static_images: `http://localhost:${PORT}/images`,
    },
    environment: {
      node_env: process.env.NODE_ENV || "development",
      port: PORT,
      cors_origin: process.env.CORS_ORIGIN,
      base_url: process.env.BASE_URL,
    },
  })
})

// Enhanced health check
app.get("/health", async (req, res) => {
  try {
    // Test database connection
    const dbResult = await pool.query("SELECT NOW() as timestamp, COUNT(*) as product_count FROM products")

    // Check images directory
    const fs = require("fs")
    const imagesPath = path.join(__dirname, "public/images/products")
    const imagesExist = fs.existsSync(imagesPath)
    const imageCount = imagesExist ? fs.readdirSync(imagesPath).length : 0

    res.json({
      status: "OK",
      database: "Connected",
      timestamp: dbResult.rows[0].timestamp,
      products: Number.parseInt(dbResult.rows[0].product_count),
      images: {
        directory_exists: imagesExist,
        count: imageCount,
        path: imagesPath,
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    })
  } catch (error) {
    console.error("Health check failed:", error)
    res.status(500).json({
      status: "Error",
      database: "Disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} - Error:`, err.stack)
  res.status(500).json({
    error: "Erreur interne du serveur",
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    timestamp: new Date().toISOString(),
  })
})

// Enhanced 404 handler
app.use("*", (req, res) => {
  console.log(`${new Date().toISOString()} - 404: ${req.method} ${req.originalUrl}`)
  res.status(404).json({
    error: "Route non trouvée",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    available_endpoints: ["/api/products", "/api/cart/:cartId", "/api/images", "/health", "/api-docs"],
  })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur le port ${PORT}`)
  console.log(`📚 Documentation Swagger: http://localhost:${PORT}/api-docs`)
  console.log(`🖼️  Images disponibles: http://localhost:${PORT}/images`)
  console.log(`🔍 API Images: http://localhost:${PORT}/api/images`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
  console.log(`🌐 CORS autorisé pour: ${corsOptions.origin.join(", ")}`)
  console.log(`📁 Images path: ${path.join(__dirname, "public/images/products")}`)
  console.log(`\n✅ Backend prêt pour le frontend sur http://localhost:3000\n`)
})
