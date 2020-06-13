const { omit } = require("./lib");

const processData = (data) => {
  let processedData = data;
  processedData.teaser = data.excerpt.rendered;
  const toBeDeleted = ["id", "guid", "date_gmt", "modified_gmt", "type", "excerpt", "author"];
  processedData = omit(toBeDeleted, data);
  return processedData;
};

module.exports = { processData };
