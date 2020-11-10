const utils = require("./../../services/utils")
const { whitelistedDomainModel } = require("../../models");

const getDomainList = async (req, res) => {
  const limit = req.params.limit || 50
  const offset = req.params.offset || 0
  let response = { data: null, message: 'Data fetched successfully', code: 200}
  try {
    const getList = await whitelistedDomainModel.getAll(limit,offset)
    if(!getList){
        return res.json(utils.jsonResponse(response.data, 'No data fetched', 400));
    }
    response.data = getList;
  } catch (error) {
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

const insertDomain = (req, res) => {};

const updateDomain = (req, res) => {};

const updateStatus = (req, res) => {};

module.exports = {
  getDomainList,
  insertDomain,
  updateDomain,
  updateStatus,
};
