// Service worker: makes Jeremy Clothing installable and usable offline.
// Bump VERSION whenever you change site files so users get the update.
const VERSION = "jc-v1";
const APP_SHELL = [
  "./",
  "index.html",
  "department.html",
  "details.html",
  "cart.html",
  "contact.html",
  "css/style.css",
  "js/data.js",
  "js/main.js",
  "manifest.webmanifest",
  "assets/img/charcoal-edit.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Videos use range requests; let the browser stream them normally.
  if (url.pathname.endsWith(".mp4")) return;

  // Pages: network first so content stays fresh, cached copy when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
    );
    return;
  }

  // Everything else (CSS, JS, product photos, fonts): cache first, then update in the background.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
