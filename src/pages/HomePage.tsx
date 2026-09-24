import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { PRODUCTS } from '../data/products'
import { ARTICLES } from '../data/articles'
import type { Product } from '../data/products'
import type { Article } from '../data/articles'
import type { Page, Lang } from '../App'

interface Props {
  navigate: (p: Page) => void
  lang: Lang
  openProduct: (p: Product) => void
  openArticle: (a: Article) => void
}

const SERVICES = [
  {
    key: 'passive',
    img: 'https://images.unsplash.com/photo-1594915440248-1e419eba6611?w=700&h=480&fit=crop&auto=format',
    title: { EN: 'Passive Components', ID: 'Komponen Pasif' },
    desc: { EN: 'Patchcords, drop cables, ODPs, splitters, closures, and fiber optic passive infrastructure for FTTx and enterprise networks.', ID: 'Patchcord, kabel drop, ODP, splitter, closure, dan infrastruktur pasif fiber optik untuk jaringan FTTx dan enterprise.' },
  },
  {
    key: 'active',
    img: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=700&h=480&fit=crop&auto=format',
    title: { EN: 'Active Network Equipment', ID: 'Peralatan Jaringan Aktif' },
    desc: { EN: 'ONTs, OLTs, switches, and active network devices for modern GPON and XGS-PON broadband deployments.', ID: 'ONT, OLT, switch, dan perangkat jaringan aktif untuk deployment broadband GPON dan XGS-PON modern.' },
  },
  {
    key: 'fttx',
    img: 'https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=700&h=480&fit=crop&auto=format',
    title: { EN: 'FTTx Tools & Equipment', ID: 'Alat & Peralatan FTTx' },
    desc: { EN: 'Splicers, OTDRs, power meters, and specialized tools engineered for fast, accurate fiber optic field installation.', ID: 'Splicer, OTDR, power meter, dan alat khusus yang dirancang untuk instalasi fiber optik lapangan yang cepat dan akurat.' },
  },
  {
    key: 'software',
    img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=700&h=480&fit=crop&auto=format',
    title: { EN: 'Software & IT Solutions', ID: 'Solusi Perangkat Lunak & IT' },
    desc: { EN: 'Custom software development, network management systems, IT infrastructure solutions, and digital transformation services.', ID: 'Pengembangan perangkat lunak kustom, sistem manajemen jaringan, solusi infrastruktur IT, dan layanan transformasi digital.' },
  },
  {
    key: 'ai',
    img: 'https://images.unsplash.com/photo-1700049775359-6f53cd16114e?w=700&h=480&fit=crop&auto=format',
    title: { EN: 'AI & Intelligence Solutions', ID: 'Solusi AI & Kecerdasan' },
    desc: { EN: 'Artificial intelligence platforms, predictive analytics, and intelligent automation tailored for telecommunications and enterprise operations.', ID: 'Platform kecerdasan buatan, analitik prediktif, dan otomasi cerdas yang disesuaikan untuk operasi telekomunikasi dan enterprise.' },
  },
]

const CAPABILITIES = [
  { en: 'Fiber Optic Infrastructure', id: 'Infrastruktur Fiber Optik' },
  { en: 'Network & Connectivity', id: 'Jaringan & Konektivitas' },
  { en: 'Telecommunications Products', id: 'Produk Telekomunikasi' },
  { en: 'FTTx Deployment', id: 'Deployment FTTx' },
  { en: 'Software Development', id: 'Pengembangan Perangkat Lunak' },
  { en: 'IT Solutions', id: 'Solusi IT' },
  { en: 'Artificial Intelligence', id: 'Kecerdasan Buatan' },
  { en: 'Project Implementation', id: 'Implementasi Proyek' },
]

const CLIENTS = [
  { label: 'Telco Partner 01' },
  { label: 'Enterprise Client 02' },
  { label: 'Gov. Agency 03' },
  { label: 'ISP Partner 04' },
  { label: 'Tech Vendor 05' },
  { label: 'Infrastructure Co. 06' },
]

const IMPLEMENTATIONS = [
  {
    img: 'https://images.unsplash.com/photo-1785682231847-93265d8e633d?w=800&h=560&fit=crop&auto=format',
    industry: { EN: 'Telecommunications', ID: 'Telekomunikasi' },
    cat: { EN: 'Fiber Optic Infrastructure', ID: 'Infrastruktur Fiber Optik' },
    title: { EN: 'Project Implementation 01', ID: 'Implementasi Proyek 01' },
    desc: { EN: 'End-to-end backbone fiber optic deployment for major telco operator including splicing, testing and documentation.', ID: 'Deployment fiber optik backbone end-to-end untuk operator telko utama termasuk splicing, pengujian, dan dokumentasi.' },
  },
  {
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=560&fit=crop&auto=format',
    industry: { EN: 'Enterprise', ID: 'Enterprise' },
    cat: { EN: 'IT Solutions', ID: 'Solusi IT' },
    title: { EN: 'Project Implementation 02', ID: 'Implementasi Proyek 02' },
    desc: { EN: 'Campus network rollout with structured cabling, active equipment, and comprehensive network management platform.', ID: 'Implementasi jaringan kampus dengan kabel terstruktur, peralatan aktif, dan platform manajemen jaringan komprehensif.' },
  },
  {
    img: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&h=560&fit=crop&auto=format',
    industry: { EN: 'Government', ID: 'Pemerintah' },
    cat: { EN: 'Software & AI', ID: 'Perangkat Lunak & AI' },
    title: { EN: 'Project Implementation 03', ID: 'Implementasi Proyek 03' },
    desc: { EN: 'Integrated digital platform for government agency transformation with AI-driven analytics and process automation.', ID: 'Platform digital terintegrasi untuk transformasi instansi pemerintah dengan analitik berbasis AI dan otomasi proses.' },
  },
]

const NEWS = [
  {
    cat: { EN: 'Technology', ID: 'Teknologi' },
    date: '14 Mar 2024',
    img: 'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=600&h=380&fit=crop&auto=format',
    title: { EN: 'Fiber Optic Infrastructure in Indonesia\'s Digital Economy', ID: 'Infrastruktur Fiber Optik di Ekonomi Digital Indonesia' },
    body: { EN: 'How fiber optic technology continues to drive digital transformation across enterprise and government sectors.', ID: 'Bagaimana teknologi fiber optik terus mendorong transformasi digital di sektor enterprise dan pemerintah.' },
  },
  {
    cat: { EN: 'Products', ID: 'Produk' },
    date: '28 Feb 2024',
    img: 'https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=600&h=380&fit=crop&auto=format',
    title: { EN: 'New FTTx Tool Series for Network Deployment', ID: 'Seri Alat FTTx Baru untuk Deployment Jaringan' },
    body: { EN: 'DMS expands its FTTx portfolio with advanced tools for faster, more accurate field installation.', ID: 'DMS memperluas portofolio FTTx dengan alat canggih untuk instalasi lapangan yang lebih cepat dan akurat.' },
  },
  {
    cat: { EN: 'Company News', ID: 'Berita Perusahaan' },
    date: '15 Jan 2024',
    img: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&h=380&fit=crop&auto=format',
    title: { EN: 'DMS Strengthens Partnership Ecosystem for 2024', ID: 'DMS Perkuat Ekosistem Kemitraan untuk 2024' },
    body: { EN: 'Expanding technology partnerships to deliver broader connectivity solutions across Indonesia.', ID: 'Memperluas kemitraan teknologi untuk memberikan solusi konektivitas yang lebih luas di Indonesia.' },
  },
]

export default function HomePage({ navigate, lang, openProduct, openArticle }: Props) {
  const [scrollY, setScrollY] = useState(0)
  const [hovCap, setHovCap] = useState(-1)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const revServices = useReveal(0.05)
  const revCap = useReveal(0.1)
  const revImpl = useReveal(0.1)
  const revClients = useReveal(0.1)
  const revNews = useReveal(0.1)

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-[#07182D] overflow-hidden">
        {/* BG photo layer */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.18}px) scale(1.1)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1594915440248-1e419eba6611?w=1920&h=1200&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#07182D]/92 via-[#07182D]/80 to-[#123B70]/70" />
        </div>

        {/* Orbit rings */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.12]"
          style={{ transform: `translateY(calc(-50% + ${scrollY * 0.08}px))` }}>
          <svg viewBox="0 0 700 700" fill="none">
            <ellipse cx="350" cy="350" rx="320" ry="200" stroke="#4CB2E6" strokeWidth="1.5" transform="rotate(-20 350 350)" />
            <ellipse cx="350" cy="350" rx="230" ry="145" stroke="#4CB2E6" strokeWidth="1" transform="rotate(35 350 350)" />
            <circle cx="350" cy="350" r="80" stroke="#284C98" strokeWidth="1" />
            <circle cx="490" cy="210" r="10" fill="#F7992E" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 py-40 text-center w-full">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-8 h-[1px] bg-[#F7992E]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#F7992E] font-display font-700">
              {lang === 'EN' ? 'DIGITAL MULTI SINERGY' : 'DIGITAL MULTI SINERGY'}
            </span>
            <span className="w-8 h-[1px] bg-[#F7992E]" />
          </div>

          <h1 className="font-display font-800 text-[52px] sm:text-[68px] lg:text-[88px] text-white leading-[1.05] tracking-tight mb-8 max-w-[900px] mx-auto">
            {lang === 'EN' ? (
              <>Technology & Connectivity<br /><span className="text-[#4CB2E6]">Solutions</span> Built for Tomorrow.</>
            ) : (
              <>Solusi Teknologi &<br />Konektivitas untuk <span className="text-[#4CB2E6]">Masa Depan.</span></>
            )}
          </h1>

          <p className="text-[17px] lg:text-[19px] text-white/60 max-w-[580px] mx-auto leading-relaxed mb-12">
            {lang === 'EN'
              ? 'Delivering reliable connectivity, telecommunications, IT and technology solutions through quality products and professional implementation.'
              : 'Menyediakan konektivitas, telekomunikasi, IT, dan solusi teknologi yang andal melalui produk berkualitas dan implementasi profesional.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="group px-8 py-4 rounded-xl bg-[#284C98] text-white font-display font-700 text-[15px] flex items-center gap-3 hover:bg-[#4CB2E6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#284C98]/30"
            >
              {lang === 'EN' ? 'Free Consultation Available' : 'Konsultasi Gratis Tersedia'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => navigate('products')}
              className="px-8 py-4 rounded-xl border border-white/25 text-white font-display font-600 text-[15px] hover:border-white/60 hover:bg-white/8 transition-all duration-300"
            >
              {lang === 'EN' ? 'Explore Products' : 'Jelajahi Produk'}
            </button>
          </div>

          {/* Scroll arrow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </section>

      {/* Wave hero → white */}
      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
          <path d="M0,30 C360,90 720,0 1080,50 C1260,75 1380,20 1440,30 L1440,90 L0,90 Z" fill="white"/>
        </svg>
      </div>

      {/* ─── SERVICES CARDS ───────────────────────────────────── */}
      <section className="bg-white pt-4 pb-20 lg:pb-28">
        <div
          ref={revServices.ref}
          className="max-w-[1280px] mx-auto px-6 lg:px-10"
        >
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-4">
              <span className="w-5 h-[1px] bg-[#F7992E]" />
              {lang === 'EN' ? 'OUR PRODUCTS' : 'PRODUK KAMI'}
              <span className="w-5 h-[1px] bg-[#F7992E]" />
            </span>
            <h2 className="font-display font-800 text-[36px] lg:text-[54px] text-[#0B1628] leading-[1.1] tracking-tight">
              {lang === 'EN' ? 'Solutions for modern\nconnectivity infrastructure.' : 'Solusi untuk infrastruktur\nkonektivitas modern.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((svc, i) => (
              <article
                key={svc.key}
                className={`group bg-white rounded-2xl overflow-hidden border border-[#DDE5EE] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ${revServices.visible ? 'reveal visible' : 'reveal'} reveal-delay-${Math.min(i + 1, 5)}`}
                onClick={() => navigate('products')}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[220px] bg-[#EEF3F8]">
                  <img
                    src={svc.img}
                    alt={svc.title.EN}
                    className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/50 via-transparent to-transparent group-hover:from-[#284C98]/40 transition-all duration-500" />
                  {/* Number badge */}
                  <span className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center font-display font-700 text-[13px] text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="font-display font-700 text-[19px] text-[#0B1628] mb-3 group-hover:text-[#284C98] transition-colors">
                    {svc.title[lang]}
                  </h3>
                  <p className="text-[14px] text-[#5E6B7A] leading-relaxed mb-5">
                    {svc.desc[lang]}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
                    {lang === 'EN' ? 'Learn More' : 'Pelajari Lebih Lanjut'}
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>

                {/* Bottom orange bar on hover */}
                <div className="h-[3px] bg-gradient-to-r from-[#284C98] to-[#4CB2E6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DARK CTA STRIP ───────────────────────────────────── */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C480,70 960,0 1440,35 L1440,70 L0,70 Z" fill="#07182D"/>
        </svg>
      </div>
      <section className="bg-[#07182D] py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="absolute right-0 top-0 w-[500px] h-[500px]" viewBox="0 0 500 500" fill="none">
            <ellipse cx="400" cy="200" rx="260" ry="165" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-10 400 200)" />
          </svg>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center relative z-10">
          <h2 className="font-display font-800 text-[32px] lg:text-[52px] text-white leading-[1.1] mb-5">
            {lang === 'EN' ? "Let's build the right technology\nsolution together." : 'Mari bangun solusi teknologi\nyang tepat bersama.'}
          </h2>
          <p className="text-[16px] text-white/50 mb-9 max-w-[480px] mx-auto">
            {lang === 'EN'
              ? 'Talk with our team about your next connectivity, infrastructure or digital project.'
              : 'Bicarakan proyek konektivitas, infrastruktur, atau digital Anda berikutnya bersama tim kami.'}
          </p>
          <button
            onClick={() => navigate('contact')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[15px] hover:bg-[#e08820] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F7992E]/25"
          >
            {lang === 'EN' ? 'Free Consultation Available' : 'Konsultasi Gratis Tersedia'}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>
      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C480,0 960,70 1440,35 L1440,70 L0,70 Z" fill="white"/>
        </svg>
      </div>

      {/* ─── CAPABILITIES ─────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div
          ref={revCap.ref}
          className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${revCap.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
                <span className="w-5 h-[1px] bg-[#F7992E]" />
                {lang === 'EN' ? 'CAPABILITIES' : 'KEMAMPUAN'}
              </span>
              <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-[#0B1628] leading-[1.1] mb-8">
                {lang === 'EN' ? 'From infrastructure to\nintelligent digital solutions.' : 'Dari infrastruktur ke\nsolusi digital cerdas.'}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {CAPABILITIES.map((c, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHovCap(i)}
                    onMouseLeave={() => setHovCap(-1)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-default ${hovCap === i ? 'bg-[#EEF3F8]' : ''}`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-200 ${hovCap === i ? 'bg-[#F7992E]' : 'bg-[#4CB2E6]'}`} />
                    <span className={`text-[14px] font-display font-600 transition-colors duration-200 ${hovCap === i ? 'text-[#284C98]' : 'text-[#0B1628]'}`}>
                      {lang === 'EN' ? c.en : c.id}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('about')}
                className="mt-8 inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[14px] hover:text-[#4CB2E6] transition-colors group"
              >
                {lang === 'EN' ? 'More about DMS' : 'Lebih lanjut tentang DMS'}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden h-[480px] lg:h-[560px] bg-[#EEF3F8]">
                <img
                  src={hovCap >= 0 && hovCap < 4
                    ? ['https://images.unsplash.com/photo-1594915440248-1e419eba6611?w=900&h=1120&fit=crop&auto=format',
                       'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&h=1120&fit=crop&auto=format',
                       'https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=900&h=1120&fit=crop&auto=format',
                       'https://images.unsplash.com/photo-1785682231847-93265d8e633d?w=900&h=1120&fit=crop&auto=format'][hovCap]
                    : 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=900&h=1120&fit=crop&auto=format'}
                  alt="DMS capability"
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/30 to-transparent rounded-[28px]" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-5 -left-5 bg-[#07182D] rounded-2xl p-5 shadow-xl">
                <div className="font-display font-800 text-[36px] text-[#4CB2E6] leading-none">XX+</div>
                <div className="text-[12px] text-white/60 mt-1">{lang === 'EN' ? 'Projects Implemented' : 'Proyek Diimplementasikan'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPLEMENTATIONS ──────────────────────────────────── */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,20 C360,70 720,10 1080,50 C1260,65 1380,15 1440,20 L1440,70 L0,70 Z" fill="#F6F8FB"/>
        </svg>
      </div>
      <section className="bg-[#F6F8FB] pb-24 lg:pb-32">
        <div
          ref={revImpl.ref}
          className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${revImpl.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-4">
                <span className="w-5 h-[1px] bg-[#F7992E]" />
                {lang === 'EN' ? 'TECHNOLOGY IN ACTION' : 'TEKNOLOGI DALAM AKSI'}
              </span>
              <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-[#0B1628] leading-[1.1]">
                {lang === 'EN' ? 'Technology in Action' : 'Teknologi dalam Aksi'}
              </h2>
            </div>
          </div>

          <div className="space-y-7">
            {IMPLEMENTATIONS.map((item, i) => (
              <div
                key={i}
                className={`group grid grid-cols-1 lg:grid-cols-2 rounded-[24px] overflow-hidden bg-white border border-[#DDE5EE] hover:shadow-2xl transition-all duration-500 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                <div className={`relative h-[280px] lg:h-[380px] overflow-hidden bg-[#EEF3F8] ${i % 2 === 1 ? '[direction:ltr]' : ''}`}>
                  <img
                    src={item.img}
                    alt={item.title.EN}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/30 to-transparent" />
                  <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[11px] font-display font-700 tracking-wide">
                    {item.industry[lang]}
                  </span>
                </div>
                <div className={`p-10 lg:p-14 flex flex-col justify-center ${i % 2 === 1 ? '[direction:ltr]' : ''}`}>
                  <span className="font-display font-800 text-[56px] text-[#EEF3F8] leading-none mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-4 h-[2px] bg-[#F7992E]" />
                    <span className="text-[11px] text-[#F7992E] font-display font-700 tracking-wider uppercase">{item.cat[lang]}</span>
                  </div>
                  <h3 className="font-display font-700 text-[22px] lg:text-[26px] text-[#0B1628] mb-4 group-hover:text-[#284C98] transition-colors">{item.title[lang]}</h3>
                  <p className="text-[15px] text-[#5E6B7A] leading-relaxed">{item.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY DMS (dark) ───────────────────────────────────── */}
      <div className="wave-divider bg-[#F6F8FB]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C360,0 720,70 1080,30 C1260,10 1380,55 1440,35 L1440,70 L0,70 Z" fill="#07182D"/>
        </svg>
      </div>
      <section className="bg-[#07182D] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
          <svg className="absolute -left-20 top-0 w-[700px] h-full" viewBox="0 0 700 600" fill="none">
            <ellipse cx="200" cy="300" rx="300" ry="200" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-15 200 300)" />
            <ellipse cx="200" cy="300" rx="210" ry="135" stroke="#284C98" strokeWidth="1" transform="rotate(30 200 300)" />
          </svg>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#4CB2E6] font-display font-700 mb-4">
              <span className="w-5 h-[1px] bg-[#4CB2E6]" />
              {lang === 'EN' ? 'WHY CHOOSE DMS' : 'MENGAPA MEMILIH DMS'}
              <span className="w-5 h-[1px] bg-[#4CB2E6]" />
            </span>
            <h2 className="font-display font-800 text-[36px] lg:text-[52px] text-white leading-[1.1]">
              {lang === 'EN' ? 'Why Digital Multi Sinergy.' : 'Mengapa Digital Multi Sinergy.'}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { icon: '◈', t: { EN: 'Reliable Solutions', ID: 'Solusi Andal' }, b: { EN: 'We supply and implement proven connectivity and technology products that meet the demands of modern enterprise and telecommunications infrastructure.', ID: 'Kami menyediakan dan mengimplementasikan produk konektivitas dan teknologi terbukti yang memenuhi tuntutan infrastruktur enterprise dan telekomunikasi modern.' } },
              { icon: '◉', t: { EN: 'Technical Expertise', ID: 'Keahlian Teknis' }, b: { EN: 'Our team combines deep product knowledge with hands-on deployment experience across fiber optic, network, and IT solution implementations.', ID: 'Tim kami menggabungkan pengetahuan produk mendalam dengan pengalaman deployment langsung di implementasi fiber optik, jaringan, dan solusi IT.' } },
              { icon: '◆', t: { EN: 'Implementation Focus', ID: 'Fokus Implementasi' }, b: { EN: 'We deliver complete solutions from consultation through installation, commissioning, and ongoing technical support — not just products.', ID: 'Kami memberikan solusi lengkap dari konsultasi hingga instalasi, komisioning, dan dukungan teknis berkelanjutan — bukan hanya produk.' } },
            ].map((p, i) => (
              <div key={i} className="p-8 lg:p-10 rounded-2xl border border-white/10 hover:border-[#4CB2E6]/50 hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="text-[32px] text-[#4CB2E6] mb-6 block group-hover:text-[#F7992E] transition-colors duration-300">{p.icon}</span>
                <h3 className="font-display font-700 text-[20px] text-white mb-4">{p.t[lang]}</h3>
                <p className="text-[14px] text-white/50 leading-relaxed">{p.b[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENTS / PARTNERS ───────────────────────────────── */}
      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,35 C480,70 960,0 1440,35 L1440,70 L0,70 Z" fill="white"/>
        </svg>
      </div>
      <section className="bg-white py-16 lg:py-20">
        <div
          ref={revClients.ref}
          className={`max-w-[1280px] mx-auto px-6 lg:px-10 text-center transition-all duration-700 ${revClients.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-3">
            <span className="w-5 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'TRUSTED TECHNOLOGY ECOSYSTEM' : 'EKOSISTEM TEKNOLOGI TERPERCAYA'}
            <span className="w-5 h-[1px] bg-[#F7992E]" />
          </span>
          <h2 className="font-display font-700 text-[24px] lg:text-[32px] text-[#0B1628] mb-12">
            {lang === 'EN' ? 'Technology partners & certifications' : 'Mitra teknologi & sertifikasi'}
          </h2>
          <div className="flex flex-wrap justify-center gap-5">
            {CLIENTS.map((c, i) => (
              <div
                key={i}
                className="group w-[160px] h-[72px] rounded-xl bg-[#F6F8FB] border border-[#DDE5EE] flex items-center justify-center hover:border-[#284C98] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="text-[11px] font-display font-600 text-[#8491A1] group-hover:text-[#284C98] transition-colors tracking-wide text-center leading-tight px-3">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─────────────────────────────────────────────── */}
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
          <path d="M0,20 C360,70 720,10 1080,50 C1260,65 1380,15 1440,20 L1440,70 L0,70 Z" fill="#F6F8FB"/>
        </svg>
      </div>
      <section className="bg-[#F6F8FB] pb-28 lg:pb-36">
        <div
          ref={revNews.ref}
          className={`max-w-[1280px] mx-auto px-6 lg:px-10 transition-all duration-700 ${revNews.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-4">
                <span className="w-5 h-[1px] bg-[#F7992E]" />
                {lang === 'EN' ? 'INSIGHTS & UPDATES' : 'WAWASAN & PEMBARUAN'}
              </span>
              <h2 className="font-display font-800 text-[36px] lg:text-[50px] text-[#0B1628] leading-[1.1]">
                {lang === 'EN' ? 'Latest News' : 'Berita Terbaru'}
              </h2>
            </div>
            <button
              onClick={() => navigate('news')}
              className="hidden lg:flex items-center gap-2 text-[#284C98] font-display font-700 text-[14px] hover:text-[#4CB2E6] transition-colors group"
            >
              {lang === 'EN' ? 'All Articles' : 'Semua Artikel'}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {ARTICLES.slice(0, 3).map((item, i) => (
              <article
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-[#DDE5EE] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => openArticle(item)}
              >
                <div className="relative h-[210px] overflow-hidden bg-[#EEF3F8]">
                  <img src={item.img} alt={item.title.EN} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182D]/40 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#EEF3F8] text-[#284C98] text-[10px] font-display font-700 uppercase tracking-wider">
                      {lang === 'EN' ? item.cat.EN : item.cat.ID}
                    </span>
                    <span className="text-[12px] text-[#8491A1]">{item.date}</span>
                  </div>
                  <h3 className="font-display font-700 text-[16px] text-[#0B1628] leading-snug mb-3 group-hover:text-[#284C98] transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-[13px] text-[#5E6B7A] leading-relaxed mb-5">{item.excerpt[lang]}</p>
                  <span className="inline-flex items-center gap-2 text-[#284C98] font-display font-700 text-[13px] group-hover:text-[#4CB2E6] transition-colors">
                    {lang === 'EN' ? 'Read Article' : 'Baca Artikel'}
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="h-[3px] bg-gradient-to-r from-[#284C98] to-[#4CB2E6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
