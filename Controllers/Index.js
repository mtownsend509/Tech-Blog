const express = require('express');
const router = express.Router();

//require routes const apiRoutes =
const pageRoutes = require('./pageroutes');
const apiRoutes = require('./API');

//implement routes router.use('/api', apiRoutes)
router.use('/', pageRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router