const axios = require("axios");
const { postAPI, mediaAPI } = require("./constants");

const get = async (url) => {
  let response = {};
  try {
    response = await axios.get(url);
  } catch (e) {
    console.error("e:", e);
  }
  return response;
};

const fetchData = async () => {
  const response = await get(postAPI);
  return response.data[0];
};

const fetchMediaUrl = async (id) => {
  const response = await get(`${mediaAPI}${id}`);
  return response.data.source_url;
};

module.exports = { fetchData, fetchMediaUrl };
