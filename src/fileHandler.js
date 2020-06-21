const fs = require("fs");
const isNil = require("lodash/isNil");

const { fetchMediaUrl, performDownload } = require("./apiCalls");
const { blogFolderPath, outputPath } = require("./constants");

const createOutputFolder = (folderName) => {
  if (!folderName.length > 0) return false;

  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);

  if (!fs.existsSync(blogFolderPath)) fs.mkdirSync(blogFolderPath);

  if (fs.existsSync(blogFolderPath)) {
    const contentFolder = `${blogFolderPath}/${folderName}`;
    if (!fs.existsSync(contentFolder)) fs.mkdirSync(contentFolder);
  }
  return true;
};

const createFolderName = (content) => {
  const trimmedDate = content.date.slice(0, 10);
  return `${trimmedDate}_${content.slug}`;
};

const getFolderPath = (folderName) => `${blogFolderPath}/${folderName}`;

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const saveContent = async (content) => {
  const folderName = createFolderName(content);

  if (createOutputFolder(folderName)) {
    const contentFolder = getFolderPath(folderName);

    storeData(content, `${contentFolder}/content.json`);

    const featuredMediaId = content.featured_media;
    if (!isNil(featuredMediaId)) {
      const mediaUrl = await fetchMediaUrl(featuredMediaId);
      performDownload(mediaUrl, `${contentFolder}/featuredImage.jpg`);
    }
  }
};

module.exports = { saveContent };
