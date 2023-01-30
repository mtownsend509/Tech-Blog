const express = require('express');
const router = express.Router();

//require routes const apiRoutes =
const pageRoutes = require('./pageroutes');

//implement routes router.use('/api', apiRoutes)
router.use('/', pageRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router