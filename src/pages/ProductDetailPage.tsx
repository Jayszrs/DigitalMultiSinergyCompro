import { useState } from 'react'
import type { Product } from '../data/products'
import { PRODUCTS, PRODUCT_MAP } from '../data/products'
import type { Lang, Page } from '../App'

interface Props {
  product: Product
  lang: Lang
  navigate: (p: Page) => void
  openContact: (type?: string) => void
  openProduct?: (p: Product) => void
}

export default function ProductDetailPage({ product, lang, navigate, openContact, openProduct }: Props) {
  const [activeImg, setActiveImg] = useState(0)

  const related = product.related
    .map((id) => PRODUCT_MAP[id])
    .filter(Boolean)
    .slice(0, 3)

  const catLabel = (cat: string) => {
    const map: Record<string, { EN: string; ID: string }> = {
      passive: { EN: 'Passive', ID: 'Pasif' },
      active: { EN: 'Active', ID: 'Aktif' },
      fttx: { EN: 'FTTx Tools', ID: 'Alat FTTx' },
      software: { EN: 'Software', ID: 'Perangkat Lunak' },
      itai: { EN: 'IT & AI', ID: 'IT & AI' },
    }
    return map[cat]?.[lang] ?? cat
  }

  return (
    <main className="pt-[70px]">
      {/* Breadcrumb */}
      <div className="bg-[#F6F8FB] border-b border-[#DDE5EE]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center gap-2 text-[13px] text-[#8491A1]">
          <button onClick={() => navigate('home')} className="hover:text-[#284C98] transition-colors">{lang === 'EN' ? 'Home' : 'Beranda'}</button>
          <span>/</span>
          <button onClick={() => navigate('products')} className="hover:text-[#284C98] transition-colors">{lang === 'EN' ? 'Products' : 'Produk'}</button>
          <span>/</span>
          <span className="text-[#0B1628] font-medium">{catLabel(product.cat)}</span>
          <span>/</span>
          <span className="text-[#0B1628] font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main detail */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Gallery */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-[#EEF3F8] aspect-[4/3] mb-4">
                <img
                  src={product.gallery[activeImg] ?? product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="flex gap-3">
                  {product.gallery.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? 'border-[#284C98]' : 'border-transparent hover:border-[#4CB2E6]'}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF3F8] text-[#284C98] text-[11px] font-display font-700 uppercase tracking-wide mb-4">
                {catLabel(product.cat)}
              </span>
              <h1 className="font-display font-800 text-[40px] lg:text-[52px] text-[#0B1628] leading-[1.1] mb-2">
                {product.name}
              </h1>
              <p className="text-[#8491A1] text-[15px] mb-5">{product.tagline[lang]}</p>
              <p className="text-[16px] text-[#5E6B7A] leading-relaxed mb-8">{product.desc[lang]}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => openContact(lang === 'EN' ? 'Product Inquiry' : 'Pertanyaan Produk')}
                  className="group px-7 py-4 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[15px] flex items-center gap-3 hover:bg-[#e08820] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {lang === 'EN' ? 'Request Inquiry' : 'Ajukan Pertanyaan'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={() => openContact(lang === 'EN' ? 'Product Inquiry' : 'Pertanyaan Produk')}
                  className="px-7 py-4 rounded-xl border-2 border-[#284C98] text-[#284C98] font-display font-700 text-[15px] hover:bg-[#284C98] hover:text-white transition-all duration-200"
                >
                  {lang === 'EN' ? 'Download Specification' : 'Unduh Spesifikasi'}
                </button>
              </div>

              {/* Key specs preview */}
              <div className="bg-[#F6F8FB] rounded-2xl p-6 border border-[#DDE5EE]">
                <h3 className="font-display font-700 text-[13px] uppercase tracking-wider text-[#8491A1] mb-4">
                  {lang === 'EN' ? 'Key Specifications' : 'Spesifikasi Utama'}
                </h3>
                <div className="space-y-3">
                  {product.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 text-[14px]">
                      <span className="text-[#5E6B7A]">{spec.label[lang]}</span>
                      <span className="font-display font-600 text-[#0B1628] text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Overview / Specs / Applications */}
      <TabbedSection product={product} lang={lang} />

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-[#F6F8FB] py-16 lg:py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <h2 className="font-display font-800 text-[28px] text-[#0B1628] mb-8">
              {lang === 'EN' ? 'Related Products' : 'Produk Terkait'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} lang={lang} onClick={() => openProduct?.(p)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="wave-divider bg-[#F6F8FB]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C360,0 720,70 1080,30 C1260,10 1380,55 1440,35 L1440,70 L0,70 Z" fill="#07182D"/>
        </svg>
      </div>
      <section className="bg-[#07182D] py-16 text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="font-display font-800 text-[28px] lg:text-[36px] text-white mb-4">
            {lang === 'EN' ? 'Need help choosing the right product?' : 'Butuh bantuan memilih produk yang tepat?'}
          </h2>
          <p className="text-white/50 mb-7 text-[15px]">
            {lang === 'EN' ? 'Talk to our team about your connectivity requirements.' : 'Bicaralah dengan tim kami tentang kebutuhan konektivitas Anda.'}
          </p>
          <button
            onClick={() => openContact('Product Inquiry')}
            className="px-8 py-4 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[15px] hover:bg-[#e08820] transition-colors duration-200"
          >
            {lang === 'EN' ? 'Talk to Our Team' : 'Hubungi Tim Kami'}
          </button>
        </div>
      </section>
    </main>
  )
}

function TabbedSection({ product, lang }: { product: Product; lang: Lang }) {
  const [tab, setTab] = useState(0)
  const tabs = [
    lang === 'EN' ? 'Overview' : 'Ikhtisar',
    lang === 'EN' ? 'Technical Specifications' : 'Spesifikasi Teknis',
    lang === 'EN' ? 'Features' : 'Fitur',
    lang === 'EN' ? 'Applications' : 'Aplikasi',
  ]

  return (
    <section className="bg-white py-14 lg:py-16 border-t border-[#DDE5EE]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 mb-10 border-b border-[#DDE5EE]">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className={`px-6 py-3 text-[14px] font-display font-700 transition-all duration-200 border-b-2 -mb-[2px] ${tab === i ? 'text-[#284C98] border-[#284C98]' : 'text-[#8491A1] border-transparent hover:text-[#0B1628]'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 0 && (
          <p className="text-[16px] text-[#5E6B7A] leading-relaxed max-w-[780px]">
            {product.desc[lang]}
          </p>
        )}

        {tab === 1 && (
          <div className="max-w-[700px]">
            <table className="w-full text-[14px]">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#F6F8FB]' : 'bg-white'}>
                    <td className="py-3.5 px-5 text-[#5E6B7A] rounded-l-lg w-1/2">{spec.label[lang]}</td>
                    <td className="py-3.5 px-5 font-display font-600 text-[#0B1628] rounded-r-lg">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 2 && (
          <ul className="space-y-3 max-w-[700px]">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-[#5E6B7A]">
                <span className="w-5 h-5 rounded-full bg-[#4CB2E6]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-[#4CB2E6]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {f[lang]}
              </li>
            ))}
          </ul>
        )}

        {tab === 3 && (
          <ul className="space-y-3 max-w-[700px]">
            {product.applications.map((a, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px] text-[#5E6B7A]">
                <span className="w-2 h-2 rounded-full bg-[#F7992E] shrink-0" />
                {a[lang]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function RelatedCard({ product, lang, onClick }: { product: Product; lang: Lang; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-white rounded-2xl overflow-hidden border border-[#DDE5EE] hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer">
      <div className="relative h-[180px] overflow-hidden bg-[#EEF3F8]">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="font-display font-700 text-[16px] text-[#0B1628] mb-1 group-hover:text-[#284C98] transition-colors">{product.name}</h3>
        <p className="text-[12px] text-[#8491A1] mb-4">{product.tagline[lang]}</p>
        <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
          {lang === 'EN' ? 'View Product' : 'Lihat Produk'}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  )
}
