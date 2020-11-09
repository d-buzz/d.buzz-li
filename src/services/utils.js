const urlExist = require("url-exist");
const crypto = require("crypto");
const appconfig = require("../config/app");

const jsonResponse = (data, message, code = 200) => {
  return {
    data: data,
    message: message,
    code: code,
  };
};

const checkUrlExists = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checker = await urlExist(url);
      resolve(checker);
    } catch (error) {
      reject(error);
    }
  });
};

const generateKeyword = (url) => {
  let hash = createHash(url);
  console.log(hash)
  const len = hash.length;
  return hash.substr(
    len - parseInt(appconfig.URL_KEYWORD_LEN),
    len
  );
};

const createHash = (string) => {
  let hash = crypto.createHash("sha512", appconfig.HASH_SECRET);
  hash.update(string);
  return hash.digest("hex");
};

module.exports = {
  jsonResponse,
  checkUrlExists,
  generateKeyword,
};
