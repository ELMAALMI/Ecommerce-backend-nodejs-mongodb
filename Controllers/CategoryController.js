const Category = require('../Models/Category');
const {CategoryValidator} = require('../DataValidation/JoiValidator');

exports.CategoryById = ( req, res, next , id)=>
{
    Category.findById(id).exec((e,category)=>
    {
        if(e)
        {
            return res.status(404).json(
                {
                    error : "Category not found"
                }
            )
        }
        req.category = category;
        next();
    })
}
exports.GetCategory = (req,res)=>
{
    let data = req.category;
    return res.status(200).json({
        data
    })
}
exports.createCategory = (req,res) =>
{
    const validated = CategoryValidator(req.body);

    if(validated != '')
    {
        return res.status(400).json({
            error : validated.details[0].message
        })
    }
    const category = new Category(req.body);
    category.save((e,category)=>{
        if(e)
        {
            return res.status(400).json({
                error : 'bad request '
            })
        }
        return res.status(200).json(
            {
                category : category
            }
        )
    })
}
exports.getAllCategory =async (req,res) =>
{
    const allCategory =await Category.find()
                       .then(data =>
                        {
                            if(!data)
                            {
                                return res.status(404).json({
                                    message:'no data'
                                })
                            }
                            return res.status(200).json({
                                category : data
                            })
                        })
                        .catch(e=>{
                            return res.status(401).json({
                                error : 'bad request !!'
                            })
                        });
}
exports.UpdateCategory = (req,res)=>
{
    const validated = CategoryValidator(req.body);

    if(validated != '')
    {
        return res.status(400).json({
            error : validated.details[0].message
        })
    }

    let category = req.category;
    category.name = req.body.name;
    category.save((e,category)=>{
        if(e)
        {
            return res.status(400).json({
                error : 'category not updated'
            })
        }
        return res.status(200).json(
            {
                category
            }
        )

    })
    
}
exports.DeleteCategory = (req,res)=>
{
    let category = req.category;

    category.remove((err, product) => 
    {
        if(err) {
            return res.status(404).json({
                error: "Product not found !"
            })
        }

        res.status(204).json({})

    })
}