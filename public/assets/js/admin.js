(() => {
  document.querySelectorAll('textarea').forEach((area) => {
    const resize = () => { area.style.height = 'auto'; area.style.height = `${Math.max(120, area.scrollHeight)}px` }
    area.addEventListener('input', resize)
  })
})()
