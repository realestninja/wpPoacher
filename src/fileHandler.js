const fs = require("fs");

const { fetchMediaUrl, performDownload } = require("./apiCalls");

const createOutputFolder = (folderName = "") => {
  let outputFolderName = "./output";
  if (!fs.existsSync(outputFolderName)) fs.mkdirSync(outputFolderName);
  if (fs.existsSync(outputFolderName)) {
    outputFolderName += `/${folderName}`;
    if (!fs.existsSync(outputFolderName)) fs.mkdirSync(outputFolderName);
  }
};

const createFolderName = (content) => {
  const trimmedDate = content.date.slice(0, 10);
  return `${trimmedDate}_${content.slug}`;
};

const saveContent = async (content) => {
  const folderName = createFolderName(content);

  createOutputFolder(folderName);

  const featuredMediaId = content.featured_media;
  const mediaUrl = await fetchMediaUrl(featuredMediaId);
  const file = "test.jpg";
  performDownload(mediaUrl, file, () => console.log("done!"));
};

module.exports = { saveContent };
