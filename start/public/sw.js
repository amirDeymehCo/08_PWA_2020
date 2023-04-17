self.addEventListener("install", () => {
  console.log("service worker is install");
  self.skipWaiting();
});

self.addEventListener("activated", () => {
  console.log("service worker is activated");
});

self.addEventListener("fetch", () => {
  console.log("service worker is fetching ....");
});
