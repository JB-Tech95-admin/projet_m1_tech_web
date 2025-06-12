const fs = require("fs")
const path = require("path")
const https = require("https")

// Create directories if they don't exist
const imagesDir = path.join(__dirname, "../public/images/products")
if (!fs.existsSync(path.join(__dirname, "../public"))) {
  fs.mkdirSync(path.join(__dirname, "../public"))
}
if (!fs.existsSync(path.join(__dirname, "../public/images"))) {
  fs.mkdirSync(path.join(__dirname, "../public/images"))
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir)
}

// Images to download
const images = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdidasBlanc-0pV33Ttoy67ohGehId8NbwLogx6fyV.png",
    filename: "adidas-blanc.png",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NickeMarron-2P1W79SOIt01VltSrvi10YL8tYUZJ8.png",
    filename: "nike-marron.png",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NickeOr-5WHOnWU3G7XKaomAFTzVYKnbBFEpYK.png",
    filename: "nike-or.png",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdidasNoir-GlxoPa1LBaMn60XH75RSEyOC59ve1D.png",
    filename: "adidas-noir.png",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NickeBleu-Y8qWyYRlNL8w8EVKnUkT7IN1GXW24T.png",
    filename: "nike-bleu.png",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NickeVert-5gdTdg8ljcaFCJjjGfzyxyu7BP6afJ.png",
    filename: "nike-vert.png",
  },
]

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename)
    const file = fs.createWriteStream(filePath)

    https
      .get(url, (response) => {
        response.pipe(file)

        file.on("finish", () => {
          file.close()
          console.log(`✅ Downloaded: ${filename}`)
          resolve()
        })

        file.on("error", (err) => {
          fs.unlink(filePath, () => {}) // Delete the file on error
          reject(err)
        })
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

// Download all images
async function downloadAllImages() {
  console.log("📥 Téléchargement des images...")

  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename)
    }

    console.log("\n🎉 Toutes les images ont été téléchargées!")
    console.log(`📁 Images sauvegardées dans: ${imagesDir}`)

    // Create placeholder images for missing products
    console.log("\n📝 Création des images placeholder...")

    // You can add placeholder creation logic here if needed
  } catch (error) {
    console.error("❌ Erreur lors du téléchargement:", error)
  }
}

downloadAllImages()
