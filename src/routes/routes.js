const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const AccountController = require('../controllers/AccountController');
const P2PController = require('../controllers/P2PController');


const userController = new UserController();
const accountController = new AccountController();
const p2pController = new P2PController();

router.post('/userSignup', userController.create);
router.get('/userlist',userController.list);
router.get('/detailPerson',userController.detail);
router.post('/accountSignup',accountController.create);
router.post('/login',accountController.login);
router.get('/accountlist',accountController.list);
router.get('/accountdetail',accountController.detail);
router.put('/transfer',p2pController.transfer)

module.exports = router;