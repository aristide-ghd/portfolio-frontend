const CACHE_NAME = 'portfolio-static-v1';
const APP_SHELL = [
	'/',
	'/index.html',
	'/image.jpeg',
	'/cv.pdf'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => Promise.all(
			keys.map((key) => {
				if (key !== CACHE_NAME) return caches.delete(key);
				return null;
			})
		))
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	const req = event.request;
	// For navigation requests, try network first then cache fallback
	if (req.mode === 'navigate') {
		event.respondWith(
			fetch(req).catch(() => caches.match('/index.html'))
		);
		return;
	}

	// For other requests, try cache first then network
	event.respondWith(
		caches.match(req).then((cached) => cached || fetch(req).then((res) => {
			// Cache the new resource (clone the response)
			return caches.open(CACHE_NAME).then((cache) => {
				cache.put(req, res.clone()).catch(() => {});
				return res;
			});
		}).catch(() => {}))
	);
});
