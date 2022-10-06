const axios = require("axios");

export const baseUrl = "https://cp-digital-backend.herokuapp.com";

const getUrl = (path) => `${baseUrl}/${path}`;

export const callBackend = async (type, path, body = {}) => {
  try {
    const url = getUrl(path);
    let config = {
      method: type,
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: body,
    };
    const { data } = await axios(config);
    return data;
  } catch (error) {
    console.log(error);
  }
};
