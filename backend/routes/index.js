const express = require('express');
const router = express.Router();

const authenticateRoute = require('./authenticate');
const usersRoute = require('./users');
const userTypes = require('./userTypes');

router.use('/auth', authenticateRoute);
router.use('/users', usersRoute);
router.use('/userTypes', userTypes);

module.exports = router;