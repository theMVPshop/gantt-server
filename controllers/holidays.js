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
  let sql = `INSERT INTO Holidays (start_date, text, end_date) 
      VALUES (?, ?, ?)`;

  console.log(req.body);
  sql = mysql.format(sql, [
    req.body.start_date,
    req.body.text,
    req.body.end_date,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.send(`New Holiday created ${rows.insertId}`);
  });
};

const deleteHoliday = (req, res) => {
  let sql = `DELETE FROM ?? WHERE ?? = ?`;
  sql = mysql.format(sql, ["Holidays", "Holidays.id", req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `deleted ${rows.affectedRows} Holiday with name ${req.body.text} and id ${req.params.id}`,
    });
  });
  console.log("deleteCohort");
};

module.exports = {
  createHoliday,
  getHolidays,
  deleteHoliday,
};
