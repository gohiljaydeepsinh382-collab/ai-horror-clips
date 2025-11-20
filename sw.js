// sw.js - simple cache-first service worker
const CACHE_NAME = 'ai-horror-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon192.png',
  '/icon512.png'
  // अगर और static assets हैं तो यहाँ add कर लो
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Cache first for same-origin requests
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(resp => {
          // store in cache only GET & same-origin (optional)
          if (event.request.method === 'GET' && resp && resp.type !== 'opaque') {
            const respClone = resp.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, respClone));
          }
          return resp;
        })
        .catch(() => {
          // fallback: you can serve a local offline page if you add one
          return caches.match('/index.html');
        });
    })
  );
});
