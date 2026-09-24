export default function Preloader({ loaded }: { loaded: boolean }) {
  return (
    <div id="preloader" className={loaded ? 'hidden' : ''}>
      <div className="flex flex-col items-center gap-5">
        {/* DMS orbit logo animated */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="animate-spin" style={{ animationDuration: '2s' }}>
          <ellipse cx="32" cy="32" rx="28" ry="18" stroke="#4CB2E6" strokeWidth="2" transform="rotate(-30 32 32)" strokeDasharray="8 4" />
          <ellipse cx="32" cy="32" rx="20" ry="12" stroke="#284C98" strokeWidth="1.5" transform="rotate(40 32 32)" strokeDasharray="6 4" />
          <circle cx="32" cy="32" r="7" fill="#284C98" />
          <circle cx="48" cy="18" r="4" fill="#F7992E" />
        </svg>
        <span className="font-display font-700 text-white text-[14px] tracking-[0.3em] uppercase opacity-60">
          Digital Multi Sinergy
        </span>
      </div>
    </div>
  )
}
