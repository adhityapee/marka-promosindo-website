import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Link, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Marka Promosindo — Souvenir & Merchandise Custom' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootDocument,
})

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 52 52" fill="none">
            <path d="M10 40 L18 12 L26 30 L34 12 L42 40" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <line x1="10" y1="40" x2="42" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="logo-text">Marka Promosindo</span>
      </Link>

      <ul className="nav-menu">
        <li><Link to="/" activeProps={{ className: 'active' }}>Beranda</Link></li>
        <li><Link to="/products" activeProps={{ className: 'active' }}>Produk</Link></li>
        <li><Link to="/about" activeProps={{ className: 'active' }}>Tentang Kami</Link></li>
        <li><Link to="/contact" activeProps={{ className: 'active' }}>Kontak</Link></li>
      </ul>

      <a href="https://wa.me/6281399768866?text=Halo%2C+saya+ingin+bertanya+tentang+produk+Marka+Promosindo" target="_blank" rel="noopener noreferrer" className="nav-wa">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        WhatsApp
      </a>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">Marka Promosindo</div>
          <div className="footer-tagline">Souvenir & Merchandise · Jakarta, Indonesia</div>
        </div>
        <div>
          <div className="footer-nav-title">Navigasi</div>
          <div className="footer-nav">
            <Link to="/">Beranda</Link>
            <Link to="/products">Produk</Link>
            <Link to="/about">Tentang Kami</Link>
            <Link to="/contact">Kontak</Link>
          </div>
        </div>
        <div>
          <div className="footer-nav-title">Kontak</div>
          <div className="footer-nav">
            <a>wa.me/081399768866</a>
            <a>@markapromosindo</a>
            <a>markapromosindo.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Marka Promosindo. All rights reserved.</span>
        <span className="footer-copy" style={{ color: '#333' }}>Made with ♥ in Jakarta</span>
      </div>
    </footer>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
