(() => {
  // 苏州的时令: pick a month, see what is eaten then; opens on this month.
  const months = [...document.querySelectorAll('.shiling-months button')]
  const pick = btn => {
    months.forEach(b => b.setAttribute('aria-pressed', String(b === btn)))
    document.getElementById('shiling-month').textContent = btn.querySelector('.m').textContent
    document.getElementById('shiling-food').textContent = btn.querySelector('.f').textContent
    document.getElementById('shiling-note').textContent = btn.dataset.note
  }
  months.forEach(b => b.addEventListener('click', () => pick(b)))
  const now = months[new Date().getMonth()]
  if (now) pick(now)

  const season = document.getElementById('stage-season')
  if (season && now) {
    season.textContent = `${now.querySelector('.m').textContent}的时令：${now.querySelector('.f').textContent}`
  }

  // Hide the read counters if the counting service never answers.
  setTimeout(() => document.querySelectorAll('.stage-stats').forEach(s => {
    if (![...s.querySelectorAll('span[id^="vercount_"]')].every(v => /\d/.test(v.textContent))) s.hidden = true
  }), 8000)

  // The still half changes to the picture of the section that is passing the middle of the screen.
  const photos = document.querySelectorAll('.stage-photo[data-stage]')
  const sections = { hero: '#page-header', list: '#recent-posts', season: '.shiling', letter: '.stage-letter', close: '#footer' }
  if (photos.length > 1 && 'IntersectionObserver' in window) {
    const caption = document.getElementById('stage-caption')
    const show = key => photos.forEach(p => {
      const on = p.dataset.stage === key
      p.classList.toggle('is-current', on)
      if (on && caption) caption.textContent = p.dataset.caption
    })
    const watch = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) show(e.target.dataset.stageKey) })
    }, { rootMargin: '-45% 0px -45% 0px' })
    Object.entries(sections).forEach(([key, sel]) => {
      const el = document.querySelector(sel)
      if (!el) return
      el.dataset.stageKey = key
      watch.observe(el)
    })
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

  const groups = [
    '.stage-intro > *',
    '#recent-posts > .stage-heading, .recent-post-item',
    '.shiling > *',
    '.stage-letter > *',
    '#post-info > *',
    '#article-container > *',
    '#pagination',
    '#archive .article-sort-title, #archive .article-sort-item',
    '#footer .footer-other > *'
  ]
  const items = []
  groups.forEach(sel => document.querySelectorAll(sel).forEach(el => {
    el.classList.add('rise')
    items.push(el)
  }))
  if (!items.length) return

  document.documentElement.classList.add('js-rise')
  const io = new IntersectionObserver(entries => {
    entries.filter(e => e.isIntersecting).forEach((e, i) => {
      e.target.style.setProperty('--rise-delay', `${Math.min(i, 6) * 75}ms`)
      e.target.classList.add('is-in')
      io.unobserve(e.target)
    })
  }, { rootMargin: '0px 0px -8% 0px' })
  items.forEach(el => io.observe(el))
})()
