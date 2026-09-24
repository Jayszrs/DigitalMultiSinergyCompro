import { useState } from 'react'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import type { Lang, Page } from '../App'

interface Props {
  lang: Lang
  navigate: (p: Page) => void
  openProduct: (p: Product) => void
  openContact: (type?: string) => void
}

const FILTERS = [
  { en: 'All', id: 'Semua', key: 'all' },
  { en: 'Passive', id: 'Pasif', key: 'passive' },
  { en: 'Active', id: 'Aktif', key: 'active' },
  { en: 'FTTx Tools', id: 'Alat FTTx', key: 'fttx' },
  { en: 'Software', id: 'Perangkat Lunak', key: 'software' },
  { en: 'IT & AI', id: 'IT & AI', key: 'itai' },
]

export default function ProductsPage({ lang, navigate, openProduct, openContact }: Props) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter((p) => {
    const mf = filter === 'all' || p.cat === filter
    const ms = p.name.toLowerCase().includes(search.toLowerCase())
    return mf && ms
  })

  return (
    <main className="pt-[70px]">
      {/* Hero */}
      <section className="bg-[#07182D] pt-20 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="absolute right-0 top-0 w-[500px] h-[500px]" viewBox="0 0 500 500" fill="none">
            <ellipse cx="380" cy="200" rx="260" ry="165" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-15 380 200)" />
          </svg>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20 text-center relative z-10">
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
            <span className="w-6 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'PRODUCTS' : 'PRODUK'}
            <span className="w-6 h-[1px] bg-[#F7992E]" />
          </span>
          <h1 className="font-display font-800 text-[48px] lg:text-[72px] text-white leading-[1.05] mb-6 max-w-[700px] mx-auto">
            {lang === 'EN' ? 'Technology products for reliable connectivity.' : 'Produk teknologi untuk konektivitas yang andal.'}
          </h1>
          <div className="mt-8 max-w-[500px] mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'EN' ? 'Search products...' : 'Cari produk...'}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 pl-11 pr-4 py-4 rounded-xl text-[15px] focus:outline-none focus:border-[#4CB2E6] transition-colors"
            />
          </div>
        </div>
      </section>

      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C480,70 960,0 1440,35 L1440,70 L0,70 Z" fill="#F6F8FB"/>
        </svg>
      </div>

      <section className="bg-[#F6F8FB] pb-28 min-h-[60vh]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-display font-700 transition-all duration-200 ${filter === f.key ? 'bg-[#284C98] text-white shadow-lg shadow-[#284C98]/20' : 'bg-white border border-[#DDE5EE] text-[#5E6B7A] hover:border-[#284C98] hover:text-[#284C98]'}`}
              >
                {lang === 'EN' ? f.en : f.id}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} onClick={() => openProduct(p)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-[#8491A1]">
              <p className="text-[16px]">{lang === 'EN' ? 'No products found.' : 'Produk tidak ditemukan.'}</p>
            </div>
          )}
        </div>
      </section>

      <div className="wave-divider bg-[#F6F8FB]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C360,0 720,70 1080,30 C1260,10 1380,55 1440,35 L1440,70 L0,70 Z" fill="#07182D"/>
        </svg>
      </div>
      <section className="bg-[#07182D] py-16 text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-display font-800 text-[32px] lg:text-[42px] text-white mb-4">
            {lang === 'EN' ? 'Need help choosing the right product?' : 'Butuh bantuan memilih produk yang tepat?'}
          </h2>
          <p className="text-white/50 mb-8 text-[15px]">
            {lang === 'EN' ? 'Talk to our team about your connectivity requirements.' : 'Bicaralah dengan tim kami tentang kebutuhan konektivitas Anda.'}
          </p>
          <button
            onClick={() => openContact('Product Inquiry')}
            className="px-8 py-4 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[15px] hover:bg-[#e08820] transition-colors duration-200"
          >
            {lang === 'EN' ? 'Free Consultation Available' : 'Konsultasi Gratis Tersedia'}
          </button>
        </div>
      </section>
    </main>
  )
}

function ProductCard({ product, lang, onClick }: { product: Product; lang: Lang; onClick: () => void }) {
  const catLabel: Record<string, { EN: string; ID: string }> = {
    passive: { EN: 'Passive', ID: 'Pasif' },
    active: { EN: 'Active', ID: 'Aktif' },
    fttx: { EN: 'FTTx Tools', ID: 'Alat FTTx' },
    software: { EN: 'Software', ID: 'Perangkat Lunak' },
    itai: { EN: 'IT & AI', ID: 'IT & AI' },
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden border border-[#DDE5EE] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-[220px] overflow-hidden bg-[#EEF3F8]">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/40 to-transparent" />
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 text-[#284C98] text-[10px] font-display font-700 uppercase tracking-wide">
          {catLabel[product.cat]?.[lang]}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display font-700 text-[17px] text-[#0B1628] mb-1 group-hover:text-[#284C98] transition-colors">{product.name}</h3>
        <p className="text-[13px] text-[#8491A1] mb-5">{product.tagline[lang]}</p>
        <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
          {lang === 'EN' ? 'View Product' : 'Lihat Produk'}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-[#284C98] to-[#4CB2E6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}
