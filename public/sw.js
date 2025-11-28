// Service Worker for Muqabala PWA
const CACHE_NAME = 'muqabala-v1'
const API_CACHE_NAME = 'muqabala-api-v1'

const STATIC_ASSETS = [
    '/muqabala.online/',
    '/muqabala.online/index.html',
    '/logo.svg',
    '/favicon.svg'
]

// Install event
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...')
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets')
            return cache.addAll(STATIC_ASSETS)
        })
    )
    self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...')
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
    self.clients.claim()
})

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // API requests - Network first, cache fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone and cache successful responses
                    if (response.ok) {
                        const responseClone = response.clone()
                        caches.open(API_CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone)
                        })
                    }
                    return response
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request)
                })
        )
        return
    }

    // Static assets - Cache first, network fallback
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse
            }

            return fetch(request).then((response) => {
                // Cache successful responses
                if (response.ok && request.method === 'GET') {
                    const responseClone = response.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone)
                    })
                }
                return response
            })
        })
    )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag)

    if (event.tag === 'sync-data') {
        event.waitUntil(syncData())
    }
})

async function syncData() {
    // Implement background sync logic here
    console.log('[SW] Syncing data...')
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('[SW] Push received:', event)

    const data = event.data ? event.data.json() : {}
    const title = data.title || 'Muqabala'
    const options = {
        body: data.body || 'Nouvelle notification',
        icon: '/favicon-192x192.png',
        badge: '/favicon-96x96.png',
        data: data.url || '/muqabala.online/'
    }

    event.waitUntil(
        self.registration.showNotification(title, options)
    )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked')
    event.notification.close()

    event.waitUntil(
        clients.openWindow(event.notification.data)
    )
})
