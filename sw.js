const listPages = [
  "/",
  "/index.html",
  "/add.html",
  "/assets/images/icons/icon-512x512.png",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  console.log("service worker is install");

  event.waitUntil(
    caches.open("statics-1").then((cache) => {
      cache.addAll(listPages);
    })
  );
});

self.addEventListener("activated", () => {
  console.log("service worker is activated");
});

self.addEventListener("fetch", (event) => {
  console.log("service worker is fetching ....");
  const request = event.request;

  event.respondWith(
    caches.match(request).then((res) => {
      console.log(request);

      return (
        res ||
        fetch(request)
          .then((resFetch) => {
            caches.open("static-1").then((cache) => {
              cache.put(request, resFetch);
            });
            return resFetch.clone();
          })
          .catch(() => {
            console.log("offline mode");
            return caches.open("statics-1").then((cache) => {
              let regexImage =
                /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

              if (request.headers.accept.includes("text/html")) {
                return cache.match("/offline.html");
              }
              if (request.url.match(regexImage)) {
                return cache.match("/assets/images/icons/icon-512x512.png");
              }
            });
          })
      );
    })
  );
});
