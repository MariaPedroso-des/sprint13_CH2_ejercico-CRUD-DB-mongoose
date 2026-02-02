const express = require('express')
const router = express.Router()
const taskRoutes = require('./routes/task.js')

router.use('/', taskRoutes)

module.exports = router;