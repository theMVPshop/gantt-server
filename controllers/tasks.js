const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getTasks = (req, res) => {
    let sql = `SELECT * FROM Tasks`
    pool.query(sql, (err, rows) => {
        if(err) return handleSQLError(res, err)
        return res.json(rows)
    })
}

const createTask = (req, res) => {
   
    let sql = `INSERT INTO Tasks
    (gantt_id,
    title,
    start_date,
    end_date,
    hubspot_ticket,
    instructor, 
    teacher_assistant, 
    mode, 
    course_link,
    rocketchat,
    location,
    day_of_week,
    active_status,
    student_number_start,
    student_number_end,
    parent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    sql = mysql.format(sql, [ 
        req.body.gantt_id,
        req.body.title,
        req.body.start_date,
        req.body.end_date,
        req.body.hubspot_ticket,
        req.body.instructor, 
        req.body.teacher_assistant, 
        req.body.mode, 
        req.body.course_link,
        req.body.rocketchat,
        req.body.location,
        req.body.day_of_week,
        req.body.active_status,
        req.body.student_number_start,
        req.body.student_number_end,
        req.body.parent    
    ])

    pool.query(sql, (err, result) => {
        if(err) return handleSQLError(res, err)
        return res.send(`New task created with id ${result.insertId}`)
    })
}

const updateTask = (req, res) => {

}

const deleteTask = (req, res) => {

}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}