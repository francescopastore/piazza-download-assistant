import store from "./store";

browser.runtime.onMessage
  .addListener(function (request) {
    console.log("Hello from the background");
    console.log(request);
    store.commit("setMessage", request);
  })
  .then(() => {})
  .catch((e) => console.error(e));

browser.pageAction.onClicked.addListener((tab) => {
  browser.pageAction.hide(tab.id);
});
