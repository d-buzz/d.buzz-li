const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const api = require("./api");
const { appconfig } = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    message: "Dbuzz url-shortener service is online",
    status: 200,
  });
});

app.use('/',api);

app.listen(appconfig.PORT, () => {
  console.log(`App listening at ${appconfig.HOST}:${appconfig.PORT}`);
});
