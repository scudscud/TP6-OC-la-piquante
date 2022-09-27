const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')
const password = require('../middleware/password')
 // ----- route api sauce ------ \\
  // ----- route sign up  ------ \\
router.post('/signup',password, userCtrl.signup)
 // ----- route login ------ \\
router.post('/login', userCtrl.login)
 // ----- route trouver user ------ \\
router.get('/login', userCtrl.getUsers)

module.exports =   router

