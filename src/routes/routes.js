const { response } = require('express');
const express = require('express');
const UserModel = require('../models/UserModel')
const router = express.Router()
const UserController = require('../controllers/UserController')

const userController = new UserController();

router.post('/userSignup', userController.create)
router.get('/list',userController.list)
router.get('/detailPerson',userController.detail)

module.exports = router;