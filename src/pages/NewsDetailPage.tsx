import type { Article } from '../data/articles'
import { ARTICLE_MAP } from '../data/articles'
import type { Lang, Page } from '../App'

interface Props {
  article: Article
  lang: Lang
  navigate: (p: Page) => void
  openArticle: (a: Article) => void
}

export default function NewsDetailPage({ article, lang, navigate, openArticle }: Props) {
  const related = article.related
    .map((id) => ARTICLE_MAP[id])
    .filter(Boolean)
    .slice(0, 2)

  return (
    <main className="pt-[70px]">
      {/* Breadcrumb */}
      <div className="bg-[#F6F8FB] border-b border-[#DDE5EE]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center gap-2 text-[13px] text-[#8491A1]">
          <button onClick={() => navigate('home')} className="hover:text-[#284C98] transition-colors">{lang === 'EN' ? 'Home' : 'Beranda'}</button>
          <span>/</span>
          <button onClick={() => navigate('news')} className="hover:text-[#284C98] transition-colors">{lang === 'EN' ? 'News' : 'Berita'}</button>
          <span>/</span>
          <span className="text-[#0B1628] font-medium line-clamp-1 max-w-[320px]">{article.title[lang]}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full h-[340px] lg:h-[480px] overflow-hidden bg-[#EEF3F8] relative">
        <img src={article.img} alt={article.title.EN} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1280px] mx-auto px-6 lg:px-10 pb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[11px] font-display font-700 uppercase tracking-wide">
              {article.cat[lang]}
            </span>
            <span className="text-white/60 text-[13px]">{article.date}</span>
          </div>
          <h1 className="font-display font-800 text-[28px] lg:text-[44px] text-white leading-[1.1] max-w-[800px]">
            {article.title[lang]}
          </h1>
        </div>
      </div>

      {/* Body */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Article content */}
            <article className="lg:col-span-2">
              <p className="text-[17px] text-[#5E6B7A] leading-relaxed mb-8 border-l-4 border-[#4CB2E6] pl-5 italic">
                {article.excerpt[lang]}
              </p>
              {article.body[lang].split('\n\n').map((para, i) => (
                <p key={i} className="text-[16px] text-[#5E6B7A] leading-relaxed mb-5">
                  {para}
                </p>
              ))}

              {/* Share / back */}
              <div className="mt-12 pt-8 border-t border-[#DDE5EE] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => navigate('news')}
                  className="flex items-center gap-2 text-[#284C98] font-display font-700 text-[14px] hover:text-[#4CB2E6] transition-colors group"
                >
                  <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {lang === 'EN' ? 'Back to News' : 'Kembali ke Berita'}
                </button>
                <div className="flex items-center gap-2 text-[13px] text-[#8491A1]">
                  <span>{lang === 'EN' ? 'Share:' : 'Bagikan:'}</span>
                  {['LinkedIn', 'Twitter', 'Facebook'].map((s) => (
                    <button key={s} className="px-3 py-1.5 rounded-lg bg-[#F6F8FB] border border-[#DDE5EE] hover:border-[#284C98] hover:text-[#284C98] transition-colors text-[12px] font-semibold">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Related articles */}
              {related.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-display font-700 text-[16px] text-[#0B1628] mb-5">
                    {lang === 'EN' ? 'Related Articles' : 'Artikel Terkait'}
                  </h3>
                  <div className="space-y-4">
                    {related.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => openArticle(a)}
                        className="group w-full text-left flex gap-4 p-4 rounded-xl border border-[#DDE5EE] hover:border-[#4CB2E6] hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#EEF3F8] shrink-0">
                          <img src={a.img} alt={a.title.EN} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                        </div>
                        <div>
                          <span className="text-[10px] font-display font-700 text-[#F7992E] uppercase tracking-wide">{a.cat[lang]}</span>
                          <h4 className="font-display font-600 text-[13px] text-[#0B1628] leading-snug mt-0.5 group-hover:text-[#284C98] transition-colors line-clamp-2">
                            {a.title[lang]}
                          </h4>
                          <span className="text-[11px] text-[#8491A1] mt-1 block">{a.date}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div className="bg-[#07182D] rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  <svg className="absolute -right-5 -bottom-5 w-[150px] h-[150px]" viewBox="0 0 150 150" fill="none">
                    <ellipse cx="100" cy="100" rx="80" ry="50" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-20 100 100)" />
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[18px] text-white mb-3 relative z-10">
                  {lang === 'EN' ? 'Have a project?' : 'Punya proyek?'}
                </h3>
                <p className="text-[13px] text-white/55 mb-5 relative z-10">
                  {lang === 'EN' ? 'Talk with our team about your connectivity needs.' : 'Bicarakan kebutuhan konektivitas Anda dengan tim kami.'}
                </p>
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-3 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[14px] hover:bg-[#e08820] transition-colors relative z-10"
                >
                  {lang === 'EN' ? 'Free Consultation' : 'Konsultasi Gratis'}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
