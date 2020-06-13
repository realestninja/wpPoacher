const axios = require("axios");
const { postAPI, mediaAPI } = require("./constants");

const fetchData = async () => {
  const response = await axios.get(postAPI);
  return response.data[0];
};

const fetchMedia = async (id) => {
  const response = await axios.get(`${mediaAPI}${id}`);
  return response.data.source_url;
};

module.exports = { fetchData, fetchMedia };
