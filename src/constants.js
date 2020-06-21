const { host } = require("../config");

const baseAPI = `${host}/wp-json/wp/v2/`;
const postAPI = `${baseAPI}posts/?per_page=1&page=`; // example: page=53
const mediaAPI = `${baseAPI}media/`;

module.exports = { postAPI, mediaAPI };
