const axios = require("axios");
const fs = require("fs");
const request = require("request");

const { postAPI, mediaAPI } = require("./constants");

const get = async (url) => {
  let response = {};
  try {
    response = await axios.get(url);
  } catch (e) {
    // console.error("e:", e);
    return false;
  }
  return response;
};

const fetchData = async (page) => {
  const response = await get(`${postAPI}${page}`);
  return response ? response.data[0] : response;
};

const fetchMediaUrl = async (id) => {
  const response = await get(`${mediaAPI}${id}`);
  return response.data.source_url;
};

const performDownload = (url, path) => {
  request(url)
    .pipe(fs.createWriteStream(path));
};

module.exports = { fetchData, fetchMediaUrl, performDownload };
