const CACHE_NAME = "foodly-v1";
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Instalace Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache otevřen");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log("Chyba při cachování:", error);
      })
  );
});

// Aktivace Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Mazání starého cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch události - Cache First strategie
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Vrať z cache pokud je dostupné
      if (response) {
        return response;
      }

      // Jinak načti ze sítě
      return fetch(event.request).catch(() => {
        // Pokud je offline, vrať základní offline stránku
        if (event.request.destination === "document") {
          return caches.match("/");
        }
      });
    })
  );
});

// Push notifikace (volitelné)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nová objednávka je připravena!",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(self.registration.showNotification("Foodly", options));
});
