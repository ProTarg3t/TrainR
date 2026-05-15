// Bump VERSION in zowel www/index.html als www/sw.js bij elke release.
// Doordat sw.js byte-verandert, detecteert Chrome de nieuwe SW en triggert
// updatefound → SKIP_WAITING → controllerchange → automatische reload.
const VERSION = '0.3';
const CACHE_NAME = 'trainr-v' + VERSION;
const STATIC_FILES = ['./manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e =>
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(STATIC_FILES)).then(() => self.skipWaiting())
  )
);

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
);

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // index.html altijd netwerk-first: deploy = direct live, fallback naar cache bij offline
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => { caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone())); return res; })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Alles overige: cache-first
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
