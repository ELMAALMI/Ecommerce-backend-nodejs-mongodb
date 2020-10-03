const User = require('../Models/User');
const _    = require('lodash');
exports.getOneUser = (req,res) =>
{
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;

    return res.json({
        user : req.profile
    })
}

exports.UpdateOneuser = (req,res) =>
{
    User.findByIdAndUpdate({_id : req.profile._id},
        {
            $set : req.body
        },{new : true},(e,user)=>
        {
            if(e)
            {
                return res.status(400).json(e);
            }
            user.salt = undefined;
            user.hashed_password = undefined;
            res.status(200).json(
                {
                    user
                }
            )
        })

}

exports.getalluser =async (req,res)=>{
    const all = await User.find({role :{$eq : 0} });
    return res.json(all)
}