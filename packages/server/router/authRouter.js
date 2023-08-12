const express = require('express')
const validateForm = require('../controllers/validateForm')
const router = express.Router()
const { rateLimiter } = require("../controllers/rateLimiter")

const { handleLogin, attemptlogin, attemptSignup } = require('../controllers/authController')

router
    .route('/login')
    .get(handleLogin)
    .post(validateForm, rateLimiter(60, 10), attemptlogin)

router.post("/signup", validateForm, rateLimiter(30, 4), attemptSignup);

// router.get("/", (req, res) => {
//     // validateForm(req, res)
//     console.log("hello")
// })


module.exports = router;