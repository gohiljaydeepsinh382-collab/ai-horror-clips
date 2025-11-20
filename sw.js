const CACHE_NAME = "fx-cache-v1";
const ASSETS = [
  "/ai-horror-clips/",
  "/ai-horror-clips/index.html",
  "/ai-horror-clips/style.css",
  "/ai-horror-clips/script.js",
  "/ai-horror-clips/manifest.json",
  "/ai-horror-clips/icon192.png",
  "/ai-horror-clips/icon512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
