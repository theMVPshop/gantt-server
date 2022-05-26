require("dotenv").config();
const mysql = require("mysql");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        Host: process.env.DB_HOST,
        User: process.env.DB_USERNAME,
        Password: process.env.DB_PASSWORD,
        // was DB_DEFAULT_SCHEMA before
        Database: process.env.DB_DEFAULT_SCHEMA,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
