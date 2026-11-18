// Waline comments under each post. Set SERVER_URL to the Vercel deployment, e.g. 'https://waline-xxx.vercel.app'.
const SERVER_URL = 'https://cmts.cfzhubao.top'

const section = document.getElementById('comments')

if (section && SERVER_URL) {
  section.hidden = false
  // One thread per post whether it was opened as /slug/ or /slug/index.html.
  const path = location.pathname.replace(/index\.html$/, '')

  Promise.all([
    import('https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.js'),
    window.btf.getCSS('https://cdn.jsdelivr.net/npm/@waline/client@v3/dist/waline.css')
  ]).then(([{ init }]) => {
    init({
      el: '#waline',
      serverURL: SERVER_URL,
      path,
      lang: 'zh-CN',
      dark: false,
      meta: ['nick', 'mail', 'link'],
      requiredMeta: [],
      login: 'enable',
      wordLimit: 1000,
      pageSize: 10,
      imageUploader: false,
      search: false,
      reaction: false,
      emoji: ['https://cdn.jsdelivr.net/npm/@waline/emojis@1.2.0/weibo'],
      locale: {
        placeholder: '说点什么吧。昵称、邮箱都可以不填。'
      }
    })
  }).catch(() => {
    section.hidden = true
  })
}
