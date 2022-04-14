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