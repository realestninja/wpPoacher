const fs = require("fs");
const isNil = require("lodash/isNil");

const { fetchMediaUrl, performDownload } = require("./apiCalls");

const createOutputFolder = (outputPath, folderName) => {
  if (!folderName.length > 0) return false;
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
  if (fs.existsSync(outputPath)) {
    const contentFolder = `${outputPath}/${folderName}`;
    if (!fs.existsSync(outputPath)) fs.mkdirSync(contentFolder);
  }
  return true;
};

const createFolderName = (content) => {
  const trimmedDate = content.date.slice(0, 10);
  return `${trimmedDate}_${content.slug}`;
};

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const saveContent = async (content) => {
  const outputPath = "./output";
  const folderName = createFolderName(content);

  if (createOutputFolder(outputPath, folderName)) {
    const contentFolder = `${outputPath}/${folderName}`;

    storeData(content, `${contentFolder}/content.json`);

    const featuredMediaId = content.featured_media;
    if (!isNil(featuredMediaId)) {
      const mediaUrl = await fetchMediaUrl(featuredMediaId);
      performDownload(mediaUrl, `${contentFolder}/featuredImage.jpg`);
    }
  }
};

module.exports = { saveContent };
