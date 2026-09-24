import { useState } from 'react'
import type { Page, Lang } from '../App'

const NAV: { en: string; id: string; page: Page }[] = [
  { en: 'Home', id: 'Beranda', page: 'home' },
  { en: 'About', id: 'Tentang', page: 'about' },
  { en: 'Products', id: 'Produk', page: 'products' },
  { en: 'News', id: 'Berita', page: 'news' },
  { en: 'Career', id: 'Karir', page: 'career' },
  { en: 'Contact', id: 'Kontak', page: 'contact' },
]

interface Props {
  scrolled: boolean
  page: Page
  navigate: (p: Page) => void
  lang: Lang
  setLang: (l: Lang) => void
}

export default function Header({ scrolled, page, navigate, lang, setLang }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-[#07182D]/98 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#07182D]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <button onClick={() => navigate('home')} className="flex items-center gap-3 shrink-0">
          <DMSLogoWhite />
          <div className="leading-none">
            <div className="font-display font-800 text-white text-[15px] tracking-tight">Digital Multi Sinergy</div>
            <div className="text-[9px] tracking-[0.18em] uppercase text-white/40 mt-0.5">Technology & Connectivity</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0">
          {NAV.map((n) => (
            <button
              key={n.page}
              onClick={() => navigate(n.page)}
              className={`relative px-4 py-2 text-[14px] font-medium transition-colors duration-200 group ${
                page === n.page ? 'text-[#4CB2E6]' : 'text-white/80 hover:text-white'
              }`}
            >
              {lang === 'EN' ? n.en : n.id}
              <span className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#4CB2E6] transition-all duration-300 ${page === n.page ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100'}`} />
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-4">
            {['linkedin', 'instagram'].map((s) => (
              <a key={s} href="#" className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                {s === 'linkedin' && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>}
                {s === 'instagram' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>}
              </a>
            ))}
          </div>
          {/* Lang */}
          <div className="flex text-[13px]">
            {(['ID', 'EN'] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="text-white/20 mx-1">/</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`font-semibold transition-colors ${lang === l ? 'text-[#4CB2E6]' : 'text-white/40 hover:text-white'}`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          {/* CTA */}
          <button
            onClick={() => navigate('contact')}
            className="px-5 py-2.5 rounded-lg bg-[#284C98] text-white text-[13px] font-semibold hover:bg-[#4CB2E6] transition-colors duration-200"
          >
            {lang === 'EN' ? 'Free Consultation' : 'Konsultasi Gratis'}
          </button>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2 flex flex-col gap-1.5" onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden bg-[#07182D] border-t border-white/10 overflow-hidden transition-all duration-400 ${open ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV.map((n) => (
            <button
              key={n.page}
              onClick={() => { navigate(n.page); setOpen(false) }}
              className={`text-left px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${page === n.page ? 'text-[#4CB2E6] bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
            >
              {lang === 'EN' ? n.en : n.id}
            </button>
          ))}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
            <div className="flex gap-2">
              {(['ID', 'EN'] as Lang[]).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded text-[13px] font-semibold ${lang === l ? 'bg-[#284C98] text-white' : 'text-white/50'}`}>{l}</button>
              ))}
            </div>
            <button onClick={() => { navigate('contact'); setOpen(false) }} className="px-5 py-2.5 rounded-lg bg-[#284C98] text-white text-[13px] font-semibold">
              {lang === 'EN' ? 'Free Consultation' : 'Konsultasi Gratis'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function DMSLogoWhite() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <ellipse cx="19" cy="19" rx="12" ry="7" stroke="white" strokeWidth="2" transform="rotate(-30 19 19)" />
      <ellipse cx="19" cy="19" rx="8" ry="5" stroke="#4CB2E6" strokeWidth="1.5" transform="rotate(50 19 19)" />
      <circle cx="19" cy="19" r="4.5" fill="white" />
      <circle cx="28" cy="11" r="3" fill="#F7992E" />
    </svg>
  )
}
