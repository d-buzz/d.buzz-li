const logger = require("./../services/logger")
const appconfig = require("./../config/app")

module.exports = (err, req, res, next) => {
    if(appconfig.LOGGING === "true"){
        logger.error(err)
    }
    next()
}