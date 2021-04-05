const P2PController = require('../controllers/P2PController');
const AccountController = require('../controllers/AccountController');
const { response } = require('express');
const express = require('express');
const router = express.Router();


const p2pController = new P2PController();
const accountController = new AccountController();

router.put('/transfer',p2pController.transfer)
router.get('/accountbalance',accountController.balance);

module.exports = router;