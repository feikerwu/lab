console.log('self')

self.addEventListener('install', e => {
  console.log('installed', e)
})

const imgReg = /\.(png|jpg|webp)/g

self.addEventListener('fetch', e => {
  const { url } = e.request
  if (imgReg.test(url)) {
    e.respondWith(fetch('./assets/replace.png'))
  }
})