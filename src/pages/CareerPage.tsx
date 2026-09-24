import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import type { Lang, Page } from '../App'

interface Props { lang: Lang; navigate: (p: Page) => void; openContact: (type?: string) => void }

const JOBS = [
  { role: { EN: 'Network Engineer', ID: 'Network Engineer' }, dept: { EN: 'Engineering', ID: 'Teknik' }, loc: 'Jakarta', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
  { role: { EN: 'Fiber Optic Technician', ID: 'Teknisi Fiber Optik' }, dept: { EN: 'Field Operations', ID: 'Operasional Lapangan' }, loc: 'Jakarta / Regional', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
  { role: { EN: 'Software Developer', ID: 'Pengembang Perangkat Lunak' }, dept: { EN: 'Technology', ID: 'Teknologi' }, loc: 'Jakarta', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
  { role: { EN: 'IT Solutions Consultant', ID: 'Konsultan Solusi IT' }, dept: { EN: 'Sales & Solutions', ID: 'Penjualan & Solusi' }, loc: 'Jakarta', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
  { role: { EN: 'Product Specialist', ID: 'Spesialis Produk' }, dept: { EN: 'Product', ID: 'Produk' }, loc: 'Jakarta', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
  { role: { EN: 'Business Development Manager', ID: 'Manajer Pengembangan Bisnis' }, dept: { EN: 'Business Development', ID: 'Pengembangan Bisnis' }, loc: 'Jakarta', type: { EN: 'Full-time', ID: 'Penuh Waktu' } },
]

export default function CareerPage({ lang, navigate, openContact }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const r1 = useReveal()
  const r2 = useReveal()

  return (
    <main className="pt-[70px]">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#07182D] pb-0">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1920&h=1080&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182D] via-[#07182D]/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 pb-20 text-center">
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
            <span className="w-6 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'CAREER' : 'KARIR'}
            <span className="w-6 h-[1px] bg-[#F7992E]" />
          </span>
          <h1 className="font-display font-800 text-[48px] lg:text-[72px] text-white leading-[1.05] max-w-[700px] mx-auto mb-8">
            {lang === 'EN' ? 'Build the future of connectivity & technology.' : 'Bangun masa depan konektivitas & teknologi.'}
          </h1>
          <button className="group px-8 py-4 rounded-xl bg-[#284C98] text-white font-display font-700 text-[15px] inline-flex items-center gap-3 hover:bg-[#4CB2E6] transition-colors duration-200">
            {lang === 'EN' ? 'View Open Positions' : 'Lihat Posisi Terbuka'}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>

      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>

      {/* Life at DMS */}
      <section className="bg-white py-20 lg:py-28">
        <div ref={r1.ref} className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${r1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
                <span className="w-5 h-[1px] bg-[#F7992E]" />
                {lang === 'EN' ? 'LIFE AT DMS' : 'KEHIDUPAN DI DMS'}
              </span>
              <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-[#0B1628] leading-[1.1] mb-7">
                {lang === 'EN' ? 'Where technology meets purpose.' : 'Di mana teknologi bertemu tujuan.'}
              </h2>
              <p className="text-[16px] text-[#5E6B7A] leading-relaxed mb-8">
                {lang === 'EN'
                  ? 'At Digital Multi Sinergy, you work on real implementations that connect businesses and communities to reliable technology infrastructure. We believe in growing people alongside projects.'
                  : 'Di Digital Multi Sinergy, Anda mengerjakan implementasi nyata yang menghubungkan bisnis dan komunitas ke infrastruktur teknologi yang andal.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '◉', t: { EN: 'Career Growth', ID: 'Pertumbuhan Karir' }, b: { EN: 'Clear paths and skill development', ID: 'Jalur karir yang jelas' } },
                  { icon: '◈', t: { EN: 'Real Impact', ID: 'Dampak Nyata' }, b: { EN: 'Projects that shape connectivity', ID: 'Proyek yang membentuk konektivitas' } },
                  { icon: '◆', t: { EN: 'Strong Team', ID: 'Tim Kuat' }, b: { EN: 'Collaborative expert environment', ID: 'Lingkungan kolaboratif' } },
                  { icon: '◎', t: { EN: 'Innovation', ID: 'Inovasi' }, b: { EN: 'Modern technology every day', ID: 'Teknologi modern setiap hari' } },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl bg-[#F6F8FB] border border-[#DDE5EE] hover:border-[#4CB2E6] transition-colors">
                    <span className="text-[18px] text-[#4CB2E6] block mb-2">{item.icon}</span>
                    <div className="font-display font-700 text-[14px] text-[#0B1628] mb-1">{item.t[lang]}</div>
                    <div className="text-[12px] text-[#5E6B7A]">{item.b[lang]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] overflow-hidden h-[520px] bg-[#EEF3F8]">
              <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&h=1040&fit=crop&auto=format" alt="DMS team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Wave → light bg */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,20 C360,70 720,10 1080,50 C1260,65 1380,15 1440,20 L1440,70 L0,70 Z" fill="#F6F8FB"/>
        </svg>
      </div>

      {/* Open positions */}
      <section className="bg-[#F6F8FB] py-20 lg:py-28">
        <div ref={r2.ref} className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${r2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-4">
              <span className="w-5 h-[1px] bg-[#F7992E]" />
              {lang === 'EN' ? 'OPEN POSITIONS' : 'POSISI TERBUKA'}
              <span className="w-5 h-[1px] bg-[#F7992E]" />
            </span>
            <h2 className="font-display font-800 text-[36px] lg:text-[48px] text-[#0B1628] leading-[1.1]">
              {lang === 'EN' ? 'Join our team.' : 'Bergabunglah dengan tim kami.'}
            </h2>
          </div>

          <div className="space-y-3 max-w-[900px] mx-auto">
            {JOBS.map((job, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDE5EE] hover:border-[#4CB2E6] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <button
                  className="w-full text-left px-8 py-6 flex items-center justify-between"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-display font-700 text-[16px] text-[#0B1628]">{job.role[lang]}</span>
                    <span className="text-[13px] text-[#8491A1]">{job.dept[lang]}</span>
                    <span className="flex items-center gap-1.5 text-[13px] text-[#5E6B7A]">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                      {job.loc}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#EEF3F8] text-[#284C98] text-[11px] font-display font-700">{job.type[lang]}</span>
                  </div>
                  <svg className={`w-5 h-5 text-[#8491A1] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round"/></svg>
                </button>
                {open === i && (
                  <div className="px-8 pb-8 border-t border-[#DDE5EE] pt-6">
                    <p className="text-[15px] text-[#5E6B7A] mb-6">
                      {lang === 'EN'
                        ? `We are looking for a ${job.role.EN} to join our team. You will work on real-world connectivity and technology infrastructure projects for enterprise and telecommunications clients.`
                        : `Kami mencari ${job.role.ID} untuk bergabung dengan tim kami. Anda akan mengerjakan proyek infrastruktur konektivitas dan teknologi nyata untuk klien enterprise dan telekomunikasi.`}
                    </p>
                    <button
                      onClick={() => openContact(lang === 'EN' ? 'Other' : 'Lainnya')}
                      className="px-6 py-3 rounded-xl bg-[#284C98] text-white font-display font-700 text-[14px] hover:bg-[#4CB2E6] transition-colors duration-200"
                    >
                      {lang === 'EN' ? 'Apply Now' : 'Lamar Sekarang'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
