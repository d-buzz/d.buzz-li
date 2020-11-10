const { Router } = require("express");
const shorturlRouter = Router();
const { shortenUrl, getOrigUrl } = require("./../controllers/shorturl");
const ipMiddleware = require("../../middlewares/ipMiddleware");

shorturlRouter.get("/:keyword", getOrigUrl);
shorturlRouter.post("/shorten", ipMiddleware, shortenUrl);
module.exports = shorturlRouter;
