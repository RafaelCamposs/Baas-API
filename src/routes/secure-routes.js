const P2PController = require('../controllers/P2PController');
const { response } = require('express');
const express = require('express');
const router = express.Router();


const p2pController = new P2PController();

router.put('/transfer',p2pController.transfer)

module.exports = router;