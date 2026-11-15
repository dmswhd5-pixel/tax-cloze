// 세법 빈칸 훈련 · 오프라인 저장 장치
// 앱 파일은 휴대폰에 저장해 두고, 인터넷이 되면 최신 파일로 바꿔 둔다(네트워크 우선, 실패 시 저장본).
const VERSION = "taxcloze-v1";
const CORE = [
  "./", "index.html", "manifest.webmanifest",
  "data/subjects.js", "data/pairs.js", "data/gukgi.js", "data/gukjing.js", "data/sodeuk.js", "data/beobin.js", "data/bugase.js", "data/sangjeung.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-64.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k.startsWith("taxcloze-")).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // 글꼴: 한 번 받으면 저장본 사용
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION + "-fonts").then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      const res = await fetch(req); if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  // 앱 파일: 네트워크 우선(4초), 안 되면 저장본
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    try {
      const res = await Promise.race([fetch(req), timeout(4000)]);
      if (res && res.ok) c.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await c.match("index.html") : null);
      if (hit) return hit;
      throw err;
    }
  })());
});
