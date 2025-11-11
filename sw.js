const CACHE_NAME = 'talk-tea-cache-v2'; // Versão do cache atualizada
// Adiciona todos os arquivos locais que compõem o "app shell" e dependências críticas de CDN
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
  'https://cdn.tailwindcss.com'
];

// Evento de instalação: armazena o app shell em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de ativação: remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Evento de fetch: serve do cache, com fallback para a rede
self.addEventListener('fetch', (event) => {
  // Apenas lida com requisições GET para nossa estratégia de cache
  if (event.request.method !== 'GET') {
      return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});