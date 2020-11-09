const appconfig = require("../config/app");
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: appconfig.DATABASE.HOST,
  database: appconfig.DATABASE.NAME,
  user: appconfig.DATABASE.USER,
  password: appconfig.DATABASE.PASS,
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting to database: " + err.stack);
    return;
  }
});

const _this = {
  query: ($sql, $params = []) => {
    return new Promise((resolve,reject) => {
       con.promise()
        .query($sql, $params)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
        .then(() => con.end());
    });
  },
};
module.exports = _this;
