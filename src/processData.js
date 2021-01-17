const Entities = require("html-entities").AllHtmlEntities;
const parse5 = require("parse5");
const utils = require("parse5-utils");
const some = require("lodash/some");
const includes = require("lodash/includes");
const isNil = require("lodash/isNil");

const { omit } = require("./lib");
const { postParamsToBeDeleted, bodyDivsToBeDeleted, teaserImageSettings } = require("../config");
const { getCategoryNames, fetchMediaUrl } = require("./apiCalls");

const entities = new Entities();

const pruneBody = (body) => {
  const document = parse5.parse(body);

  // iterate body content -> search divs -> delete certain divs
  const htmlBody = document.childNodes[0].childNodes[1];
  htmlBody.childNodes.forEach((item) => {
    if (item.nodeName === "div") {
      item.attrs.forEach((attr) => {
        // this is buggy... has to be solved in a different way because outer forEach will fail
        if (some(bodyDivsToBeDeleted, (el) => includes(attr.value, el))) utils.remove(item);
      });
    }
  });
  // temporary second iteration
  htmlBody.childNodes.forEach((item) => {
    if (item.nodeName === "#comment") {
      utils.remove(item);
    }
  });

  return utils.serialize(htmlBody);
};

const processData = async (data) => {
  let processedData = data;

  processedData.teaser = data.excerpt.rendered;
  delete processedData.excerpt;

  if (teaserImageSettings.saveUrl && !isNil(data.featured_media)) {
    const mediaUrl = await fetchMediaUrl(data.featured_media);
    if (mediaUrl) processedData.teaserImageUrl = mediaUrl;
  }

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
