const express = require('express');
const router = express.Router();
const blogRouters = require('./BlogRoutes');
const userRouters = require('./UserRoutes');
const chatboxRouters = require('./ChatboxRoutes'); // Import route Chatbox

router.use('/blogs', blogRouters);       // Route blog
router.use('/auth', userRouters);        // Route auth
router.use('/chatbox', chatboxRouters);  // Route chatbox

module.exports = router;
