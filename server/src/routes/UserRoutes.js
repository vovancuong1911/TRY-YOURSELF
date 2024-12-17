const express = require('express');
const router = express.Router();
const ControllerUser = require('../controller/UserController/ControllerUser');

// User
router.post('/register', ControllerUser.Register);
router.post('/login', ControllerUser.Login);
router.post('/logout', ControllerUser.Logout);

module.exports = router;
