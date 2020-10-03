const express  = require('express');
const router   = express.Router();
const {signin,signup, logout}  = require('../Controllers/AuthController');
const {userSignUpValidator} = require('../Middlewares/Validator');
const {CheckUserEmail} = require('../Middlewares/user');
router.post('/login',signin)
router.post('/register',[userSignUpValidator,CheckUserEmail],signup);
router.post('/logout',logout);


module.exports = router;