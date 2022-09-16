const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')
 // ----- route api sauce ------ \\
  // ----- route sign up  ------ \\
router.post('/signup', userCtrl.signup)
 // ----- route login ------ \\
router.post('/login', userCtrl.login)
 // ----- route trouver user ------ \\
router.get('/login', userCtrl.getUsers)

module.exports = router

