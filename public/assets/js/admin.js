(() => {
  const menuButton = document.querySelector('[data-admin-menu]')
  const sidebar = document.querySelector('[data-admin-sidebar]')
  const backdrop = document.querySelector('[data-admin-backdrop]')

  const setMenu = (open) => {
    sidebar?.classList.toggle('open', open)
    backdrop?.classList.toggle('open', open)
    document.body.classList.toggle('admin-menu-open', open)
    menuButton?.setAttribute('aria-expanded', String(open))
  }

  menuButton?.addEventListener('click', () => setMenu(!sidebar?.classList.contains('open')))
  backdrop?.addEventListener('click', () => setMenu(false))
  sidebar?.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false)
  })

  document.querySelectorAll('textarea').forEach((area) => {
    const resize = () => { area.style.height = 'auto'; area.style.height = `${Math.max(120, area.scrollHeight)}px` }
    area.addEventListener('input', resize)
    resize()
  })
})()
