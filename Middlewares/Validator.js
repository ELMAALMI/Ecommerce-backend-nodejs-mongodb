
exports.userSignUpValidator = (req,res,next) =>
{
    
    req.check('name','Name is Required')
        .notEmpty();
    req.check('email')
       .isEmail()
       .notEmpty();
    req.check('password')
       .notEmpty()
       .isLength({min:6})
       .withMessage('Password must between 6 and 10 char')
    
    const errors = req.validationErrors();
    if(errors)
    {
        return res.status(400).json(
            {
                error : errors,
                msg   : 'data validation'
            }
            );
    }
    next();
}
