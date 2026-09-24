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
    menu.classList.remove('open')
    document.body.classList.remove('menu-open')
    toggle?.setAttribute('aria-expanded', 'false')
  }))

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('open')) toggle?.click()
  })

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return

  gsap.registerPlugin(ScrollTrigger)

  document.querySelectorAll('.section:not(.dark)').forEach((section, index) => {
    if (index % 2 !== 0) return
    const orbit = document.createElement('span')
    orbit.className = 'section-orbit'
    orbit.setAttribute('aria-hidden', 'true')
    section.append(orbit)
    gsap.fromTo(orbit, { yPercent: -18, rotate: -12 }, {
      yPercent: 34,
      rotate: 22,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    })
  })

  document.querySelectorAll('.reveal').forEach((element) => gsap.from(element, {
    opacity: 0,
    y: 34,
    duration: .72,
    ease: 'power3.out',
    scrollTrigger: { trigger: element, start: 'top 88%', once: true },
  }))

  document.querySelectorAll('.stagger').forEach((element) => gsap.from(element.children, {
    opacity: 0,
    y: 28,
    duration: .62,
    stagger: .08,
    ease: 'power3.out',
    scrollTrigger: { trigger: element, start: 'top 88%', once: true },
  }))

  document.querySelectorAll('[data-parallax]').forEach((element) => gsap.to(element, {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: { trigger: element.parentElement, start: 'top top', end: 'bottom top', scrub: 1 },
  }))

  document.querySelectorAll('.page-hero').forEach((hero) => gsap.fromTo(hero, {
    backgroundPosition: '50% 35%',
  }, {
    backgroundPosition: '50% 68%',
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
  }))

  document.querySelectorAll('.parallax-image').forEach((frame) => {
    const image = frame.querySelector('img')
    if (!image) return
    gsap.fromTo(image, { yPercent: -5, scale: 1.1 }, {
      yPercent: 5,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  })

  const ctaMark = document.querySelector('.cta-logo-mark')
  if (ctaMark) gsap.to(ctaMark, {
    yPercent: -24,
    rotate: 14,
    ease: 'none',
    scrollTrigger: { trigger: ctaMark.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
  })
})()
