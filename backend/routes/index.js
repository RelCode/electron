const express = require('express');
const router = express.Router();

const authenticateRoute = require('./authenticate');
const usersRoute = require('./users');

router.use('/auth', authenticateRoute);
router.use('/users', usersRoute);

module.exports = router;