// service-worker.js

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  // 安装时，可以缓存一些资源，确保应用能够离线使用
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/offline.html', // 离线页面
      ]);
    })
  );
});

// 激活事件 - 清理旧的缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  // 清理过期的缓存
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'my-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求 - 返回缓存的资源或者从网络获取
self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果缓存中有这个请求，直接返回缓存的资源
      if (cachedResponse) {
        return cachedResponse;
      }
      // 否则从网络获取
      return fetch(event.request);
    })
  );
});
