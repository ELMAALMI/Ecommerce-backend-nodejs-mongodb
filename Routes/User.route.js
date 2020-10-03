const express  = require('express');
const router   = express.Router();

const {userById} = require('../Middlewares/user');
const {getOneUser,getalluser,UpdateOneuser} = require('../Controllers/UserController');
const {isAuth, isAdmin} = require('../Middlewares/auth');

router.get('/profile/:userId',isAuth,getOneUser);
router.put('/profile/:userId',isAuth,UpdateOneuser)
router.get('/profile/',[isAuth,isAdmin],getalluser);

router.param('userId',userById);

module.exports = router;