// sql    
const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
// end sql

const bcrypt = require("bcrypt");
const users = require('../data/users.js');


const getAllUsers = (req, res) => {
  pool.query(`SELECT * FROM Users`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


const getUser = (req, res) => {
  let sql = `SELECT * FROM Users WHERE Users.user_id = ? AND Users.user_id IS NOT NULL`
  sql = mysql.format(sql, [req.params.id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if(rows.length === 0) {
      return res.status(404).send('No user found with that id')
    }
    return res.json(rows);
  })

  // dummy data function
  // const user = users.find(user => user.user_id == req.params.id)
  // // error handler if user does not exist with given id
  // if(!user) {
  // res.status(404)
  // res.send(`No user with id ${req.params.id} exists`)
  // }
  // res.json(user)
}

// original createUser function without auth -----
// const createUser = (req, res) => {
//   let user = {}
//   const newId = users[users.length -1].user_id + 1
  
  
//   user.user_id = newId
//   user.first_name = req.body.first_name
//   user.last_name = req.body.last_name
//   user.email = req.body.email
  
//   users.push(user)

//   res.json(users)

// }

const createUser = (req, res) => {
  let user = {}
  const newId = users[users.length -1].user_id + 1
  
  
  user.user_id = newId
  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.email = req.body.email
  user.password = req.body.password

  // for bcrypt authentication
  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)
  
  let sql = `INSERT INTO Users VALUES (?, ?, ?, ?, ?)`
  sql = mysql.format(sql, [user_id, first_name, last_name, email, hash])

  pool.query(sql, (err, row) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(409).send("Email is taken")
      return res.status(500).send("Oh no! Something went wrong")
    }
    res.send(`Sign-up successful. New user with id ${row.insertId} created`)
  })
}

const updateUser = (req, res) => {
  const user = users.find(user => user.user_id == req.params.id)

  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.email = req.body.email

  res.json(user)
}

const deleteUser = (req, res) => {
  const deletedUser = users.find(user => user.user_id == req.params.id)

  if(!deletedUser) {
    res.status(404)
    res.send(`No user with id ${req.params.id} exists`)
    }
  
  const updatedUsersArray = users.filter(user => user.user_id !== deletedUser.user_id)
  res.json({message: `user with id ${req.params.id} deleted`, updatedUserList: updatedUsersArray})
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}