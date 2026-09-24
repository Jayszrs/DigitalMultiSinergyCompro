(() => {
  const header = document.querySelector('[data-header]')
  const toggle = document.querySelector('[data-menu-toggle]')
  const menu = document.querySelector('[data-menu]')
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24)
  updateHeader()
  window.addEventListener('scroll', updateHeader, { passive: true })
  toggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(Boolean(open)))
    document.body.classList.toggle('menu-open', Boolean(open))
  })
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open'); document.body.classList.remove('menu-open'); toggle?.setAttribute('aria-expanded', 'false')
  }))
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('open')) toggle?.click()
  })
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger) return
  gsap.registerPlugin(ScrollTrigger)
  document.querySelectorAll('.reveal').forEach((element) => gsap.from(element, { opacity: 0, y: 34, duration: .72, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
  document.querySelectorAll('.stagger').forEach((element) => gsap.from(element.children, { opacity: 0, y: 28, duration: .62, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } }))
  document.querySelectorAll('[data-parallax]').forEach((element) => gsap.to(element, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top top', end: 'bottom top', scrub: true } }))
})()
