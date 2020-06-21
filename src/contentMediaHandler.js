const fs = require("fs");
const request = require("request");
const isNil = require("lodash/isNil");

const { fetchMediaUrl } = require("./apiCalls");
const { blogFolderPath, outputPath } = require("./constants");
const { processData } = require("./processData");

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

const performDownload = async (url, path) => {
  request(url)
    .pipe(fs.createWriteStream(path));
};

const saveMedia = async (contentFolder, content) => {
  const featuredMediaId = content.featured_media;
  if (!isNil(featuredMediaId)) {
    const mediaUrl = await fetchMediaUrl(featuredMediaId);
    if (mediaUrl) {
      await performDownload(mediaUrl, `${contentFolder}/featuredImage.jpg`);
    }
  }
};

const saveContent = (contentFolder, content) => {
  storeData(content, `${contentFolder}/content.json`);
};

const createFileStructure = (content) => {
  const folderName = createFolderName(content);
  return createOutputFolder(folderName) ? getFolderPath(folderName) : "";
};

const handleContent = (rawContent) => {
  const contentFolderPath = createFileStructure(rawContent);

  if (contentFolderPath.length > 0) {
    saveMedia(contentFolderPath, rawContent);
    saveContent(contentFolderPath, processData(rawContent));
  }
};

module.exports = { handleContent };
