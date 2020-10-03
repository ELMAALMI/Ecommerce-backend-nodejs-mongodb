const User = require('../Models/User');


exports.signin =(req,res)=>
{
    const { email,password } = req.body;
    User.findOne({email},(e,user)=>{
        if(e || !user)
        {
            return res.status(400).json({
                error: 'User not found with this email'
            })
        }
       if(!user.authenticate(password))
       {
           return res.status(401).json({
               error : 'email and password dont Match !'
           })
       }
      const token = user.generatetoken();
      res.cookie('token',token,{expire : new Date() + 8062000})
      const {_id, name, email, role,history} = user;
      return res.status(200).json({
          token,
          user:{_id, name, email, role,history}
      })
    })
    
}


exports.signup = async (req,res) =>
{
        const user = new User(req.body);
        user.save((e,user)=>
        {
            if(e)
            {
                return res.status(400).json(
                    {
                        e
                    }
                )
            }
            const token = user.generatetoken();
            res.cookie('token',token,{expire : new Date() + 8062000})
            const {_id, name, email, role} = user;
            return res.status(200).json({
                token,
                user:{_id, name, email, role}
            })
        })
        
}
exports.logout = (req,res)=>
{
    res.clearCookie('token');
    return res.status(200).json({
        message : 'user Signout'
    })
}