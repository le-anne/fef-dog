const CACHE = "favouriteImageCache";

self.addEventListener('install', async (event) => {
  const cache = await caches.open(CACHE);
  await cache.add("/");
  await cache.add("/script.js");
  await cache.add("/style.css");
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch (error) {
      const cache = await caches.open(CACHE);
      return await cache.match(event.request);
    }
  })());
});