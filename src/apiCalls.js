const axios = require("axios");
const fs = require("fs");
const request = require("request");

const { postAPI, mediaAPI } = require("./constants");

const checkIfAvailable = async (url) => {
  const response = await axios.head(url);
  console.log("response.status: ", response.status);
  return response.status === 200;
};

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
  const postIsAvailable = await checkIfAvailable(`${postAPI}${page}`);
  console.log("postIsAvailable:", postIsAvailable);
  if (postIsAvailable) {
    const response = await get(`${postAPI}${page}`);
    return response.data[0];
  }
  return false;
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
