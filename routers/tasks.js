const express = require('express')
const tasksController = require('../controllers/tasks.js')
const router = express.Router()


router.get('/', tasksController.getTasks)
router.post('/', tasksController.createTask)
router.put('/:id', tasksController.updateTask)
router.delete('/:id', tasksController.deleteTask)

module.exports = router