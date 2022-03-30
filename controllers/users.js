const users = require('../data/users.js');


const getAllUsers = (req, res) => {
  res.json(users)
}

const getUser = (req, res) => {
  const user = users.find(user => user.user_id == req.params.id)
  // error handler if user does not exist with given id
  if(!user) {
  res.status(404)
  res.send(`No user with id ${req.params.id} exists`)
  }
  res.json(user)
}

const createUser = (req, res) => {
  let user = {}
  const newId = users[users.length -1].user_id + 1
  
  
  user.user_id = newId
  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.email = req.body.email
  
  users.push(user)

  res.json(users)

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