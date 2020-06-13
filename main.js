const { fetchData, fetchMediaUrl } = require("./src/apiCalls");

const omit = (keys, obj) => Object.fromEntries(
  Object.entries(obj)
    .filter(([k]) => !keys.includes(k)),
);

const processData = (data) => {
  let processedData = data;
  processedData.teaser = data.excerpt.rendered;
  const toBeDeleted = ["id", "guid", "date_gmt", "modified_gmt", "type", "excerpt", "author"];
  processedData = omit(toBeDeleted, data);
  return processedData;
};

const main = async () => {
  const rawContent = await fetchData();
  const content = processData(rawContent);
  const featuredMediaId = content.featured_media;
  const mediaUrl = await fetchMediaUrl(featuredMediaId);
  console.log("featuredMediaId:", featuredMediaId);
  console.log("media:", mediaUrl);
};

main();
