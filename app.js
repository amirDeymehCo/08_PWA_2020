const btnInstall = document.querySelector("#btn-install-app");
let eventPrompt = null;

btnInstall.addEventListener("click", () => {
  if (eventPrompt) {
    eventPrompt.prompt();
    eventPrompt.userChoice.then((select) => {
      if (select.outcome === "accepted") {
        console.log("application is installed");
      } else {
        console.log("not install");
      }
    });
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  eventPrompt = event;
  return false;
});

if ("serviceWorker" in navigator) {
  console.log(41545);
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        console.log("service worker is running!");
      })
      .catch(() => {
        console.log("service worker Error!");
      });
  });
}
