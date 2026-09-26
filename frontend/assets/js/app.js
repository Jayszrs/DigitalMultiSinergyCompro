(() => {
  const header = document.querySelector('[data-header]')
  const toggle = document.querySelector('[data-menu-toggle]')
  const menu = document.querySelector('[data-menu]')
  let headerFrame = 0

  const updateHeader = () => {
    headerFrame = 0
    header?.classList.toggle('scrolled', window.scrollY > 24)
  }

  const requestHeaderUpdate = () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateHeader)
  }

  updateHeader()
  window.addEventListener('scroll', requestHeaderUpdate, { passive: true })

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

  document.querySelectorAll('.home-hero, .page-hero').forEach((hero) => {
    if (hero.querySelector('.hero-wave')) return
    const wave = document.createElement('div')
    wave.className = 'hero-wave'
    wave.setAttribute('aria-hidden', 'true')
    wave.innerHTML = '<svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path class="wave-line wave-line-back" d="M0 62C211 109 358 8 598 52s365 74 842 12"/><path class="wave-line" d="M0 88c235-64 373 32 630-5s410-16 810 8"/><path class="wave-fill" d="M0 91c235-64 373 32 630-5s410-16 810 8v26H0z"/></svg>'
    hero.append(wave)
  })

  document.querySelectorAll('.section:not(.dark)').forEach((section) => {
    if (section.querySelector('.section-flow')) return
    const flow = document.createElement('span')
    flow.className = 'section-flow'
    flow.setAttribute('aria-hidden', 'true')
    section.append(flow)
  })

  const revealGroups = [
    ...document.querySelectorAll('.reveal'),
    ...Array.from(document.querySelectorAll('.stagger')).flatMap((group) => [...group.children]),
  ]
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion || !window.gsap) {
    revealGroups.forEach((element) => {
      element.style.opacity = '1'
      element.style.transform = 'none'
    })
    return
  }

  const reveal = (element, delay = 0) => {
    if (element.dataset.revealed === 'true') return
    element.dataset.revealed = 'true'
    window.gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: .62,
      delay,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    })
  }

  window.gsap.set(revealGroups, { opacity: 1, y: 26 })

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const siblings = entry.target.parentElement?.classList.contains('stagger')
          ? [...entry.target.parentElement.children]
          : [entry.target]
        siblings.forEach((element, index) => reveal(element, Math.min(index * .055, .28)))
        siblings.forEach((element) => observer.unobserve(element))
      })
    }, { rootMargin: '0px 0px 10% 0px', threshold: .05 })

    revealGroups.forEach((element) => observer.observe(element))
    window.setTimeout(() => revealGroups.forEach((element) => reveal(element)), 1400)
  } else {
    revealGroups.forEach((element) => reveal(element))
  }

  document.querySelectorAll('.section:not(.dark)').forEach((section, index) => {
    if (index % 2 !== 0) return
    const orbit = document.createElement('span')
    orbit.className = 'section-orbit'
    orbit.setAttribute('aria-hidden', 'true')
    section.append(orbit)
  })

  if (!window.ScrollTrigger || innerWidth < 820) return

  window.gsap.registerPlugin(window.ScrollTrigger)
  const parallaxDefaults = { ease: 'none', force3D: true }

  document.querySelectorAll('[data-parallax]').forEach((element) => {
    window.gsap.fromTo(element, { yPercent: -3, scale: 1.045 }, {
      ...parallaxDefaults,
      yPercent: 7,
      scale: 1.045,
      scrollTrigger: { trigger: element.parentElement, start: 'top top', end: 'bottom top', scrub: .65 },
    })
  })

  document.querySelectorAll('.hero-orbits, .section-orbit, .cta-logo-mark').forEach((element) => {
    window.gsap.fromTo(element, { yPercent: -8 }, {
      ...parallaxDefaults,
      yPercent: 16,
      scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: .8 },
    })
  })

  document.querySelectorAll('.parallax-image').forEach((frame) => {
    const image = frame.querySelector('img')
    if (!image) return
    window.gsap.fromTo(image, { yPercent: -3, scale: 1.07 }, {
      ...parallaxDefaults,
      yPercent: 3,
      scale: 1.07,
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .7 },
    })
  })

  window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true })
})()
