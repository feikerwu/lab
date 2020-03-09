if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {scope: '.'}).then(reg => {
    console.log('sw register successfully', reg)
  }).catch(e => {
    console.log('sw register failed', e)
  })
}