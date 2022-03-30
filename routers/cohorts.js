const express = require('express')
const cohortsController = require('../controllers/cohorts.js')
const router = express.Router()

router.get('/', cohortsController.getAllCohorts)
router.get('/:id', cohortsController.getCohort)
router.post('/', cohortsController.createCohort)
router.put('/:id', cohortsController.updateCohort)
router.delete('/:id', cohortsController.deleteCohort)

module.exports = router