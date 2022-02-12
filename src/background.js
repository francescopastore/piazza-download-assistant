import store from "./store";

browser.runtime.onMessage
  .addListener((request, sender, sendResponse) => {
    mainListener(request, sender, sendResponse);
    return false;
  })
  .then(() => {})
  .catch((e) => console.error(e));

async function mainListener(request, sender, sendResponse) {
  if (!request.type || !request.payload) {
    return; // not my message
  }

  let cookie = "";
  switch (request.type) {
    case "GET_COOKIE":
      cookie = await readCookie(sender.url);
      console.log(cookie);
      sendResponse(cookie);
      break;
    case "RESULT":
      store.commit("setMessage", request);
      sendResponse();
      break;
  }
}

/**
 * readCookie of Piazza from the tab storage with the given url
 *
 * a Piazza cookie is like `piazza_session="<something>"; last_piaz_user="<something>"; session_id="<something>";`
 * @param {String} url
 * @returns the current user's Piazza cookie
 */
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
