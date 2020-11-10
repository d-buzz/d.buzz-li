const { Router } = require("express");
const whitelistRouter = Router();
const {
  getDomainList,
  insertDomain,
  updateDomain,
  updateStatus,
} = require("./../controllers/whitelistDomain");

whitelistRouter.get("/list/:limit?/:offset?", getDomainList);
whitelistRouter.post("/add", insertDomain);
whitelistRouter.post("/update", updateDomain);
whitelistRouter.post("/activate", updateStatus);
whitelistRouter.post("/deactivate", updateStatus);
module.exports = whitelistRouter;
