const axios = require("axios");

const { postAPI, mediaAPI, categoriesAPI } = require("./constants");

const checkIfAvailable = async (url) => {
  let isAvailable = true;
  await axios.head(url)
    .catch(() => {
      isAvailable = false;
    });
  return isAvailable;
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

const getCategoryNames = async (categoryIds) => {
  const categories = [];
  const promises = categoryIds.map(async (id) => {
    const response = await get(`${categoriesAPI}${id}`);
    const { name, slug } = response.data;
    categories.push({ name, slug });
  });

  await Promise.all(promises);
  return categories;
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

module.exports = { fetchData, fetchMediaUrl, getCategoryNames };
