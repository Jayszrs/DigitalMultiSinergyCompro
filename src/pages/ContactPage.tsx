import { useState } from 'react'
import type { Lang } from '../App'

interface Props { lang: Lang; inquiryType?: string }

const INQUIRY_TYPES = {
  EN: ['Product Inquiry', 'Connectivity Solution', 'IT / Software', 'Partnership', 'Other'],
  ID: ['Pertanyaan Produk', 'Solusi Konektivitas', 'IT / Perangkat Lunak', 'Kemitraan', 'Lainnya'],
}

export default function ContactPage({ lang, inquiryType = '' }: Props) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: inquiryType, message: '' })
  const [sent, setSent] = useState(false)
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <main className="pt-[70px]">
      {/* Hero */}
      <section className="bg-[#07182D] pt-20 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="absolute right-0 bottom-0 w-[500px] h-[500px]" viewBox="0 0 500 500" fill="none">
            <ellipse cx="350" cy="380" rx="280" ry="180" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-15 350 380)" />
          </svg>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20 text-center relative z-10">
          <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#F7992E] font-display font-700 mb-5">
            <span className="w-6 h-[1px] bg-[#F7992E]" />
            {lang === 'EN' ? 'CONTACT US' : 'HUBUNGI KAMI'}
            <span className="w-6 h-[1px] bg-[#F7992E]" />
          </span>
          <h1 className="font-display font-800 text-[48px] lg:text-[72px] text-white leading-[1.05] mb-5 max-w-[700px] mx-auto">
            {lang === 'EN' ? "Let's Discuss Your Project." : 'Mari Diskusikan Proyek Anda.'}
          </h1>
          <p className="text-[17px] text-white/55 max-w-[480px] mx-auto">
            {lang === 'EN'
              ? "Tell us what you are building and our team will help identify the right solution."
              : 'Ceritakan apa yang Anda bangun dan tim kami akan membantu mengidentifikasi solusi yang tepat.'}
          </p>
        </div>
      </section>

      <div className="wave-divider bg-[#07182D]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>

      {/* Form + contact */}
      <section className="bg-white py-16 lg:py-20 pb-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display font-800 text-[28px] lg:text-[36px] text-[#0B1628] mb-8">
                {lang === 'EN' ? 'Send us an inquiry' : 'Kirim pertanyaan'}
              </h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-[#DDE5EE] rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-[#284C98]/10 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#284C98]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="font-display font-700 text-[24px] text-[#0B1628] mb-2">{lang === 'EN' ? 'Inquiry sent.' : 'Pertanyaan terkirim.'}</h3>
                  <p className="text-[#5E6B7A]">{lang === 'EN' ? "We'll be in touch shortly." : 'Kami akan segera menghubungi Anda.'}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={lang === 'EN' ? 'Full Name' : 'Nama Lengkap'} value={form.name} onChange={(v) => set('name', v)} required />
                    <Field label={lang === 'EN' ? 'Company' : 'Perusahaan'} value={form.company} onChange={(v) => set('company', v)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label={lang === 'EN' ? 'Email' : 'Email'} type="email" value={form.email} onChange={(v) => set('email', v)} required />
                    <Field label={lang === 'EN' ? 'Phone' : 'Telepon'} type="tel" value={form.phone} onChange={(v) => set('phone', v)} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-display font-700 text-[#0B1628] mb-2">{lang === 'EN' ? 'Inquiry Type' : 'Jenis Pertanyaan'}</label>
                    <select
                      value={form.type}
                      onChange={(e) => set('type', e.target.value)}
                      className="w-full bg-[#F6F8FB] border border-[#DDE5EE] text-[#0B1628] px-5 py-4 rounded-xl text-[15px] focus:outline-none focus:border-[#4CB2E6] focus:ring-2 focus:ring-[#4CB2E6]/20 transition-all appearance-none"
                    >
                      <option value="">{lang === 'EN' ? 'Select type...' : 'Pilih jenis...'}</option>
                      {INQUIRY_TYPES[lang].map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-display font-700 text-[#0B1628] mb-2">{lang === 'EN' ? 'Message' : 'Pesan'}</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder={lang === 'EN' ? 'Tell us about your project...' : 'Ceritakan tentang proyek Anda...'}
                      className="w-full bg-[#F6F8FB] border border-[#DDE5EE] text-[#0B1628] placeholder-[#8491A1] px-5 py-4 rounded-xl text-[15px] focus:outline-none focus:border-[#4CB2E6] focus:ring-2 focus:ring-[#4CB2E6]/20 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#F7992E] text-white font-display font-700 text-[16px] hover:bg-[#e08820] transition-colors duration-200 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    {lang === 'EN' ? 'Send Inquiry' : 'Kirim Pertanyaan'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2">
              <div className="bg-[#07182D] rounded-2xl p-8 lg:p-10 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  <svg className="absolute -right-10 -bottom-10 w-[250px] h-[250px]" viewBox="0 0 250 250" fill="none">
                    <ellipse cx="160" cy="160" rx="120" ry="80" stroke="#4CB2E6" strokeWidth="1" transform="rotate(-20 160 160)" />
                  </svg>
                </div>
                <h3 className="font-display font-700 text-[18px] text-white mb-8 relative z-10">
                  {lang === 'EN' ? 'Contact Information' : 'Informasi Kontak'}
                </h3>
                <ul className="space-y-6 relative z-10">
                  {[
                    { icon: 'location', label: { EN: 'Address', ID: 'Alamat' }, val: 'Jakarta, Indonesia' },
                    { icon: 'email', label: { EN: 'Email', ID: 'Email' }, val: 'info@digitalmultisinergy.com' },
                    { icon: 'phone', label: { EN: 'Phone', ID: 'Telepon' }, val: '+62 21 XXXX XXXX' },
                    { icon: 'clock', label: { EN: 'Business Hours', ID: 'Jam Kerja' }, val: lang === 'EN' ? 'Mon–Fri, 09:00–17:00 WIB' : 'Sen–Jum, 09:00–17:00 WIB' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        {item.icon === 'location' && <svg className="w-4 h-4 text-[#4CB2E6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>}
                        {item.icon === 'email' && <svg className="w-4 h-4 text-[#4CB2E6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><path d="M22 6l-10 7L2 6"/></svg>}
                        {item.icon === 'phone' && <svg className="w-4 h-4 text-[#4CB2E6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
                        {item.icon === 'clock' && <svg className="w-4 h-4 text-[#4CB2E6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                      </div>
                      <div>
                        <div className="text-[11px] text-white/40 font-display font-600 uppercase tracking-wide mb-0.5">{item.label[lang]}</div>
                        <div className="text-[14px] text-white/80">{item.val}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-[180px] bg-[#EEF3F8] border border-[#DDE5EE] flex items-center justify-center">
                <div className="text-center text-[#8491A1]">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                  <p className="text-[12px]">{lang === 'EN' ? 'Map placeholder' : 'Placeholder peta'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Field({ label, type = 'text', value, onChange, required }: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="block text-[13px] font-display font-700 text-[#0B1628] mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-[#F6F8FB] border border-[#DDE5EE] text-[#0B1628] px-5 py-4 rounded-xl text-[15px] focus:outline-none focus:border-[#4CB2E6] focus:ring-2 focus:ring-[#4CB2E6]/20 transition-all"
      />
    </div>
  )
}
