const courses = require('../data/courses.js')

const getAllCourses = (req, res) => {
    res.json(courses)
}

const getCourse = (req, res) => {
    const course = courses.find(course => course.course_id == req.params.id)
    if(!course) res.send(`No course with id ${req.params.id} exists`)
    res.json(course)
}

const createCourse = (req, res) => {
    const course = {}
    const newId = courses[courses.length -1].course_id + 1

    course.course_id = newId
    course.cohort_id = req.body.cohort_id
    course.course_number = req.body.course_number
    course.hubspot_ticket = req.body.hubspot_ticket
    course.instructor = req.body.instructor
    course.teacher_assistant = req.body.teacher_assistant
    course.mode = req.body.mode
    course.course_link = req.body.course_link
    course.rocketchat = req.body.rocketchat
    course.start_date = req.body.start_date
    course.end_date = req.body.end_date
    course.location = req.body.location
    course.day_of_week = req.body.day_of_week
    course.active_status = req.body.active_status
    course.student_number_start = req.body.student_number_start
    course.student_number_end = req.body.student_number_end

    courses.push(course)
    res.json(courses)

}

const updateCourse = (req, res) => {
    
    const course = courses.find(course => course.course_id = req.params.id)

    course.cohort_id = req.body.cohort_id
    course.course_number = req.body.course_number
    course.hubspot_ticket = req.body.hubspot_ticket
    course.instructor = req.body.instructor
    course.teacher_assistant = req.body.teacher_assistant
    course.mode = req.body.mode
    course.course_link = req.body.course_link
    course.rocketchat = req.body.rocketchat
    course.start_date = req.body.start_date
    course.end_date = req.body.end_date
    course.location = req.body.location
    course.day_of_week = req.body.day_of_week
    course.active_status = req.body.active_status
    course.student_number_start = req.body.student_number_start
    course.student_number_end = req.body.student_number_end

    res.json(course)

}

const deleteCourse = (req, res) => {
    const deletedCourse = courses.find(course => course.course_id == req.params.id)
    const upatedCourses = courses.filter(course => course.course_id !== deletedCourse.course_id)

    if(!deletedCourse) res.status(404).send(`Course with id ${req.params.id} does not exist`)

    
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse
}