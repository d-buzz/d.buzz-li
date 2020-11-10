const express = require('express')
const api = express()
const { 
    shorturlRouter,
    whitelistRouter
} = require('./routes')

api.use('/url',shorturlRouter)
api.use('/whitelist',whitelistRouter)
module.exports = api