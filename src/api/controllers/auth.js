const utils = require("../../services/utils");
const { Validator } = require("node-input-validator");
const appConfig = require("./../../config/app")

const login = async (req, res, next) => {
  let response = {
    data: null,
    message: "Authenticated successfully",
    code: 200,
  };

  try {
    const v = new Validator(req.body, {
      username: "required",
      password: "required",
    });
    const matched = await v.check();
    if (!matched) {
      const errKeys = Object.keys(v.errors)
      return res.json(utils.jsonResponse(response.data, v.errors[errKeys[0]], 400));
    }
    const { username, password } = req.body; 
    if(username !== appConfig.ADMIN.USER 
        || password !== appConfig.ADMIN.PASS){
        return res.json(utils.jsonResponse(response.data,'Invalid credentials', 400));
    }

    const token = utils.jwtSign({ username })
    response.data = { token }
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

module.exports = {
  login,
};
