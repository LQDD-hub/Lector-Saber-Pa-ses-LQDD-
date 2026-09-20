const C = "pais-v3";
const ARCHIVOS = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(ARCHIVOS))); });
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
// Primero red (así siempre tienes la última versión); si no hay internet, caché
self.addEventListener("fetch", e => {
  const u = e.request.url;
  if(u.includes("openfoodfacts") || u.includes("openbeautyfacts") || u.includes("openproductsfacts")) return;
  e.respondWith(
    fetch(e.request).then(r => { const copia = r.clone(); caches.open(C).then(c => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request))
  );
});
