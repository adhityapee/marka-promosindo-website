import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { allProducts } from '../data/products'
import { generateCatalog } from '../utils/generateCatalog'

export const Route = createFileRoute('/products')({ component: Products })

type Category = 'all' | 'Kipas' | 'Tumbler' | 'Bag' | 'Powerbank' | 'Earphone'

function badgeClass(cat: string) {
  if (cat === 'Kipas') return 'badge-kipas'
  if (cat === 'Tumbler') return 'badge-tumbler'
  if (cat === 'Powerbank') return 'badge-powerbank'
  if (cat === 'Earphone') return 'badge-earphone'
  return 'badge-bag'
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Tutup">&#x2715;</button>
      <img
        className="lightbox-img"
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}

function ProductCard({ p, onImgClick }: { p: typeof allProducts[0]; onImgClick: (src: string, alt: string) => void }) {
  return (
    <div className="product-card">
      <div
        className="product-img"
        style={p.imgFile ? { cursor: 'zoom-in' } : undefined}
        onClick={() => p.imgFile && onImgClick(p.imgFile, p.name)}
      >
        {p.imgFile
          ? <img src={p.imgFile} alt={p.name} loading="lazy" />
          : (
            <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%', padding: '20px' }}>
              <rect width="80" height="80" fill="#f0f0f0"/>
              <text x="40" y="45" textAnchor="middle" fill="#595959" fontSize="12" fontFamily="sans-serif">No Image</text>
            </svg>
          )
        }
        <span className={`prod-badge ${badgeClass(p.cat)}`}>{p.cat}</span>
        {p.ml && <span className="prod-ml">{p.ml}</span>}
      </div>
      <div className="product-body">
        <div className="product-name">{p.name}</div>
        <div className="product-price">{p.price}</div>
        <Link to="/contact">
          <button className="product-btn">Pesan Sekarang</button>
        </Link>
      </div>
    </div>
  )
}

const FILTERS: { label: string; value: Category }[] = [
  { label: 'Semua (33)', value: 'all' },
  { label: 'Kipas (3)', value: 'Kipas' },
  { label: 'Tumbler (22)', value: 'Tumbler' },
  { label: 'Bag (3)', value: 'Bag' },
  { label: 'Powerbank (2)', value: 'Powerbank' },
  { label: 'Earphone (3)', value: 'Earphone' },
]

function Products() {
  const [active, setActive] = useState<Category>('all')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const visible = active === 'all' ? allProducts : allProducts.filter(p => p.cat === active)

  const handleDownload = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    try { await generateCatalog() }
    catch { alert('Gagal membuat PDF. Coba lagi.') }
    finally { setIsGenerating(false) }
  }

  return (
    <div style={{ paddingTop: 'var(--header-h)', background: 'var(--lighter)', paddingBottom: '100px' }}>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '60px 48px 32px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="sec-label">Koleksi Lengkap</div>
            <h2 className="sec-title" style={{ margin: 0 }}>Semua Produk</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <div className="filter-row">
              {FILTERS.map(f => (
                <button
                  key={f.value}
                  className={`filter-btn${active === f.value ? ' active' : ''}`}
                  onClick={() => setActive(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              className="btn-gold"
              onClick={handleDownload}
              disabled={isGenerating}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '13px', opacity: isGenerating ? 0.7 : 1, cursor: isGenerating ? 'wait' : 'pointer' }}
            >
              {isGenerating ? (
                <><span className="spinner" />Membuat PDF...</>
              ) : (
                <><Download size={14} />Unduh Katalog</>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="products-grid" style={{ paddingTop: '48px' }}>
          {visible.map(p => (
            <ProductCard key={p.name} p={p} onImgClick={(src, alt) => setLightbox({ src, alt })} />
          ))}
        </div>
      </div>
    </div>
  )
}
