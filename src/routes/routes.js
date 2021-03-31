const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const AccountController = require('../controllers/AccountController')


const userController = new UserController();
const accountController = new AccountController();

router.post('/userSignup', userController.create);
router.get('/userlist',userController.list);
router.get('/detailPerson',userController.detail);
router.post('/accountSignup',accountController.create);
router.post('/login',accountController.login);
router.get('/accountlist',accountController.list);
router.get('/accountdetail',accountController.detail);

module.exports = router;