const cohorts = require('../data/cohorts')

const getAllCohorts = (req, res) => {
    res.json(cohorts)
}

const getCohort = (req, res) => {
    const cohort = cohorts.find(cohort => cohort.cohort_id == req.params.id)
    // error handler if user does not exist with given id
    if(!cohort) {
    res.status(404)
    res.send(`No cohort with id ${req.params.id} exists`)
    }
    res.json(cohort)
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