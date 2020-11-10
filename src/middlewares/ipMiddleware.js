const utils = require('./../services/utils')

module.exports = (req, res, next) => {
    const ip = utils.getRequestIp(req)
    req.ip = ip;
    next()
}