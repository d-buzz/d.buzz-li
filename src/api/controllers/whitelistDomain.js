const utils = require("./../../services/utils");
const { whitelistedDomainModel } = require("../../models");
const { Validator } = require("node-input-validator");

const getDomainList = async (req, res, next) => {
  const limit = req.params.limit || 50;
  const offset = req.params.offset || 0;
  let response = {
    data: null,
    message: "Data fetched successfully",
    code: 200,
  };
  try {
    const getList = await whitelistedDomainModel.getAll(limit, offset);
    if (!getList) {
      return res.json(
        utils.jsonResponse(response.data, "No data fetched", 400)
      );
    }
    response.data = getList;
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

const insertDomain = async (req, res, next) => {
  let { domain } = req.body;
  let response = {
    data: null,
    message: "Domain saved successfully",
    code: 200,
  };
  try {
    // input validation
    const v = new Validator(req.body, {
      domain: "required",
    });
    const matched = await v.check();
    if (!matched) {
      return res.json(
        utils.jsonResponse(response.data, v.errors.domain.message, 400)
      );
    }
    // get domain passed if it includes protocol (http/s)
    const getUrlDomain = utils.getUrlDomain(domain);
    if (getUrlDomain) {
      domain = getUrlDomain;
    }

    // check if domain is valid
    if (!utils.validateDomain(domain)) {
      return res.json(utils.jsonResponse(response.data, "Invalid domain", 400));
    }
    // check if domain is reachable
    const isReachable = await utils.checkIfDomainIsReachable(domain);
    if (!isReachable) {
      return res.json(
        utils.jsonResponse(response.data, "Domain is unreachable", 400)
      );
    }
    // check if domain exists in database
    const checkExistsDB = await whitelistedDomainModel.getByDomain(domain);
    if (checkExistsDB) {
      return res.json(
        utils.jsonResponse(response.data, "Domain already exists", 400)
      );
    }
    // save new domain
    const saveIt = await whitelistedDomainModel.insert({ domain });
    if (!saveIt) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to save domain", 400)
      );
    }
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

const updateDomain = async (req, res, next) => {
  const domain_id = req.body.domain_id;
  let domain = req.body.domain;
  let response = {
    data: null,
    message: "Domain updated successfully",
    code: 200,
  };
  try {
    // input validation
    const v = new Validator(req.body, {
      domain_id: "required|integer",
      domain: "required",
    });
    const matched = await v.check();
    if (!matched) {
      return res.json(utils.jsonResponse(response.data, v.errors, 400));
    }
    // check domain_id if exists
    const checkDomainId = await whitelistedDomainModel.findById(domain_id);
    if (!checkDomainId) {
      return res.json(
        utils.jsonResponse(
          response.data,
          "No records found for the domain ID",
          400
        )
      );
    }
    // get domain passed if it includes protocol (http/s)
    const getUrlDomain = utils.getUrlDomain(domain);
    if (getUrlDomain) {
      domain = getUrlDomain;
    }
    // check if domain name has no changes
    if (checkDomainId.domain === domain) {
      return res.json(utils.jsonResponse(response.data, "No changes has made"));
    }
    // check if domain is valid
    if (!utils.validateDomain(domain)) {
      return res.json(utils.jsonResponse(response.data, "Invalid domain", 400));
    }
    // check if domain is reachable
    const isReachable = await utils.checkIfDomainIsReachable(domain);
    if (!isReachable) {
      return res.json(
        utils.jsonResponse(response.data, "Domain is unreachable", 400)
      );
    }
    // check if domain exists in database
    const checkExistsDB = await whitelistedDomainModel.getByDomain(domain);
    if (checkExistsDB) {
      return res.json(
        utils.jsonResponse(response.data, "Domain already exists", 400)
      );
    }
    // update domain
    const updateIt = await whitelistedDomainModel.updateDomain(
      domain_id,
      domain
    );
    if (!updateIt) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to update domain", 400)
      );
    }
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

const updateActiveStatus = async (req, res, next) => {
  const { domain_id, status } = req.body;
  let response = {
    data: null,
    message: "Status updated successfully",
    code: 200,
  };
  try {
    // input validation
    const v = new Validator(req.body, {
      status: "required|integer",
      domain_id: "required|integer",
    });
    const matched = await v.check();
    if (!matched) {
      return res.json(utils.jsonResponse(response.data, v.errors, 400));
    }
    // check domain_id if exists
    const checkDomainId = await whitelistedDomainModel.findById(domain_id);
    if (!checkDomainId) {
      return res.json(
        utils.jsonResponse(
          response.data,
          "No records found for the domain ID",
          400
        )
      );
    }
    // update domain status
    const updateIt = await whitelistedDomainModel.updateActiveStatus(domain_id,parseInt(status))
    if(!updateIt){
      return res.json(
        utils.jsonResponse(
          response.data,
          "Failed to update domain status",
          400
        )
      );
    }
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

module.exports = {
  getDomainList,
  insertDomain,
  updateDomain,
  updateActiveStatus,
};
