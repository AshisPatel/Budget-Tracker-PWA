const FILES_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/index.js',
    './js/idb.js'
];

const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// service worker's load prior to the window object, so event listeners will be called on 'self' or the service worker

// install service worker and add files to the cache storage
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log(`Installing cache: ${CACHE_NAME}`);
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// activate service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            console.log({keyList});
            let cacheKeepList = keyList.filter(key => key.indexOf(APP_PREFIX))
            console.log({cacheKeepList});
            cacheKeepList.push(CACHE_NAME)

            return Promise.all(
                keyList.map((key,i) => {
                    if(cacheKeepList.indexOf(key) === -1) {
                        console.log(`deleting cache : ${keyList[i]}`);
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    console.log(`fetch request : ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then(request => {
            if (request) {
                console.log(`responding with cache : ${event.request.url}`);
                return request;
            } else {
                console.log(`file is not cached, fetching : ${event.request.url}`);
                return fetch(event.request); 
            }
        })
    )
})