const _model = require("./model");

const _this = {
  build: () => {
    _model.table = "whitelisted_domains";
    return _model;
  },
  getAll: async (limit = 100, offset = 0) => {
    return await _this.build().get(limit, offset);
  },
  getAllActive: async () => {
    return await _this.build().where("is_active", 1).get();
  },
  insert: async (data) => {
    return await _this.build().set("domain", data["domain"]).insert();
  },
  updateDomain: async (id, domain) => {
    return await _this.build().set("domain",domain).update(id);
  },
  updateActiveStatus: async (id, status) => {
    return await _this.build().set("status",status).update(id);
  },
};

module.exports = _this;
