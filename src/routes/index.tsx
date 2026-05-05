import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { allProducts } from '../data/products'
import { faqs } from '../data/faqs'

export const Route = createFileRoute('/')({ component: Home })

const MARQUEE_ITEMS = ['Custom Printing', 'Corporate Souvenir', 'Wedding Gift', 'Goodie Bag', 'Tumbler Custom', 'Merchandise']
const FEATURED_NAMES = ['Kipas T-21', 'AE Tumbler', 'QEF Tumbler', 'AB Tumbler']

function badgeClass(cat: string) {
  if (cat === 'Kipas') return 'badge-kipas'
  if (cat === 'Tumbler') return 'badge-tumbler'
  return 'badge-bag'
}

function ProductCard({ p }: { p: typeof allProducts[0] }) {
  return (
    <div className="product-card">
      <div className="product-img">
        {p.imgFile
          ? <img src={p.imgFile} alt={p.name} loading="lazy" />
          : (
            <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%', padding: '20px' }}>
              <rect width="80" height="80" fill="#f0ebe4"/>
              <text x="40" y="45" textAnchor="middle" fill="#c9a96e" fontSize="12" fontFamily="serif">No Image</text>
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-q">
        {q}
        <svg className="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div className="faq-a">
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  )
}

function Home() {
  const heroProducts = allProducts.filter(p => p.imgFile).slice(0, 4)
  const featured = allProducts.filter(p => FEATURED_NAMES.includes(p.name))
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Souvenir & Merchandise Custom</span>
          </div>
          <h1 className="hero-title">
            Setiap Momen<br />Layak <em>Dikenang</em>
          </h1>
          <p className="hero-desc">
            Marka Promosindo menghadirkan souvenir dan merchandise berkualitas untuk kebutuhan corporate, pernikahan, dan personal. Custom printing dengan MOQ fleksibel.
          </p>
          <div className="hero-actions">
            <Link to="/products"><button className="btn-gold">Lihat Katalog Produk</button></Link>
            <Link to="/contact"><button className="btn-ghost">Konsultasi Gratis</button></Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hstat-num">26+</div>
              <div className="hstat-label">Produk</div>
            </div>
            <div className="hstat-divider" />
            <div>
              <div className="hstat-num">3</div>
              <div className="hstat-label">Kategori</div>
            </div>
            <div className="hstat-divider" />
            <div>
              <div className="hstat-num">100%</div>
              <div className="hstat-label">Custom</div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-grid">
            {heroProducts.map(p => (
              <div key={p.name} className="hero-img-cell">
                <img src={p.imgFile!} alt={p.name} />
                <div className="hero-img-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <section className="section why-section">
        <div className="why-grid">
          <div className="why-left">
            <div className="sec-label">Kenapa Marka Promosindo?</div>
            <h2 className="sec-title">Kualitas & Layanan<br />Terbaik untuk Anda</h2>
            <p className="sec-desc">Kami berkomitmen menghadirkan produk souvenir berkualitas dengan layanan yang personal dan harga yang kompetitif.</p>
          </div>
          <div className="why-cards">
            <div className="why-card">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="why-card-title">Kualitas Premium</div>
              <div className="why-card-desc">Setiap produk dipilih dengan ketat untuk memastikan kualitas terbaik.</div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="why-card-title">Pengiriman Cepat</div>
              <div className="why-card-desc">Proses produksi dan pengiriman yang tepat waktu sesuai kebutuhan.</div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div className="why-card-title">MOQ Fleksibel</div>
              <div className="why-card-desc">Mulai dari pesanan kecil personal hingga ribuan unit corporate.</div>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="why-card-title">Konsultasi Gratis</div>
              <div className="why-card-desc">Tim kami siap membantu dari konsultasi desain hingga pengiriman.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="sec-label">Layanan Kami</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 className="sec-title">Apa yang Bisa<br />Kami Bantu?</h2>
          <Link to="/contact"><button className="btn-gold" style={{ whiteSpace: 'nowrap', marginBottom: '2px' }}>Mulai Konsultasi →</button></Link>
        </div>
        <div className="services-grid">
          {[
            { num: '01', title: 'Konsultasi & Rekomendasi Produk', desc: 'Kami bantu pilih produk dan desain terbaik sesuai kebutuhan, anggaran, dan identitas brand Anda.' },
            { num: '02', title: 'Custom Printing & Branding', desc: 'Logo, nama, atau pesan khusus Anda tercetak rapi di setiap produk dengan berbagai teknik printing.' },
            { num: '03', title: 'Pembuatan Mock-up & Sample', desc: 'Lihat hasilnya sebelum produksi massal. Kami siapkan mock-up digital maupun sampel fisik.' },
            { num: '04', title: 'Packaging & Gift Wrapping', desc: 'Kemasan profesional yang dapat dikustomisasi — cocok untuk hampers corporate atau wedding souvenir.' },
            { num: '05', title: 'Pengiriman ke Seluruh Indonesia', desc: 'Layanan pengiriman ke satu atau banyak lokasi melalui jasa ekspedisi terpercaya.' },
            { num: '06', title: 'Layanan Express Order', desc: 'Butuh dalam waktu singkat? Kami sediakan layanan produksi cepat untuk kebutuhan mendesak.' },
          ].map(s => (
            <div key={s.num} className="service-card">
              <div className="service-num">{s.num}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-sm products-section">
        <div className="products-header">
          <div>
            <div className="sec-label">Pilihan Unggulan</div>
            <h2 className="sec-title" style={{ marginBottom: 0 }}>Produk Terpopuler</h2>
          </div>
          <Link to="/products"><button className="btn-gold">Lihat Semua →</button></Link>
        </div>
        <div className="products-grid">
          {featured.map(p => <ProductCard key={p.name} p={p} />)}
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div style={{ textAlign: 'center', marginBottom: 0 }}>
          <div className="sec-label" style={{ textAlign: 'center' }}>FAQ</div>
          <h2 className="sec-title" style={{ textAlign: 'center', margin: '0 auto' }}>
            Pertanyaan yang Sering<br />Ditanyakan
          </h2>
        </div>
        <div className="faq-grid">
          <div className="faq-list">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div className="faq-cta">
            <h3>Masih Ada Pertanyaan?</h3>
            <p>Tim kami siap membantu Anda menemukan solusi souvenir terbaik. Hubungi kami sekarang!</p>
            <Link to="/contact"><button className="btn-gold">Hubungi Kami Sekarang</button></Link>
            <div style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>Respon dalam 1x24 jam</div>
          </div>
        </div>
      </section>
    </>
  )
}
