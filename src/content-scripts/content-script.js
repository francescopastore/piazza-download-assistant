const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");

main();

async function main() {
  if (!isUrlValid()) {
    await browser.runtime.sendMessage({
      type: "ERROR",
      payload: "ERROR_NOT_VALID_URL",
    });
    return;
  }

  const cookie = await browser.runtime.sendMessage({
    type: "GET_COOKIE",
    payload: "",
  });

  const data = parsePage(cookie);

  await browser.runtime.sendMessage({
    type: "RESULT",
    payload: data,
  });
}

function isUrlValid() {
  const url = window.location.href;
  const regex = /https:\/\/piazza.com[a-z0-9.%:?#@=[/\]]*\/resources/g;
  return regex.test(url);
}

function parsePage(cookie) {
  const page = document.documentElement.outerHTML;
  const dom = htmlparser2.parseDocument(page);
  const $ = cheerio.load(dom);

  let data = [];

  $('[id^="resourceLink"]').each((_, e) => {
    const id = $(e).attr("id");
    const path = $(e).attr("href");
    const url = "https://piazza.com" + url;
    const section = $("#" + id)
      .closest('[id^="section_overview_"]')
      .find("h2")
      .first()
      .text();

    data.push({
      title: $(e).text(),
      path: path,
      section: section,
      type: readResourceType(url, cookie),
      url: url,
    });
  });

  return data;
}

function readResourceType(url, cookie) {
  var xhr = new XMLHttpRequest();
  let type = "";

  xhr.open("HEAD", url, true);
  xhr.setRequestHeader("Cookie", cookie);

  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      type = xhr.getResponseHeader("Content-Type");
      console.log(cookie);
    }
  };

  xhr.onerror = function () {
    console.log(xhr.statusText);
  };

  xhr.send(null);

  return type;
}
