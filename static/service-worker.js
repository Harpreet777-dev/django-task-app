const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/", // Home page
  "/static/css/styles.css", // CSS
  "/static/js/app.js", // JS
  "/static/images/logo.png", // Images
];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve from cache if possible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If a cached file exists, return it; otherwise, fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event: cleanup old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
