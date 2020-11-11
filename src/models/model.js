const _db = require("../config/database");

const _this = {
  table: "",
  params: [],
  _select_sql: "",
  _set_sql: "",

  DB: () => {
    return new _db();
  },

  raw: async ($sql, $params = []) => {
    let result = null;
    try {
      const [rows] = await _this.DB().query($sql, $params);
      result = rows;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  all: async () => {
    let result = null;
    try {
      const [rows] = await _this.DB().query(`SELECT * FROM ${_this.table}`);
      result = rows;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  where: (...$cond) => {
    if ($cond.length === 2) {
      if (_this._select_sql.indexOf("WHERE") < 0) {
        _this._select_sql += ` WHERE ${$cond[0]} = ?`;
      } else {
        _this._select_sql += ` AND ${$cond[0]} = ?`;
      }
      _this.params.push($cond[1]);
    } else if ($cond.length === 3) {
      if (_this._select_sql.indexOf("WHERE") < 0) {
        _this._select_sql += ` WHERE ${$cond[0]} ${$cond[1]} ?`;
      } else {
        _this._select_sql += ` AND ${$cond[0]} ${$cond[1]} ?`;
      }
      _this.params.push($cond[2]);
    }
    return _this;
  },

  set: ($col, $value) => {
    if (_this._set_sql.indexOf("SET") < 0) {
      _this._set_sql += ` SET ${$col} = ?`;
      _this.params.push($value);
    } else {
      _this._set_sql += `, ${$col} = ?`;
      _this.params.push($value);
    }
    return _this;
  },

  orderBy: ($col, $order = "ASC") => {
    _this._select_sql += ` ORDER BY ${$col} ${$order.toUpperCase()}`;
    return _this;
  },

  groupBy: ($col) => {
    _this._select_sql += ` GROUP BY ${$col}`;
    return _this;
  },

  get: async ($limit = 0, $offset = 0) => {
    let result = null;
    try {
      let sql = "SELECT * FROM " + _this.table + _this._select_sql;
      if ($limit > 0) {
        sql = sql + ` LIMIT ${$offset}, ${$limit}`;
      }
      const params = _this.params;
      _this._select_sql = "";
      _this.params = [];
      const [rows] = await _this.DB().query(sql, params);
      result = rows;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  find: async ($id, $id_column = "id") => {
    let result = null;
    try {
      const sql =
        "SELECT * FROM " +
        _this.table +
        ` WHERE ${$id_column} = ${$id} LIMIT 1`;
      const [rows] = await _this.DB().query(sql);
      result = rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  first: async () => {
    let result = null;
    try {
      const sql =
        "SELECT * FROM " + _this.table + _this._select_sql + " LIMIT 1";
      const params = _this.params;
      _this._select_sql = "";
      _this.params = [];
      const [rows] = await _this.DB().query(sql, params);
      result = rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  insert: async ($timestamp = true) => {
    let result = false;
    try {
      if ($timestamp) {
        _this.set("created_at", new Date()).set("updated_at", new Date());
      }
      const sql = "INSERT INTO " + _this.table + _this._set_sql;
      const params = _this.params;
      _this._set_sql = "";
      _this.params = [];
      const [rows] = await _this.DB().query(sql, params);
      result = rows.affectedRows > 0;
    } catch (error) {
      throw error.message;
    }
    return result;
  },

  update: async ($id, $id_column = "id", $timestamp = true) => {
    let result = false;
    try {
      if ($timestamp) {
        _this.set("updated_at", new Date());
      }
      let sql =
        "UPDATE " +
        _this.table +
        _this._set_sql +
        " WHERE " +
        $id_column +
        " = " +
        $id;
      const params = _this.params;
      _this._set_sql = "";
      _this.params = [];
      const [rows] = await _this.DB().query(sql, params);
      result = rows.affectedRows > 0;
    } catch (error) {
      throw error.message;
    }
    return result;
  },
  count: async () => {
    let result = 0;
    try {
      const sql =
        "SELECT COUNT(*) as count FROM " + _this.table + _this._select_sql;
      const params = _this.params;
      _this._select_sql = "";
      _this.params = [];
      const [rows] = await _this.DB().query(sql, params);
      result = rows.length > 0 ? rows[0].count : 0;
    } catch (error) {
      throw error.message;
    }
    return result;
  },
};

module.exports = _this;
