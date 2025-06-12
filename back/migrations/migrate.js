const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ecommerce",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
})

async function runMigrations() {
  try {
    console.log("🔄 Exécution des migrations...")

    // Read and execute migration file
    const migrationPath = path.join(__dirname, "001_create_tables.sql")
    const migrationSQL = fs.readFileSync(migrationPath, "utf8")

    await pool.query(migrationSQL)

    console.log("✅ Migrations exécutées avec succès!")

    // Verify tables were created
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `)

    console.log("📋 Tables créées:")
    result.rows.forEach((row) => {
      console.log(`  - ${row.table_name}`)
    })
  } catch (error) {
    console.error("❌ Erreur lors de l'exécution des migrations:", error)
  } finally {
    await pool.end()
  }
}

runMigrations()
