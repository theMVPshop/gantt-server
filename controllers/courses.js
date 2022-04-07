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
    let sql = `SELECT * FROM Courses WHERE Courses.cohort_id = ?`
    sql = mysql.format(sql, [req.params.id])
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
}

const updateCourse = (req, res) => {
    // this had issues - need to fix
    const { id }  = req.params
    const { body } = req
    
    let sql = 'UPDATE Courses SET ? WHERE Courses.course_id = ?'
    sql = mysql.format(sql, [ body, id ])

    pool.query(sql, (err,rows) => {
        if(err) return handleSQLError(res, err)
        res.send(`Course with id ${id} updated`)
    })
}

const deleteCourse = (req, res) => {
 let sql = 'DELETE FROM ?? WHERE ?? = ?'
 sql = mysql.format(sql, ['Courses', 'Courses.course_id', req.params.id])

 pool.query(sql, (err, rows) => {
    if(err) return handleSQLError(err, res)
    return res.send(`Deleted ${rows.affectedRows} course(s) with id ${req.params.id}`)
 })

    
}

module.exports = {
    getAllCourses,
    getCoursesForCohort,
    getCourse,
    createCourseForCohort,
    updateCourse,
    deleteCourse
}