import type { Page, Lang } from '../App'

interface Props {
  navigate: (p: Page) => void
  lang: Lang
}

export default function Footer({ navigate, lang }: Props) {
  return (
    <footer>
      {/* Wave top divider */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#07182D"/>
        </svg>
      </div>

      <div className="bg-[#07182D] text-white relative overflow-hidden">
        {/* Faded BG text */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[96px] lg:text-[140px] font-display font-800 tracking-tighter text-white/[0.03] leading-none whitespace-nowrap pb-6">
            DIGITAL MULTI SINERGY
          </span>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                  <ellipse cx="19" cy="19" rx="12" ry="7" stroke="white" strokeWidth="2" transform="rotate(-30 19 19)" />
                  <ellipse cx="19" cy="19" rx="8" ry="5" stroke="#4CB2E6" strokeWidth="1.5" transform="rotate(50 19 19)" />
                  <circle cx="19" cy="19" r="4.5" fill="white" />
                  <circle cx="28" cy="11" r="3" fill="#F7992E" />
                </svg>
                <div>
                  <div className="font-display font-800 text-white text-[15px]">Digital Multi Sinergy</div>
                  <div className="text-[9px] tracking-widest uppercase text-white/40">Technology & Connectivity</div>
                </div>
              </div>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-[300px] mb-6">
                {lang === 'EN'
                  ? 'Reliable connectivity, telecommunications, IT and technology solutions for enterprise and government clients.'
                  : 'Solusi konektivitas, telekomunikasi, IT dan teknologi yang andal untuk klien enterprise dan pemerintah.'}
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { name: 'facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { name: 'youtube', path: '' },
                  { name: 'linkedin', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                  { name: 'instagram', path: '' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#4CB2E6] transition-all duration-200"
                  >
                    {s.name === 'facebook' && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>}
                    {s.name === 'youtube' && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#07182D" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>}
                    {s.name === 'linkedin' && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/><circle cx="4" cy="4" r="2"/></svg>}
                    {s.name === 'instagram' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div className="lg:col-span-3 lg:col-start-6">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#4CB2E6] font-semibold mb-5">
                {lang === 'EN' ? 'Navigation' : 'Navigasi'}
              </h4>
              <ul className="space-y-3">
                {([
                  { en: 'Home', id: 'Beranda', page: 'home' },
                  { en: 'About Us', id: 'Tentang Kami', page: 'about' },
                  { en: 'Products', id: 'Produk', page: 'products' },
                  { en: 'News', id: 'Berita', page: 'news' },
                  { en: 'Career', id: 'Karir', page: 'career' },
                  { en: 'Contact', id: 'Kontak', page: 'contact' },
                ] as { en: string; id: string; page: Page }[]).map((item) => (
                  <li key={item.page}>
                    <button
                      onClick={() => navigate(item.page)}
                      className="text-white/50 hover:text-white text-[14px] transition-colors hover:translate-x-1 transform duration-200 block"
                    >
                      {lang === 'EN' ? item.en : item.id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4 lg:col-start-9">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#4CB2E6] font-semibold mb-5">
                {lang === 'EN' ? 'Contact' : 'Kontak'}
              </h4>
              <address className="not-italic space-y-4 text-[14px] text-white/50">
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-[#4CB2E6] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-[#4CB2E6] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" opacity="0"/><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                  <a href="mailto:info@digitalmultisinergy.com" className="hover:text-white transition-colors">info@digitalmultisinergy.com</a>
                </div>
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-[#4CB2E6] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href="tel:+62211234567" className="hover:text-white transition-colors">+62 21 XXXX XXXX</a>
                </div>
              </address>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/30">
            <span>© {new Date().getFullYear()} PT Digital Multi Sinergy Indonesia. All rights reserved.</span>
            <div className="flex gap-5">
              <button className="hover:text-white/70 transition-colors">Privacy Policy</button>
              <button className="hover:text-white/70 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
