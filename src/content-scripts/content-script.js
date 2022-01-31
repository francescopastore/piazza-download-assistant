const url = window.location.href;

if (url != "") {
  browser.runtime.sendMessage({
    type: "ERROR",
    payload: "BAD_URL",
  });
}
