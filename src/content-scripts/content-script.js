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

  const data = parsePage();

  await browser.runtime.sendMessage({
    type: "DONE",
    payload: data,
  });
}

function isUrlValid() {
  const url = window.location.href;
  const regex = /https:\/\/piazza.com[a-z0-9.%:?#@=[/\]]*\/resources/g;
  return regex.test(url);
}

function parsePage() {
  const page = document.documentElement.outerHTML;
  const dom = htmlparser2.parseDocument(page);
  const $ = cheerio.load(dom);

  let data = [];

  $('[id^="resourceLink"]').each((_, e) => {
    const id = $(e).attr("id");
    const section = $("#" + id)
      .closest('[id^="section_overview_"]')
      .find("h2")
      .first()
      .text();

    data.push({
      title: $(e).text(),
      url: $(e).attr("href"),
      section: section,
    });
  });

  return data;
}
