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
})()
