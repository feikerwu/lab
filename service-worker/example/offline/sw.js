console.log('self')

const imgReg = /\.(png|jpg|webp)/g

const cacheName = 'IMGS'
const urlsNeedToCache = [
  // './assets/placeholder.png',
]

self.addEventListener('install', e => {
  // 直接由新的sw文件接管
  self.skipWaiting()
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(urlsNeedToCache))
  )
})

self.addEventListener('fetch', (e) => {
  // 先从缓存中搜索内容
  e.respondWith(caches.match(e.request).then(response => {
    if (response) {
      return response
    }
    // request 是一个流，只能被消费一次
    let fetchRequest = e.request.clone()
    return fetch(fetchRequest).then(response => {
      // 只缓存正确的返回内容
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response
      }
      // 同理，response也只能被消费一次
      let fetchResponse = response.clone()
      caches.open(cacheName).then(cache => cache.put(fetchRequest, fetchResponse))
      return response
    })
  }))
})

