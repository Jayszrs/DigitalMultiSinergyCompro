import { useState } from 'react'
import { ARTICLES } from '../data/articles'
import type { Article } from '../data/articles'
import type { Lang } from '../App'

interface Props { lang: Lang; openArticle: (a: Article) => void }

const CATS = ['All', 'Company News', 'Technology', 'Products', 'Projects', 'Industry']
const CATS_ID: Record<string, string> = { All: 'Semua', 'Company News': 'Berita Perusahaan', Technology: 'Teknologi', Products: 'Produk', Projects: 'Proyek', Industry: 'Industri' }

export default function NewsPage({ lang, openArticle }: Props) {
  const [filter, setFilter] = useState('All')
  const filtered = ARTICLES.filter((a) => filter === 'All' || a.cat.EN === filter)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main className="pt-[70px]">
      <section className="bg-[#07182D] pt-20 pb-0">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20 text-center">
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
            <span className="w-6 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'NEWS & ARTICLES' : 'BERITA & ARTIKEL'}
            <span className="w-6 h-[1px] bg-[#F7992E]" />
          </span>
          <h1 className="font-display font-800 text-[48px] lg:text-[72px] text-white leading-[1.05] max-w-[700px] mx-auto">
            {lang === 'EN' ? 'Insights from technology & Digital Multi Sinergy.' : 'Wawasan dari teknologi & Digital Multi Sinergy.'}
          </h1>
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
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-display font-700 transition-all duration-200 ${filter === c ? 'bg-[#284C98] text-white shadow-lg shadow-[#284C98]/20' : 'bg-white border border-[#DDE5EE] text-[#5E6B7A] hover:border-[#284C98] hover:text-[#284C98]'}`}
              >
                {lang === 'EN' ? c : CATS_ID[c]}
              </button>
            ))}
          </div>

          {featured && (
            <div
              className="group mb-8 rounded-2xl overflow-hidden bg-white border border-[#DDE5EE] hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-5 cursor-pointer"
              onClick={() => openArticle(featured)}
            >
              <div className="lg:col-span-3 relative h-[280px] lg:h-auto overflow-hidden bg-[#EEF3F8]">
                <img src={featured.img} alt={featured.title.EN} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/30 to-transparent" />
              </div>
              <div className="lg:col-span-2 p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#EEF3F8] text-[#284C98] text-[10px] font-display font-700 uppercase tracking-wide">{lang === 'EN' ? featured.cat.EN : featured.cat.ID}</span>
                  <span className="text-[12px] text-[#8491A1]">{featured.date}</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#F7992E]/15 text-[#F7992E] text-[10px] font-display font-700">{lang === 'EN' ? 'Featured' : 'Unggulan'}</span>
                </div>
                <h2 className="font-display font-700 text-[22px] text-[#0B1628] leading-snug mb-4 group-hover:text-[#284C98] transition-colors">{featured.title[lang]}</h2>
                <p className="text-[14px] text-[#5E6B7A] leading-relaxed mb-6">{featured.excerpt[lang]}</p>
                <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
                  {lang === 'EN' ? 'Read Article' : 'Baca Artikel'}
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {rest.map((a) => (
              <article
                key={a.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#DDE5EE] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => openArticle(a)}
              >
                <div className="relative h-[200px] overflow-hidden bg-[#EEF3F8]">
                  <img src={a.img} alt={a.title.EN} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <div className="flex gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#EEF3F8] text-[#284C98] text-[10px] font-display font-700 uppercase tracking-wide">{lang === 'EN' ? a.cat.EN : a.cat.ID}</span>
                    <span className="text-[12px] text-[#8491A1]">{a.date}</span>
                  </div>
                  <h3 className="font-display font-700 text-[15px] text-[#0B1628] leading-snug mb-3 group-hover:text-[#284C98] transition-colors">{a.title[lang]}</h3>
                  <p className="text-[13px] text-[#5E6B7A] leading-relaxed mb-5">{a.excerpt[lang]}</p>
                  <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
                    {lang === 'EN' ? 'Read Article' : 'Baca Artikel'}
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="h-[3px] bg-gradient-to-r from-[#284C98] to-[#4CB2E6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#8491A1] text-[16px]">
              {lang === 'EN' ? 'No articles found.' : 'Artikel tidak ditemukan.'}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
