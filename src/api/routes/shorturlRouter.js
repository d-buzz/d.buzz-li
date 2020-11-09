const { Router } = require('express')
const shorturlRouter = Router()
const {
     shortenUrl,
     getOrigUrl
} = require('./../controllers/shorturl');


shorturlRouter.get('/:url', getOrigUrl)
shorturlRouter.post('/shorten', shortenUrl)
module.exports = shorturlRouter;