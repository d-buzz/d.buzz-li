const shorturl = require('./shorturlRouter')
const whitelist = require('./whitelistDomRouter')
const auth = require('./authRouter')

module.exports = {
    shorturlRouter : shorturl,
    whitelistRouter : whitelist,
    authRouter: auth
}