/* ============================================================
   Muga Dojo – Tabata Timer  |  Service Worker
   Stratégie : Cache-first pour les assets statiques,
               Network-first pour l'index.html.
   ============================================================ */

const CACHE_NAME = 'muga-tabata-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* ── Installation : mise en cache de tous les assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ── Activation : purge des anciens caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch : cache-first, fallback réseau ── */
self.addEventListener('fetch', event => {
  // Ne pas intercepter les requêtes non-GET (ex. micro/audio)
  if (event.request.method !== 'GET') return;

  // Pour index.html → network-first (mise à jour automatique)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Pour tous les autres assets → cache-first
  event.respondWith(
    caches.match(event.request).then(
      cached => cached || fetch(event.request).then(response => {
        // Ne mettre en cache que les réponses valides
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
    )
  );
});
