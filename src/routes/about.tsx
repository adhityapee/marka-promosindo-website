import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: About })

function About() {
  return (
    <>
      <div className="about-hero">
        <div className="container">
        <div className="about-hero-grid">
          <div>
            <div className="sec-label" style={{ color: 'var(--blue)' }}>Tentang Kami</div>
            <h2 className="about-title">Merek yang<br />Meninggalkan Kesan</h2>
            <p className="about-desc">
              Marka Promosindo hadir untuk membantu Anda menciptakan souvenir dan merchandise yang bermakna. Kami melayani kebutuhan corporate, pernikahan, dan personal dengan standar kualitas tinggi dan layanan yang ramah.
            </p>
            <p className="about-desc" style={{ marginTop: '16px' }}>
              Setiap produk yang kami hasilkan adalah cerminan dari momen yang ingin Anda abadikan bersama orang-orang terkasih.
            </p>
          </div>
          <div className="about-stat-grid">
            <div className="about-stat-card">
              <div className="about-stat-num">26+</div>
              <div className="about-stat-label">Produk Tersedia</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">3</div>
              <div className="about-stat-label">Kategori Utama</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">100%</div>
              <div className="about-stat-label">Custom Print</div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-num">∞</div>
              <div className="about-stat-label">Desain Pilihan</div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      <div className="about-values-section">
        <div className="container">
        <div className="sec-label">Nilai Kami</div>
        <h2 className="sec-title">Komitmen Kami<br />untuk Anda</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="value-title">Kualitas Terjamin</div>
            <div className="value-desc">Setiap produk dipilih dengan teliti untuk memastikan kualitas terbaik sampai ke tangan Anda dan klien Anda.</div>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="value-title">Layanan Personal</div>
            <div className="value-desc">Kami melayani setiap klien secara personal — dari konsultasi desain hingga pengiriman produk jadi.</div>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
                <polyline points="20 12 20 22 4 22 4 12"/>
                <rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
            </div>
            <div className="value-title">MOQ Fleksibel</div>
            <div className="value-desc">Dari pemesanan kecil untuk event personal hingga ribuan unit untuk kebutuhan corporate besar.</div>
          </div>
        </div>
        </div>
      </div>

      <div className="about-cta-section">
        <div className="container">
        <h3 className="about-cta-title">Siap Memulai?</h3>
        <p className="about-cta-desc">Konsultasikan kebutuhan souvenir Anda dengan tim kami.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/contact"><button className="btn-gold">Hubungi Kami</button></Link>
          <Link to="/products"><button className="btn-ghost">Lihat Produk</button></Link>
        </div>
        </div>
      </div>
    </>
  )
}
