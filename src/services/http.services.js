const axios = require("axios");

export const baseUrl = "http://20.235.248.221:8080";

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
