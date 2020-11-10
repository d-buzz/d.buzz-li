const { Router } = require("express");
const shorturlRouter = Router();
const { shortenUrl } = require("./../controllers/shorturl");
const ipMiddleware = require("../../middlewares/ipMiddleware");

shorturlRouter.post("/shorten", ipMiddleware, shortenUrl);
module.exports = shorturlRouter;
