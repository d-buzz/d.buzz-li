const express = require('express')
const api = express()
const { 
    shorturlRouter
} = require('./routes')

api.use('/',shorturlRouter)
module.exports = api