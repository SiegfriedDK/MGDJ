const CACHE_NAME = 'muga-tabata-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sounds/Bip_sound.mp3',
  './icons/apple-touch-icon.png',
  './icons/icon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Erreur lors de la mise en cache:', err))
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de fetch : Cache first, network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          console.log('Ressource en cache:', request.url);
          return response;
        }
        
        // Si pas en cache, essayer le réseau
        return fetch(request)
          .then(response => {
            // Ne pas cacher les réponses non-valides
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // Cloner et cacher la réponse valide
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(err => {
            console.log('Erreur fetch + pas en cache:', request.url, err);
            // Retourner une réponse offline si disponible
            return caches.match('./index.html');
          });
      })
  );
});

// Gérer les mises à jour du cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
