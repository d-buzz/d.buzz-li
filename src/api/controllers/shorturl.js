const utils = require("../../services/utils");
const { Validator } = require("node-input-validator");
const { urlModel, whitelistedDomainModel } = require("../../models");
const appconfig = require("./../../config/app");

// Make url shorten
const shortenUrl = async (req, res) => {
  const { url } = req.body;
  let response = { data: null, message: "Success", code: 200 };
  try {
    // input validation
    const v = new Validator(req.body, {
      url: "required",
    });
    const matched = await v.check();
    if (!matched) {
      return res.json(
        utils.jsonResponse(response.data, v.errors.url.message, 400)
      );
    }
    // check if url exists / valid
    const validateUrl = await utils.checkUrlExists(url);
    if (!validateUrl) {
      return res.json(utils.jsonResponse(response.data, "Invalid url", 400));
    }
    // check if url exists in database
    const checkExistsDB = await urlModel.getByUrl(url);
    if (checkExistsDB) {
      response.data = {
        shortenedUrl: appconfig.URL_SHORT_DOMAIN + "/" + checkExistsDB.keyword,
      };
      return res.json(
        utils.jsonResponse(response.data, "Url already shortened")
      );
    }
    // check if url domain is blacklisted
    const whitelistedDomain = await whitelistedDomainModel.getAllActive();
    if (whitelistedDomain && whitelistedDomain.length > 0) {
      const domains = whitelistedDomain.map((x) => x.domain);
      const passedUrl =
        domains.filter((x) => utils.getUrlDomain(x) === utils.getUrlDomain(url))
          .length > 0;
      if (!passedUrl) {
        return res.json(
          utils.jsonResponse(response.data, "Blacklisted domain", 400)
        );
      }
    }
    // generate keyword
    const keyword = utils.generateKeyword(url);
    if (!keyword) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to generate url keyword", 400)
      );
    }
    // get url remote title
    const urlMetaTitle = await utils.getUrlRemoteTitle(url);
    // set data to store
    const dataToStore = {
      keyword,
      url,
      ip: req.ip,
      title: urlMetaTitle,
      clicks: 0,
    };
    // store shortened url
    const saveIt = await urlModel.insert(dataToStore);
    if (!saveIt) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to store shortened url", 400)
      );
    }
    // return shortened url
    response.data = {
      shortenedUrl: appconfig.URL_SHORT_DOMAIN + "/" + keyword,
    };
  } catch (error) {
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

// Get original url by keyword
const getOrigUrl = async (req, res) => {
  const { keyword } = req.params;
  let response = { data: null, message: "Success", code: 200 };
  try {
    // get long url by keyword
    const getUrl = await urlModel.getByKeyword(keyword);
    if (!getUrl) {
      return res.json(
        utils.jsonResponse(response.data, "Invalid keyword", 400)
      );
    }
    // update number of clicks
    let clicks = parseInt(getUrl.clicks) + 1;
    const updateClicks = await urlModel.updateClicks(getUrl.id, parseInt(clicks));
    if (!updateClicks) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to log clicks", 400)
      );
    }
    // return original url
    response.data = {
        origUrl : getUrl.url
    }
  } catch (error) {
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

module.exports = {
  shortenUrl,
  getOrigUrl,
};
