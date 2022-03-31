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
        if(!rows.length) return res.status(404).send('cohort not found with that id')
        return res.json(rows) 
    })
  }

const createCohort = (req, res) => {
    let cohort = {}
    const newID = cohorts[cohorts.length -1].cohort_id + 1 
    
    cohort.cohort_id = newID
    cohort.cohort_name = req.body.cohort_name
    cohort.start_date = req.body.start_date
    cohort.end_date = req.body.end_date

    cohorts.push(cohort)
    res.json(cohorts)
}

// not working - why ?
const updateCohort = (req, res) => {
    const cohort = cohorts.find(cohort => cohort.cohort_id == req.params.id)
    
    cohort.cohort_name = req.body.cohort_name
    cohort.start_date = req.body.start_date
    cohort.end_date = req.body.end_date

    res.json(cohort)
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