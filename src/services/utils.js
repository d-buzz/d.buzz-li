const urlExist = require("url-exist");
const crypto = require("crypto");
const _url = require("url");
const appconfig = require("../config/app");
const requestIp = require("@supercharge/request-ip");
const urlMetadata = require("url-metadata");
const isValidDomain = require('is-valid-domain')
const isReachable = require('is-reachable');

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
  const len = hash.length;
  return hash.substr(len - parseInt(appconfig.URL_KEYWORD_LEN), len);
};

const getUrlDomain = (url) => {
  const myurl = _url.parse(url);
  return myurl.host;
};

const getRequestIp = (request) => {
  return requestIp.getClientIp(request);
};

const getUrlMetadata = (url) => {
  return new Promise(function (resolve, reject) {
    try {
      urlMetadata(url).then(
        (metadata) => {
          resolve(metadata);
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error)
    }
  });
};

const getUrlRemoteTitle = async (url) => {
  let title = '';
  const metadata = await getUrlMetadata(url)
  if(metadata && metadata.hasOwnProperty('title')){
    title = metadata.title
  }
  return title;
}

const validateDomain = (domain) => {
  return isValidDomain(domain);
}

const checkIfDomainIsReachable = async (domain) => {
  return await isReachable(domain);
}

const createHash = (string) => {
  let hash = crypto.createHash("sha512", appconfig.HASH_SECRET);
  hash.update(string);
  return hash.digest("hex");
};

module.exports = {
  jsonResponse,
  checkUrlExists,
  generateKeyword,
  getUrlDomain,
  getUrlMetadata,
  getUrlRemoteTitle,
  getRequestIp,
  validateDomain,
  checkIfDomainIsReachable
};
