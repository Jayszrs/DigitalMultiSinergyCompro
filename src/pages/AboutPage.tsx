import { useReveal } from '../hooks/useReveal'
import type { Lang, Page } from '../App'

interface Props { lang: Lang; navigate: (p: Page) => void; openContact: (type?: string) => void }

export default function AboutPage({ lang, navigate, openContact }: Props) {
  const r1 = useReveal()
  const r2 = useReveal()
  const r3 = useReveal()

  return (
    <main className="pt-[70px]">
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-end bg-[#07182D] overflow-hidden pb-0">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07182D] via-[#07182D]/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10 pb-16 text-center">
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
            <span className="w-6 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'ABOUT DIGITAL MULTI SINERGY' : 'TENTANG DIGITAL MULTI SINERGY'}
            <span className="w-6 h-[1px] bg-[#F7992E]" />
          </span>
          <h1 className="font-display font-800 text-[48px] lg:text-[72px] text-white leading-[1.05] tracking-tight max-w-[800px] mx-auto">
            {lang === 'EN' ? 'Technology, connectivity and implementation working together.' : 'Teknologi, konektivitas, dan implementasi bekerja bersama.'}
          </h1>
        </div>
      </section>

      {/* Wave hero → white */}
      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>

      {/* ─── COMPANY OVERVIEW ─────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div ref={r1.ref} className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${r1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
                <span className="w-5 h-[1px] bg-[#F7992E]" />
                {lang === 'EN' ? 'WHO WE ARE' : 'SIAPA KAMI'}
              </span>
              <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-[#0B1628] leading-[1.1] mb-7">
                {lang === 'EN' ? 'A technology and connectivity company built on implementation experience.' : 'Perusahaan teknologi dan konektivitas yang dibangun di atas pengalaman implementasi.'}
              </h2>
              <p className="text-[16px] text-[#5E6B7A] leading-relaxed mb-5">
                {lang === 'EN'
                  ? 'Digital Multi Sinergy (DMS) is a technology and connectivity solutions company specializing in fiber optic infrastructure, FTTx solutions, network products, telecommunications equipment, software development, IT solutions, and artificial intelligence services.'
                  : 'Digital Multi Sinergy (DMS) adalah perusahaan solusi teknologi dan konektivitas yang berfokus pada infrastruktur fiber optik, solusi FTTx, produk jaringan, peralatan telekomunikasi, pengembangan perangkat lunak, solusi IT, dan layanan kecerdasan buatan.'}
              </p>
              <p className="text-[16px] text-[#5E6B7A] leading-relaxed mb-8">
                {lang === 'EN'
                  ? 'We serve enterprise clients, government institutions, telecommunications operators, and infrastructure providers across Indonesia with a focus on reliable implementation and quality products.'
                  : 'Kami melayani klien enterprise, institusi pemerintah, operator telekomunikasi, dan penyedia infrastruktur di seluruh Indonesia dengan fokus pada implementasi yang andal dan produk berkualitas.'}
              </p>
              <button
                onClick={() => openContact()}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#284C98] text-white font-display font-700 text-[14px] hover:bg-[#4CB2E6] transition-colors duration-200"
              >
                {lang === 'EN' ? 'Get in Touch' : 'Hubungi Kami'}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden h-[500px] bg-[#EEF3F8]">
                <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&h=1000&fit=crop&auto=format" alt="DMS team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#07182D] rounded-2xl p-5 shadow-xl">
                <div className="font-display font-800 text-[36px] text-[#4CB2E6] leading-none">XX+</div>
                <div className="text-[12px] text-white/60 mt-1">{lang === 'EN' ? 'Industries Served' : 'Industri Dilayani'}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { val: 'XX+', en: 'Projects', id: 'Proyek' },
              { val: 'XX+', en: 'Partners', id: 'Mitra' },
              { val: 'XX', en: 'Industries', id: 'Industri' },
              { val: 'XX+', en: 'Products', id: 'Produk' },
            ].map((m, i) => (
              <div key={i} className="p-7 rounded-2xl bg-[#F6F8FB] border border-[#DDE5EE] text-center">
                <div className="font-display font-800 text-[44px] text-[#284C98] leading-none">{m.val}</div>
                <div className="text-[14px] text-[#5E6B7A] mt-2">{lang === 'EN' ? m.en : m.id}</div>
                <div className="text-[11px] text-[#8491A1] mt-0.5 italic">placeholder</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave to dark */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C360,70 720,0 1080,40 C1260,55 1380,10 1440,35 L1440,70 L0,70 Z" fill="#07182D"/>
        </svg>
      </div>

      {/* ─── VALUES (dark) ─────────────────────────────── */}
      <section className="bg-[#07182D] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg className="absolute right-0 top-0 w-[600px] h-full" viewBox="0 0 600 600" fill="none">
            <ellipse cx="400" cy="300" rx="280" ry="180" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-20 400 300)" />
          </svg>
        </div>
        <div ref={r2.ref} className={`max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10 transition-all duration-700 ${r2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#4CB2E6] font-display font-700 mb-4">
              <span className="w-5 h-[1px] bg-[#4CB2E6]" />
              {lang === 'EN' ? 'OUR VALUES' : 'NILAI KAMI'}
              <span className="w-5 h-[1px] bg-[#4CB2E6]" />
            </span>
            <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-white leading-[1.1]">
              {lang === 'EN' ? 'What we stand for.' : 'Apa yang kami pegang.'}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { icon: '◎', t: { EN: 'Quality', ID: 'Kualitas' }, b: { EN: 'We are committed to supplying products that meet industry standards and implementation practices that leave no room for error.', ID: 'Kami berkomitmen untuk menyediakan produk yang memenuhi standar industri dan praktik implementasi yang tidak memberikan ruang untuk kesalahan.' } },
              { icon: '◈', t: { EN: 'Reliability', ID: 'Keandalan' }, b: { EN: 'Clients trust us to deliver connectivity and technology solutions that perform consistently in real-world deployment conditions.', ID: 'Klien mempercayai kami untuk memberikan solusi konektivitas dan teknologi yang bekerja secara konsisten dalam kondisi deployment nyata.' } },
              { icon: '◉', t: { EN: 'Innovation', ID: 'Inovasi' }, b: { EN: 'We stay at the forefront of fiber optic, network, and IT technologies to offer our clients future-ready solutions.', ID: 'Kami tetap berada di garis depan teknologi fiber optik, jaringan, dan IT untuk menawarkan solusi siap masa depan kepada klien.' } },
            ].map((v, i) => (
              <div key={i} className="p-9 rounded-2xl border border-white/10 hover:border-[#4CB2E6]/50 hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="text-[32px] text-[#4CB2E6] block mb-5 group-hover:text-[#F7992E] transition-colors duration-300">{v.icon}</span>
                <h3 className="font-display font-700 text-[20px] text-white mb-4">{v.t[lang]}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{v.b[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave dark → light */}
      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C480,0 960,70 1440,35 L1440,70 L0,70 Z" fill="#F6F8FB"/>
        </svg>
      </div>

      {/* ─── INDUSTRIES ────────────────────────────────── */}
      <section className="bg-[#F6F8FB] py-20 lg:py-28">
        <div ref={r3.ref} className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${r3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-4">
              <span className="w-5 h-[1px] bg-[#F7992E]" />
              {lang === 'EN' ? 'INDUSTRIES SERVED' : 'INDUSTRI YANG DILAYANI'}
              <span className="w-5 h-[1px] bg-[#F7992E]" />
            </span>
            <h2 className="font-display font-800 text-[36px] lg:text-[48px] text-[#0B1628] leading-[1.1]">
              {lang === 'EN' ? 'Built for different industries.' : 'Dibangun untuk berbagai industri.'}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {['Telecommunications', 'Enterprise', 'Government', 'Infrastructure', 'Technology', 'Data & Digital Services'].map((ind, i) => (
              <div key={i} className="group px-7 py-8 rounded-2xl bg-white border border-[#DDE5EE] hover:border-[#284C98] hover:shadow-lg transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-[#4CB2E6] mb-4 group-hover:bg-[#F7992E] transition-colors" />
                <h3 className="font-display font-700 text-[16px] lg:text-[18px] text-[#0B1628] group-hover:text-[#284C98] transition-colors">{ind}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
