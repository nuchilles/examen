/* =====================================================================
   PENSACOLA POETS — SERVICE WORKER

   Purpose: the instrument must open on the tablet with no network.

   Two rules:
     • The page and its icons  — network first, cache as fall-back.
       This keeps the tool current when the tablet is online.
     • The 22 map plates       — cache first.
       They never change, so they are fetched once and kept.

   To publish a new version, raise VERSION by one. The old cache is
   then deleted on the next visit.
   ===================================================================== */

const VERSION = "poets-v1";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

const MAPS = Array.from({ length: 22 },
  (_, i) => `./map-images/pensa-poets-map${i + 1}.webp`);

/* Install — put the shell and every plate in the cache. */
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    /* Plates are added one at a time so a single failure cannot
       abort the whole install. */
    await Promise.all(MAPS.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

/* Activate — remove caches from earlier versions. */
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

/* Fetch — apply the two rules. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const isMap = req.url.includes("/map-images/");

  if (isMap){
    e.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      const c = await caches.open(VERSION);
      c.put(req, res.clone());
      return res;
    })());
    return;
  }

  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      const c = await caches.open(VERSION);
      c.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = await caches.match(req);
      if (hit) return hit;
      return caches.match("./index.html");
    }
  })());
});
