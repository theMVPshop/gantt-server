// sql    
const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
// end sql

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret123";
// const users = require('../data/users.js');


const getAllUsers = (req, res) => {
  pool.query("SELECT user_id, first_name, last_name, email FROM Users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


const getUser = (req, res) => {
  let sql = "SELECT * FROM Users WHERE Users.user_id = ? AND Users.user_id IS NOT NULL"
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


const createUser = (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body

  if(password !== confirm_password) {
    return res.status(400).send("Passwords do not match")
  }

  // for bcrypt authentication
  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)
  
  let sql = "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)"
  sql = mysql.format(sql, [ first_name, last_name, email, hash ])

  pool.query(sql, (err, row) => {
    if (err) return handleSQLError(res, err)
    res.send(`Sign-up successful. New user with id ${row.insertId} created`)
  })
}


const loginUser = (req, res) => {
  const { email, password } = req.body

  let sql = "SELECT user_id, first_name, email, password FROM Users WHERE email = ?"
  sql = mysql.format(sql, [ email ])

  pool.query(sql, (err, rows) => {
    let correctPassword
    if (err) return handleSQLError(res, err)

    if (!rows.length) {
      return res.status(404).send("No matching users")
    }

    if (!err && rows.length == 1) {
      let hash = rows[0].password
      correctPassword = bcrypt.compareSync(password, hash)
    }

    if (correctPassword) {
      // set the jwt id equal to the user_id that has been found in the database
      const id = rows[0].user_id
      const first_name = rows[0].first_name
      const unsignedToken = {
        first_name: first_name,
        email: email,
        id: id
      }

      const accessToken = jwt.sign(unsignedToken, jwtSecret)
      res.cookie("our_token", accessToken, {httpOnly: true, sameSite: false})
      return res.json({
        msg: "Login successful",
        accessToken, 
        first_name, 
        email, 
        id 
      })
    } else {
      res.status(401).send("Email and/or password are incorrect")
    }
  })
}


const updateUser = (req, res) => {
  const { id } = req.params
  const { body } = req

  let sql = "UPDATE Users SET ? WHERE user_id = ?"
  sql = mysql.format(sql, [ body, id ])

  pool.query(sql, (err, row) => {
    if (err) return handleSQLError(res, err)
    res.json({
      msg: "User updated",
      row
    })
  })
}


const deleteUser = (req, res) => {
  const { id } = req.params

  let sql = "DELETE FROM Users WHERE user_id = ?"
  sql = mysql.format(sql, [ id ])

  pool.query(sql, (err, row) => {
    if (err) return handleSQLError(res, err)
    res.json({
      msg: `User with id ${id} deleted`,
      row
    })
  })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser
}