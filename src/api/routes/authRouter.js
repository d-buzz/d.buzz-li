const { Router } = require("express");
const authRouter = Router();
const { login } = require("./../controllers/auth");

authRouter.post("/login", login);
module.exports = authRouter;
