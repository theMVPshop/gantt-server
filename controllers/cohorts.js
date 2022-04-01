// sql    
const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
// end sql

const cohorts = require('../data/cohorts')

const getAllCohorts = (req, res) => {
    pool.query(`SELECT * FROM Cohorts`, (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.json(rows)
    })
}

const getCohort = (req, res) => {
    let sql = `SELECT * FROM Cohorts WHERE Cohorts.Cohort_id = ?`
    sql = mysql.format(sql, [req.params.id])
    pool.query(sql, (err, rows)=> {
        if(err) return handleSQLError(res, err)
        if(!rows.length) return res.status(404).send(`cohort not found with id ${req.params.id}`)
        return res.json(rows) 
    })
  }

const createCohort = (req, res) => {
    
    let sql = `INSERT INTO Cohorts(cohort_name, start_date, end_date) 
    VALUES (?, ?, ?)`

    sql = mysql.format(sql, [req.body.cohort_name, req.body.start_date, req.body.end_date])

    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.send(`New cohort created with id ${rows.insertId}`)
    })
}

const updateCohort = (req, res) => {
    let sql = `UPDATE Cohorts SET cohort_name = ?, start_date = ?, end_date= ? WHERE Cohorts.cohort_id = ?`
    sql = mysql.format(sql, [req.body.cohort_name, req.body.start_date, req.body.end_date, req.params.id])

    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.status(204).json(rows) 
    })
}

const deleteCohort = (req, res) => {
    const deletedCohort = cohorts.find(cohort => cohort.cohort_id == req.params.id)
    const updatedCohortsArray = cohorts.filter(cohort => cohort.cohort_id !== deletedCohort.cohort_id)
    res.json({ message: `cohort with id ${req.params.id} deleted`, updatedCohortList: updatedCohortsArray })
}

  module.exports = {
      getAllCohorts,
      getCohort,
      createCohort,
      updateCohort,
      deleteCohort
  }