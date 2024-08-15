const express = require('express');
const router = express.Router();

const authenticateRoute = require('./authenticate');

router.use('/auth', authenticateRoute);

module.exports = router;