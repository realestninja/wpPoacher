const Entities = require("html-entities").AllHtmlEntities;

const { omit } = require("./lib");
const { postParamsToBeDeleted } = require("../config");
const { getCategoryNames } = require("./apiCalls");

const entities = new Entities();

const processData = async (data) => {
  let processedData = data;

  processedData.teaser = data.excerpt.rendered;
  delete processedData.excerpt;

  processedData.title = entities.decode(data.title.rendered);
  delete processedData.title.rendered;

  processedData.content = entities.decode(data.content.rendered);
  delete processedData.content.rendered;

  delete processedData.content.protected;

  processedData = omit(postParamsToBeDeleted, data);

  const categoryNames = await getCategoryNames(processedData.categories);
  delete processedData.categories;
  processedData.categories = categoryNames;
  console.log("processedData:", processedData);

  return processedData;
};

module.exports = { processData };
