const { omit } = require("./lib");
const { postParamsToBeDeleted } = require("../config");

const processData = (data) => {
  let processedData = data;
  processedData.teaser = data.excerpt.rendered;
  processedData = omit(postParamsToBeDeleted, data);
  return processedData;
};

module.exports = { processData };
