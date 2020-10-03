const expressJWT = require('express-jwt');
require('dotenv').config()  

exports.requireSigin = expressJWT({
    secret : process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:'auth',
},function(req, res) {
    if (!req.auth) return res.status(401).json({
        error:'you are not Signin'
    });
    res.sendStatus(200);
  })

exports.isAuth = (req , res , next)=>
{
    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    if(!user)
    {
        return res.status(403).json({
            error: "Access Denied !!!!!!"
        })
    }
    next();
}

exports.isAdmin = (req , res , next)=>
{
    
    if(req.auth.role == 0) 
    {
        return res.status(403).json({
            error: "Admin Resource, Access Denied !"
        })
    }

    next();

}