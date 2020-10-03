const Product = require('../Models/Product');
const formidable = require('formidable');
const fs = require('fs');
const {ProductValidator} = require('../DataValidation/JoiValidator');
const _ = require('lodash');

exports.productById = (req, res, next, id) => {

    Product.findById(id).exec((err, product) => {

        if(err || !product) {
            return res.status(404).json({
                error: 'Product not found !'
            })
        }

        req.product = product;
        next()

    })

}



exports.createProduct = (req,res) =>
{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true,
    form.parse(req,(e,fields,files)=>{
        if(e)
        {
            return res.status(400).json({
                error : 'Image not uploaded'
            })
        }
        const validated = ProductValidator(fields);
        if(validated != '')
        {
            return res.status(400).json({
                error : validated.details[0].message
            })
        }
        let product = new Product(fields);
            if(files.photo)
            {
                product.photo.data = fs.readFileSync(files.photo.path)
                product.photo.contentType = files.photo.type 
            }
            product.save((e,product)=>{
                    if(e)
                    {
                        return res.status(400).json({
                            error : 'product not saved'
                        })
                    }
                    return res.status(200).json(
                        {
                            product
                        }
                    )
                })
    })
}

exports.GetProductById = (req,res)=>
{
    req.product.photo = ''
    return res.status(200).json({
            product :  req.product
    })   
}



exports.GetAllProduct = (req,res)=>
{
    let sortBy = req.query.sortBy ? req.query.sortBy  : '_id';
    let order  = req.query.order  ? req.query.order   : 'asc';
    let limit  = req.query.limit  ? parseInt(req.query.limit)   :  2 ;
    
    Product.find().select('-photo')
            .populate('category','_id name')
            .sort([[sortBy,order]])
            .limit(limit)
           .exec((e,products)=>
                {
                    if(e || !products)
                    {
                        return  res.status(404).json({
                            msg : 'products table empty',
                            error: e
                        })
                    }
                    return res.status(200).json({
                        products 
                    })
                })
}

exports.RelatedProduct = (req,res)=>
{
    let limit  = req.query.limit  ? parseInt(req.query.limit)   :  3 ;
    Product.find({category:req.product.category , _id:{$ne : req.product._id}})
           .select('-photo')
           .populate('category','_id name')
           .limit(limit)
           .exec((e,products)=>
                {
                    if(e || !products)
                    {
                        return  res.status(404).json({
                            msg : 'products table empty',
                            error: e
                        })
                    }
                    return res.status(200).json({
                        products 
                    })
                })
}

exports.SearchProduct = (req,res) =>
{
    let sortBy = req.query.sortBy ? req.query.sortBy  : '_id';
    let order  = req.query.order  ? req.query.order   : 'asc';
    let limit  = req.query.limit  ? parseInt(req.query.limit)   :  100 ;
    let skip   = parseInt(req.query.skip);
    let findArgs = {};

    for (let key in req.body.filters) 
    {
        if (req.body.filters[key].length > 0)
        {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    Product.find().select(findArgs)
            .populate('category','_id name')
            .sort([[sortBy,order]])
            .limit(limit)
            .skip(skip)
            .exec((e,products)=>
                {
                    if(e || !products)
                    {
                        return  res.status(404).json({
                            msg : 'products table empty',
                            error: e
                        })
                    }
                    return res.status(200).json({
                        products 
                    })
                })
}
exports.Productimage = (req,res)=>
{
    const {data,contentType} = req.product.photo;
    if(data)
    {
        res.set('contentType',contentType);
        return res.status(200).send(data);
    }
}
exports.UpdateProduct = (req,res)=>
{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true,
    form.parse(req,(e,fields,files)=>{
        if(e)
        {
            return res.status(400).json({
                error : 'Image not uploaded'
            })
        }
        const validated = ProductValidator(fields);
        if(validated != '')
        {
            return res.status(400).json({
                error : validated.details[0].message
            })
        }
        let product = req.product;

        product = _.extend(product,fields)
        if(files.photo)
        {
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type 
        }
        product.save((e,product)=>{
                if(e)
                {
                    return res.status(400).json({
                        error : 'product not updated'
                    })
                }
                return res.status(200).json(
                    {
                        product
                    }
                )
            })
    })
}

exports.DeleteProduct = (req,res)=>
{
    let product = req.product

    product.remove((err, product) => 
    {
        if(err) {
            return res.status(404).json({
                error: "Product not found !"
            })
        }

        res.status(204).json({})

    })
}