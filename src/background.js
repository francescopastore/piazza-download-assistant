// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Hello from the background");

//   browser.tabs.executeScript({
//     file: "content-script.js",
//   });
// });

import store from "./store";

browser.runtime.onMessage.addListener(function (request) {
  console.log("Hello from the background");
  console.log(request);
  console.log(request.payload);
  store.commit("setError", "TESTTTTTTTTTT");
});
