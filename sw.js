const C = "pais-v1";
const ARCHIVOS = ["./", "index.html", "manifest.json", "icon.svg",
  "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js"];
self.addEventListener("install", e => e.waitUntil(caches.open(C).then(c => c.addAll(ARCHIVOS))));
self.addEventListener("fetch", e => {
  if(e.request.url.includes("openfoodfacts") || e.request.url.includes("openbeautyfacts") || e.request.url.includes("openproductsfacts")) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
