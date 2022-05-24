// sql
const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
// end sql

const getAllCohorts = (req, res) => {
  pool.query(`SELECT * FROM Cohorts`, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
  console.log("getAllCohorts");
};

const getCohort = (req, res) => {
  let sql = `SELECT * FROM Cohorts WHERE Cohorts.Cohort_id = ?`;
  sql = mysql.format(sql, [req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (!rows.length)
      return res.status(404).send(`cohort not found with id ${req.params.id}`);
    return res.json(rows);
  });
  console.log("getCohort");
};

const createCohort = (req, res) => {
  let sql = `INSERT INTO Cohorts(cohort_name, start_date, end_date) 
    VALUES (?, ?, ?)`;

  sql = mysql.format(sql, [
    req.body.cohort_name,
    req.body.start_date,
    req.body.end_date,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.send(`New cohort created with id ${rows.insertId}`);
  });
  console.log("createCohort");
};

const updateCohort = (req, res) => {
  let sql = `UPDATE Cohorts SET cohort_name = ?, start_date = ?, end_date= ? WHERE Cohorts.cohort_id = ?`;
  sql = mysql.format(sql, [
    req.body.cohort_name,
    req.body.start_date,
    req.body.end_date,
    req.params.id,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json(rows);
  });
  console.log("updateCohort");
};

const deleteCohort = (req, res) => {
  let sql = `DELETE FROM ?? WHERE ?? = ?`;
  sql = mysql.format(sql, ["Cohorts", "Cohorts.cohort_id", req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `deleted ${rows.affectedRows} cohort with id ${req.params.id}`,
    });
  });
  console.log("deleteCohort");
};

module.exports = {
  getAllCohorts,
  getCohort,
  createCohort,
  updateCohort,
  deleteCohort,
};
