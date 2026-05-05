import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlPath = 'C:/Users/Mollusca/OneDrive - Bank Rakyat Indonesia/8. LEGACY VAULT/2026/5. MEI/Souvenir/marka-studio-website.html'
const outDir = join(__dirname, '../public/products')

mkdirSync(outDir, { recursive: true })

const html = readFileSync(htmlPath, 'utf8')

// Find the last <script> tag
const scriptIdx = html.lastIndexOf('<script>')
const scriptEnd = html.indexOf('</script>', scriptIdx)
const script = html.substring(scriptIdx + 8, scriptEnd)

// Find allProducts array (JSON format)
const arrStart = script.indexOf('const allProducts = [')
const arrContentStart = arrStart + 'const allProducts = '.length

// Find the matching closing bracket
let depth = 0
let i = arrContentStart
let arrEnd = -1
while (i < script.length) {
  if (script[i] === '[') depth++
  else if (script[i] === ']') {
    depth--
    if (depth === 0) { arrEnd = i + 1; break }
  }
  i++
}

const arrJson = script.substring(arrContentStart, arrEnd)
const allProducts = JSON.parse(arrJson)

console.log(`Found ${allProducts.length} products`)

const productFiles = []

allProducts.forEach((p, idx) => {
  const safeName = p.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  const num = String(idx + 1).padStart(2, '0')

  if (p.img && p.img.startsWith('data:image')) {
    const mimeMatch = p.img.match(/data:image\/([^;]+);base64,/)
    const ext = mimeMatch ? (mimeMatch[1] === 'jpeg' ? 'jpg' : mimeMatch[1]) : 'jpg'
    const base64 = p.img.split(',')[1]
    const buf = Buffer.from(base64, 'base64')
    const filename = `${num}-${safeName}.${ext}`
    writeFileSync(join(outDir, filename), buf)
    console.log(`Saved ${filename} (${Math.round(buf.length / 1024)}KB)`)
    productFiles.push({ ...p, imgFile: `/products/${filename}` })
  } else {
    console.log(`No image for product ${num}: ${p.name}`)
    productFiles.push({ ...p, imgFile: null })
  }
})

// Write products data (without base64, using file paths)
const dataContent = `export interface Product {
  name: string
  price: string
  cat: 'Kipas' | 'Tumbler' | 'Bag'
  ml: string
  imgFile: string | null
}

export const allProducts: Product[] = ${JSON.stringify(
  productFiles.map(({ img, ...rest }) => rest),
  null,
  2
)}
`

writeFileSync(join(__dirname, '../src/data/products.ts'), dataContent)
console.log(`\nWrote src/data/products.ts`)
console.log(`Extracted ${productFiles.filter(p => p.imgFile).length} images to public/products/`)
