const listPages = ["/", "/index.html", "/add.html"];

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

  caches.match(request).then((res) => {
    if (!res) {
      fetch(request).then((resFetch) => {
        console.log(resFetch);
        caches.open("static-1").then((cache) => {
          cache.put(request, resFetch);
        });
        return resFetch.clone();
      });
    } else {
      return res;
    }
  });
});
