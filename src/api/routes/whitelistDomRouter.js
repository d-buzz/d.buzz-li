const { Router } = require("express");
const whitelistRouter = Router();
const {
  getDomainList,
  insertDomain,
  updateDomain,
  updateActiveStatus,
} = require("./../controllers/whitelistDomain");
const authGuard = require("./../../middlewares/authGuard")

whitelistRouter.get("/list/:limit?/:offset?", getDomainList);
whitelistRouter.post("/add", authGuard, insertDomain);
whitelistRouter.post("/update", authGuard, updateDomain);
whitelistRouter.post("/status-update", authGuard, updateActiveStatus);
module.exports = whitelistRouter;
