import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({ component: Contact })

// Daftar di https://formspree.io → buat form baru → ganti nilai ini dengan Form ID kamu
const FORMSPREE_ID = 'YOUR_FORM_ID'

type Status = 'idle' | 'loading' | 'success' | 'error'

function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="contact-section">
        <div className="contact-left">
          <div className="sec-label" style={{ color: 'var(--gold)' }}>Hubungi Kami</div>
          <h2 className="sec-title" style={{ color: 'white' }}>Siap Membantu<br />Kebutuhan Anda</h2>
          <p className="sec-desc" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '40px' }}>
            Konsultasi gratis, respons cepat. Kami siap mewujudkan souvenir impian Anda!
          </p>
          <div className="contact-items">
            <a
              href="https://wa.me/6281399768666?text=Halo%2C+saya+ingin+bertanya+tentang+produk+Marka+Promosindo"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
              style={{ textDecoration: 'none' }}
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--dark)' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <div className="c-label">WhatsApp</div>
                <div className="c-val">081399768866</div>
              </div>
            </a>
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div>
                <div className="c-label">Instagram</div>
                <div className="c-val">@markapromosindo</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <h3>Kirim Pesan</h3>
          {status === 'success' ? (
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8 }}>
              ✓ Pesan terkirim! Kami akan segera menghubungi Anda.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input name="nama" type="text" placeholder="Nama Anda" required />
              </div>
              <div className="form-group">
                <label>No. WhatsApp</label>
                <input name="whatsapp" type="text" placeholder="08xxxxxxxxxx" required />
              </div>
              <div className="form-group">
                <label>Keperluan</label>
                <select name="keperluan" required>
                  <option value="">Pilih keperluan...</option>
                  <option>Corporate / Perusahaan</option>
                  <option>Wedding / Pernikahan</option>
                  <option>Event Personal</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pesan</label>
                <textarea name="pesan" placeholder="Ceritakan kebutuhan Anda..." />
              </div>
              {status === 'error' && (
                <div style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '12px' }}>
                  Gagal mengirim pesan. Coba lagi atau hubungi via WhatsApp.
                </div>
              )}
              <button
                type="submit"
                className="btn-gold"
                style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1 }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
