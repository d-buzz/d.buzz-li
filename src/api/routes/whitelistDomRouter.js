const { Router } = require("express");
const whitelistRouter = Router();
const {
  getDomainList,
  insertDomain,
  updateDomain,
  updateActiveStatus,
} = require("./../controllers/whitelistDomain");

whitelistRouter.get("/list/:limit?/:offset?", getDomainList);
whitelistRouter.post("/add", insertDomain);
whitelistRouter.post("/update", updateDomain);
whitelistRouter.post("/status-update", updateActiveStatus);
module.exports = whitelistRouter;
