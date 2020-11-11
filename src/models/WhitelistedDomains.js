const _model = require("./model");

const _this = {
  build: () => {
    _model.table = "whitelisted_domains";
    return _model;
  },
  findById: async (id) => {
    return await _this.build().find(id)
  },
  getAll: async (limit = 100, offset = 0) => {
    return await _this.build().orderBy("domain").get(limit, offset);
  },
  getAllActive: async () => {
    return await _this.build().where("is_active", 1).get();
  },
  getByDomain: async (domain) => {
    return await _this.build().where("domain", domain).first();
  },
  insert: async (data) => {
    return await _this.build().set("domain", data["domain"]).insert();
  },
  updateDomain: async (id, domain) => {
    return await _this.build().set("domain",domain).update(id);
  },
  updateActiveStatus: async (id, status) => {
    return await _this.build().set("is_active",status).update(id);
  },
};

module.exports = _this;
