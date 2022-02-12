import store from "./store";

browser.runtime.onMessage
  .addListener((request, sender, sendResponse) => {
    mainListener(request, sender);
    sendResponse();
    return false;
  })
  .then(() => {})
  .catch((e) => console.error(e));

async function mainListener(request, sender) {
  if (!request.type || !request.payload) {
    return; // not my message
  }

  console.log(request);
  console.log(sender);

  await readCookie(sender.url);

  store.commit("setMessage", request);
}

async function readCookie(url) {
  const names = ["piazza_session", "last_piaz_user", "session_id"];
  let cookie = "";

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    let gettingCookies = browser.cookies.get({
      url: url,
      name: name,
    });

    const data = await gettingCookies;
    cookie += name.concat("=", data.value, "; ");
  }

  return cookie;
}
