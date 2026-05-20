import jsPDF from 'jspdf'
import { allProducts } from '../data/products'
import type { Product } from '../data/products'

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 36
const COLS = 3
const GAP = 10
const CARD_W = (PAGE_W - MARGIN * 2 - GAP * (COLS - 1)) / COLS
const IMG_H = CARD_W  // square — sama dengan aspect-ratio: 1 di website
const TEXT_H = 52
const CARD_H = IMG_H + TEXT_H
const CONTENT_TOP = MARGIN + 20
const CONTENT_BOTTOM = PAGE_H - 28

const GOLD_R = 247, GOLD_G = 190, GOLD_B = 0    // Goldenrod #f7be00
const BLUE_R = 0,   BLUE_G = 123, BLUE_B = 255  // Ocean Blue #007bff

async function loadImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const blob = await res.blob()
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

function getImageDimensions(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
    img.onerror = () => resolve({ w: 1, h: 1 })
    img.src = dataUrl
  })
}

function cropToSquare(imgData: string): Promise<string> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const size = Math.min(img.naturalWidth, img.naturalHeight)
      const canvas = document.createElement('canvas')
      canvas.width = 400
      canvas.height = 400
      const ctx = canvas.getContext('2d')!
      const sx = (img.naturalWidth - size) / 2
      const sy = (img.naturalHeight - size) / 2
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 400, 400)
      resolve(canvas.toDataURL('image/jpeg', 0.88))
    }
    img.onerror = () => resolve(imgData)
    img.src = imgData
  })
}

async function preloadImages(products: Product[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  await Promise.all(
    products
      .filter(p => p.imgFile !== null)
      .map(async p => {
        const safeUrl = new URL(p.imgFile!, window.location.origin).href
        const data = await loadImage(safeUrl)
        if (data) {
          const cropped = await cropToSquare(data)
          map.set(p.imgFile!, cropped)
        }
      })
  )
  return map
}

function drawCoverPage(doc: jsPDF, logoData: string | null, logoH: number) {
  // Background: Midnight Ink
  doc.setFillColor(5, 1, 13)
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F')

  // Accent bar kiri — Ocean Blue
  doc.setFillColor(BLUE_R, BLUE_G, BLUE_B)
  doc.rect(MARGIN, 80, 3, PAGE_H - 160, 'F')

  // Accent dot kanan — Goldenrod (lebih tipis, secondary)
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B)
  doc.rect(PAGE_W - MARGIN - 1, 80, 1, PAGE_H - 160, 'F')

  const cx = PAGE_W / 2

  if (logoData) {
    const logoW = 160
    doc.addImage(logoData, 'PNG', cx - logoW / 2, 210, logoW, logoH)
  }

  // Separator atas — Ocean Blue
  doc.setFillColor(BLUE_R, BLUE_G, BLUE_B)
  doc.rect(cx - 50, 298, 100, 1, 'F')

  // Judul — putih, bersih, bold
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(30)
  doc.setTextColor(255, 255, 255)
  doc.text('KATALOG PRODUK', cx, 328, { align: 'center' })

  // Brand name — Goldenrod sebagai aksen brand
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(GOLD_R, GOLD_G, GOLD_B)
  doc.text('MARKA PROMOSINDO', cx, 350, { align: 'center' })

  // Tagline — putih redup
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(160, 160, 170)
  doc.text('Souvenir & Merchandise Premium', cx, 368, { align: 'center' })

  // Separator bawah — Ocean Blue
  doc.setFillColor(BLUE_R, BLUE_G, BLUE_B)
  doc.rect(cx - 50, 380, 100, 1, 'F')

  // Kontak di bawah
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 110)
  doc.text('081399768866  ·  Jakarta, Indonesia', cx, PAGE_H - 82, { align: 'center' })
}

function drawPageStripe(doc: jsPDF) {
  doc.setFillColor(BLUE_R, BLUE_G, BLUE_B)
  doc.rect(0, 0, PAGE_W, 3, 'F')
}

function drawPageFooter(doc: jsPDF, pageNum: number) {
  const fy = PAGE_H - 16
  doc.setDrawColor(229, 224, 216)
  doc.setLineWidth(0.4)
  doc.line(MARGIN, fy - 5, PAGE_W - MARGIN, fy - 5)

  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(136, 136, 136)
  doc.text('Marka Promosindo  ·  081399768866  ·  Jakarta, Indonesia', MARGIN, fy + 1)
  doc.text(`${pageNum}`, PAGE_W - MARGIN, fy + 1, { align: 'right' })
}

function drawCategoryHeader(doc: jsPDF, cat: string, y: number) {
  doc.setFillColor(BLUE_R, BLUE_G, BLUE_B)  // Ocean Blue header
  doc.rect(MARGIN, y, PAGE_W - MARGIN * 2, 20, 'F')

  // Aksen goldenrod kiri
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B)
  doc.rect(MARGIN, y, 3, 20, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)  // white text on blue
  doc.text(cat.toUpperCase(), MARGIN + 10, y + 13)
}

function drawProductCard(
  doc: jsPDF,
  p: Product,
  x: number,
  y: number,
  imgData: string | null
) {
  // Background card putih
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(x, y, CARD_W, CARD_H, 3, 3, 'F')

  // Border card
  doc.setDrawColor(229, 224, 216)
  doc.setLineWidth(0.4)
  doc.roundedRect(x, y, CARD_W, CARD_H, 3, 3, 'S')

  // Gambar produk
  if (imgData) {
    doc.addImage(imgData, 'JPEG', x + 1, y + 1, CARD_W - 2, IMG_H - 2)
  } else {
    doc.setFillColor(240, 235, 228)
    doc.rect(x + 1, y + 1, CARD_W - 2, IMG_H - 2, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(180, 160, 130)
    doc.text('No Image', x + CARD_W / 2, y + IMG_H / 2 + 2, { align: 'center' })
  }

  // Teks area di bawah gambar
  const ty = y + IMG_H + 6

  // Nama produk
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(17, 17, 17)
  const nameLine = doc.splitTextToSize(p.name, CARD_W - 8)[0]
  doc.text(nameLine, x + 4, ty)

  let offset = 11
  if (p.ml) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(136, 136, 136)
    doc.text(p.ml, x + 4, ty + offset)
    offset += 10
  }

  // Harga
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(184, 134, 11)  // dark goldenrod, readable on white
  const priceText = p.price === '-' || p.price === '' ? 'Hubungi Kami' : p.price
  doc.text(priceText, x + 4, ty + offset)
}

const CATEGORY_ORDER: Product['cat'][] = ['Kipas', 'Tumbler', 'Bag', 'Powerbank', 'Earphone']

export async function generateCatalog(): Promise<void> {
  const [imgMap, logoData] = await Promise.all([
    preloadImages(allProducts),
    loadImage(new URL('/logo-marka-promosindo-1.png', window.location.origin).href),
  ])

  const doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })

  // Hitung tinggi logo secara proporsional agar tidak stretch
  let logoH = 64
  if (logoData) {
    const dims = await getImageDimensions(logoData)
    logoH = (dims.h / dims.w) * 160
  }

  // Cover
  drawCoverPage(doc, logoData, logoH)

  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    products: allProducts.filter(p => p.cat === cat),
  })).filter(g => g.products.length > 0)

  doc.addPage()
  drawPageStripe(doc)

  let currentY = CONTENT_TOP
  let pageNum = 2

  for (const { cat, products } of grouped) {
    // Page break untuk category header
    if (currentY + 20 > CONTENT_BOTTOM) {
      drawPageFooter(doc, pageNum)
      doc.addPage()
      drawPageStripe(doc)
      pageNum++
      currentY = CONTENT_TOP
    }

    drawCategoryHeader(doc, cat, currentY)
    currentY += 26

    // Render baris produk
    for (let i = 0; i < products.length; i += COLS) {
      const rowProds = products.slice(i, i + COLS)

      if (currentY + CARD_H > CONTENT_BOTTOM) {
        drawPageFooter(doc, pageNum)
        doc.addPage()
        drawPageStripe(doc)
        pageNum++
        currentY = CONTENT_TOP
      }

      rowProds.forEach((p, col) => {
        const x = MARGIN + col * (CARD_W + GAP)
        const imgData = p.imgFile ? (imgMap.get(p.imgFile) ?? null) : null
        drawProductCard(doc, p, x, currentY, imgData)
      })

      currentY += CARD_H + GAP
    }

    currentY += 12
  }

  drawPageFooter(doc, pageNum)
  doc.save('Katalog-Marka-Promosindo.pdf')
}
