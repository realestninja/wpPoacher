const Entities = require("html-entities").AllHtmlEntities;
const parse5 = require("parse5");
const utils = require("parse5-utils");

const { omit } = require("./lib");
const { postParamsToBeDeleted } = require("../config");
const { getCategoryNames } = require("./apiCalls");

const entities = new Entities();

const pruneBody = (body) => {
  const document = parse5.parse(body);

  // iterate body content -> search divs -> delete certain divs
  const htmlBody = document.childNodes[0].childNodes[1];
  htmlBody.childNodes.forEach((item) => {
    if (item.nodeName === "div") {
      item.attrs.forEach((attr) => {
        if (attr.value.includes(
          "photonic-stream"
          || "ngg-galleryoverview",
        )) utils.remove(item);
      });
    }
  });

  return utils.serialize(htmlBody);
};

const processData = async (data) => {
  let processedData = data;

  processedData.teaser = data.excerpt.rendered;
  delete processedData.excerpt;

  processedData.title = entities.decode(data.title.rendered);
  delete processedData.title.rendered;

  const decodedContent = pruneBody(entities.decode(data.content.rendered));
  processedData.content = decodedContent;
  delete processedData.content.rendered;

  delete processedData.content.protected;

  processedData = omit(postParamsToBeDeleted, data);

  const categoryNames = await getCategoryNames(processedData.categories);
  delete processedData.categories;
  processedData.categories = categoryNames;

  return processedData;
};

module.exports = { processData };
