// A unique name for the cache
const CACHE_NAME = 'macis-bakery-cache-v2'; // Updated version
// IMPORTANT: The path to your repository
const REPO_PATH = '/macis/';

// The files that will be cached for offline use
const urlsToCache = [
  REPO_PATH,
  `${REPO_PATH}index.html`,
  `${REPO_PATH}style.css`,
  `${REPO_PATH}script.js`,
  `${REPO_PATH}Products.json`,
  `${REPO_PATH}thank-you.html`,
  `${REPO_PATH}thank-you.css`,
  `${REPO_PATH}thank-you.js`,
  `${REPO_PATH}manifest.json`,
  // External assets
  'https://macis-leipzig.de/wp-content/uploads/2019/03/cropped-macis_Logo_Leipzig_Druck_4c-192x192.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Playfair+Display:wght@700&display=swap'
];

// Event listener for the 'install' event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event listener for the 'fetch' event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return the cached response
        if (response) {
          return response;
        }
        // Otherwise, fetch the request from the network
        return fetch(event.request);
      }
    )
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
