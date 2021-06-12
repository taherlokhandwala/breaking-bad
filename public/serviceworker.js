const CACHE_NAME = "bbcharacters-v1";
const filesToCache = ["index.html", "offline.html"];

const self = this;

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(filesToCache))
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

this.addEventListener("activate", (event) => {
  const whiteList = [];
  whiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (!whiteList.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
