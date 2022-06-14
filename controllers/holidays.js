// sql
const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
// end sql

const getHolidays = (req, res) => {
  let sql = "select * from Holidays";
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createHoliday = (req, res) => {
  let sql = `INSERT INTO Holidays(text, start_date, end_date) 
      VALUES (?, ?, ?)`;

  sql = mysql.format(sql, [
    req.body.text,
    req.body.start_date,
    req.body.end_date,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.send(`New Holiday created ${rows.insertId}`);
  });
};

module.exports = {
  createHoliday,
  getHolidays,
};
