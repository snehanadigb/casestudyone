const express = require('express');
const { register, login, verifyEmailWithOTP } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmailWithOTP);

module.exports = router;
