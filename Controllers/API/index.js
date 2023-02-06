const express = require('express')
const router = express.Router()

const profileRoutes = require('./profileroutes');

router.use('/profile', profileRoutes);

module.exports = router;