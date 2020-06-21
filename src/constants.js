const { host } = require("../config");

const baseAPI = `${host}/wp-json/wp/v2/`;
const postAPI = `${baseAPI}posts/?per_page=1&page=`; // example: page=53
const mediaAPI = `${baseAPI}media/`;

const blogFolderName = host.split("/")[2];
const outputPath = "./output";
const blogFolderPath = `${outputPath}/${blogFolderName}`;

module.exports = {
  postAPI, mediaAPI, outputPath, blogFolderPath,
};
