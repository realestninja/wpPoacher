const { fetchMediaUrl, performDownload } = require("./apiCalls");

const createFolderName = (content) => {
  const trimmedDate = content.date.slice(0, 10);
  return `${trimmedDate}_${content.slug}`;
};

const saveContent = async (content) => {
  const folderName = createFolderName(content);
  console.log("folderName:", folderName);

  // to do: create folder, save `content` as json and also image into folder

  const featuredMediaId = content.featured_media;
  const mediaUrl = await fetchMediaUrl(featuredMediaId);
  const file = "test.jpg";
  performDownload(mediaUrl, file, () => console.log("done!"));
};

module.exports = { saveContent };
