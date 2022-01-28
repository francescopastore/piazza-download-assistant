// browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("Hello from the background");

//   browser.tabs.executeScript({
//     file: "content-script.js",
//   });
// });

browser.runtime.onMessage.addListener(function () {
  console.log("Hello from the background");
  browser.tabs.executeScript({
    file: "content-script.js",
  });
});
