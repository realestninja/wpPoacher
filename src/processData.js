const Entities = require("html-entities").AllHtmlEntities;
const { parse } = require("node-html-parser");

const { omit } = require("./lib");
const { postParamsToBeDeleted } = require("../config");
const { getCategoryNames } = require("./apiCalls");

const entities = new Entities();

const pruneBody = (body) => {
  const root = parse(body);
  // console.log('root.querySelector("#photonic-google-stream-1"): ', root.querySelector("#photonic-google-stream-1").set_content(""));
  root.querySelector(".photonic-stream").removeAttribute("id");
  root.removeChild(root.querySelector(".photonic-stream"));

  // console.log("root:", root.querySelector(".photonic-stream").firstChild);
  console.log("root:", root);
  // console.log("root:", root.childNodes.length);
  return body;
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
