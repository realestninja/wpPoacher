const Entities = require("html-entities").AllHtmlEntities;

const { omit } = require("./lib");
const { postParamsToBeDeleted } = require("../config");

const entities = new Entities();

const processData = (data) => {
  let processedData = data;

  processedData.teaser = data.excerpt.rendered;
  delete processedData.excerpt;

  processedData.title = entities.decode(data.title.rendered);
  delete processedData.title.rendered;

  processedData.content = data.content.rendered;
  delete processedData.content.rendered;

  delete processedData.content.protected;

  processedData = omit(postParamsToBeDeleted, data);
  return processedData;
};

module.exports = { processData };
