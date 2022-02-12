main();

async function main() {
  if (!isUrlValid()) {
    await browser.runtime.sendMessage({
      type: "ERROR",
      payload: "ERROR_NOT_VALID_URL",
    });
    return;
  }
  await browser.runtime.sendMessage({
    type: "DONE",
    payload: "",
  });
}

function isUrlValid() {
  const url = window.location.href;
  const regex = /https:\/\/piazza.com[a-z0-9.%:?#@=[/\]]*\/resources/g;
  return regex.test(url);
}
