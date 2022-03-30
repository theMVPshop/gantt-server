const express = require('express')
const usersController = require('../controllers/users.js')
const router = express.Router()

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getUser)

router.post('/', usersController.createUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router