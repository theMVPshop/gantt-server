// sql    
const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
// end sql

const courses = require('../data/courses.js')

const getAllCourses = (req, res) => {
    pool.query(`SELECT * FROM Courses`, (err, rows) => {
        if(err) return handleSQLError(res, err)
        res.json(rows)
    })
}

const getCoursesForCohort = (req, res) => {
    let sql = `SELECT * FROM Courses WHERE Courses.course_id = ?`
    sql = mysql.format[req.params.id]
    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        if(!rows.length) return res.status(404).send(`No courses for cohort with id ${req.params.id}`)
        res.json(rows)
    })
}


const getCourse = (req, res) => {
    let sql = `SELECT * FROM Courses WHERE Courses.course_id = ?`
    sql = mysql.format(sql, [req.params.id])
    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        if(!rows.length) return res.status(404).send(`No course found with id ${req.params.id}`)
        res.json(rows)
    })
}

const createCourseForCohort = (req, res) => {
    let sql = `INSERT INTO Courses (
        cohort_id, 
        course_number, 
        hubspot_ticket, 
        instructor, 
        teacher_assistant, 
        mode, 
        course_link, 
        rocketchat, 
        start_date, 
        end_date, 
        location, 
        day_of_week, 
        active_status, 
        student_number_start, 
        student_number_end) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    sql = mysql.format(sql, [
        req.params.id,
        req.body.course_number,
        req.body.hubspot_ticket,
        req.body.instructor,
        req.body.teacher_assistant,
        req.body.mode,
        req.body.course_link,
        req.body.rocketchat,
        req.body.start_date,
        req.body.end_date,
        req.body.location,
        req.body.day_of_week,
        req.body.active_status,
        req.body.student_number_start,
        req.body.student_number_end
    ])

    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.send(`New course created with id ${rows.insertId}`)
    })
    // const course = {}
    // const newId = courses[courses.length -1].course_id + 1

    // course.course_id = newId
    // course.cohort_id = req.body.cohort_id
    // course.course_number = req.body.course_number
    // course.hubspot_ticket = req.body.hubspot_ticket
    // course.instructor = req.body.instructor
    // course.teacher_assistant = req.body.teacher_assistant
    // course.mode = req.body.mode
    // course.course_link = req.body.course_link
    // course.rocketchat = req.body.rocketchat
    // course.start_date = req.body.start_date
    // course.end_date = req.body.end_date
    // course.location = req.body.location
    // course.day_of_week = req.body.day_of_week
    // course.active_status = req.body.active_status
    // course.student_number_start = req.body.student_number_start
    // course.student_number_end = req.body.student_number_end

    // courses.push(course)
    // res.json(courses)

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

    res.json({message: `Course with id ${req.params.id} deleted`, upatedCourses })

    
}

module.exports = {
    getAllCourses,
    getCoursesForCohort,
    getCourse,
    createCourseForCohort,
    updateCourse,
    deleteCourse
}