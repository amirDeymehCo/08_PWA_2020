const btnInstall = document.querySelector("#btn-install-app");
let eventPrompt = null;

btnInstall.addEventListener("click", () => {
  console.log("eventPrompt -------");
  console.log(eventPrompt);
  if (eventPrompt) {
    eventPrompt.prompt();
    eventPrompt.userChoice.then((select) => {
      console.log("select ---------");
      console.log(select);
      // if(select)
    });
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("ajdiuash dusahf ");
  event.preventDefault();
  eventPrompt = event;
  return false;
});

if ("serviceWorker" in navigator) {
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
