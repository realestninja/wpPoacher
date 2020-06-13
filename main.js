const { fetchData, fetchMediaUrl, performDownload } = require("./src/apiCalls");
const { processData } = require("./src/processData");

const main = async () => {
  const rawContent = await fetchData();
  const content = processData(rawContent);
  const featuredMediaId = content.featured_media;
  const mediaUrl = await fetchMediaUrl(featuredMediaId);

  console.log("featuredMediaId:", featuredMediaId);
  console.log("media:", mediaUrl);

  const file = "test.jpg";
  performDownload(mediaUrl, file, () => console.log("done!"));
};

main();
