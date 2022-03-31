const express = require('express')
const coursesController = require('../controllers/courses.js')
const router = express.Router()

router.get('/', coursesController.getAllCourses)
router.get('/:id', coursesController.getCourse)
router.post('/', coursesController.createCourse)
router.put('/:id', coursesController.updateCourse)
router.delete('/:id', coursesController.deleteCourse)

module.exports = router