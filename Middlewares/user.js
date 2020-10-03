const User = require('../Models/User');

exports.userById = (req,res,next,id)=>
{
    User.findById(id)
    .exec((e,user)=>
    {
        if(e || !user)
        {
            return res.status(404).json(
                {
                  error : 'user not found'  
                }
            )
        }
        req.profile = user;
        next();
    })
}

exports.CheckUserEmail = (req,res,next)=>
{
    User.findOne({email:req.body.email}).select({email:1})
    .exec((e,user)=>
    {
        if(e) 
        {
            return res.status(400).send(e)
        }
        if(user)
        {
            return res.send({
                error : 'email already register' 
            })
        }
        next()
    });
}