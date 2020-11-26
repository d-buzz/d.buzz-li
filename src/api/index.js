const express = require('express')
const api = express()
const { 
    shorturlRouter,
    whitelistRouter,
    authRouter
} = require('./routes') 
const errorLogMiddleware = require("./../middlewares/errorLogMiddleware")

api.use('/auth', authRouter)
api.use('/url',shorturlRouter)
api.use('/whitelist', whitelistRouter)

api.use(errorLogMiddleware) // error logging
module.exports = api