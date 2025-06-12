const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "127.0.0.1/32",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD || "1234",
  port: process.env.DB_PORT || 5432,
})

const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log("✅ Connected to PostgreSQL database")
    client.release()
  } catch (err) {
    console.error("❌ Error connecting to the database:", err.stack)
    process.exit(1)
  }
}

module.exports = { pool, connectDB }
