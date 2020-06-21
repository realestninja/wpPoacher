const axios = require("axios");

const { postAPI, mediaAPI } = require("./constants");

const checkIfAvailable = async (url) => {
  const response = await axios.head(url);
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
  if (postIsAvailable) {
    const response = await get(`${postAPI}${page}`);
    return response.data[0];
  }
  return false;
};

const fetchMediaUrl = async (id) => {
  const response = await get(`${mediaAPI}${id}`);
  return response ? response.data.source_url : false;
};

module.exports = { fetchData, fetchMediaUrl };
