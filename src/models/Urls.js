const _model = require("./model");

const _this = {
  build: () => {
    _model.table = "urls";
    return _model;
  },
  getByUrl: async (url) => {
    return await _this.build().where("url", url).first();
  },
  getByKeyword: async (keyword) => {
    return await _this.build().where("keyword", keyword).first();
  },
  updateClicks: async (id, clicks) => {
    return await _this.build().set("clicks",clicks).update(id);
  },
  insert: async (data) => {
    return await _this
      .build()
      .set("keyword", data["keyword"])
      .set("url", data["url"])
      .set("title", data["title"])
      .set("ip", data["ip"])
      .set("clicks", data["clicks"])
      .insert();
  },
};

module.exports = _this;
