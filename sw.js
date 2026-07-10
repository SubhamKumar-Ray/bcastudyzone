const CACHE_NAME = 'bca-zone-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'CSS/style.css',
  'CSS/styles.css',
  'CSS/footer.css',
  'JS/script.js',
  'JS/dark.js',
  'JS/Sheet.js'
];

// Installation Matrix
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activation Layer
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Dynamic Offline Network Bypass Strategy
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(e.request).catch(() => {
        // Fallback strategy if network completely breaks down
        return caches.match('index.html');
      });
    })
  );
});