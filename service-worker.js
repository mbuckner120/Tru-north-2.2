const CACHE_NAME = 'truenorth-v2-2-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './request.html',
  './donate.html',
  './dashboard.html',
  './assets/style.css',
  './assets/app.js',
  './assets/db.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});