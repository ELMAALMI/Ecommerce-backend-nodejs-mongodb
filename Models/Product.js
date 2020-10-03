const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required : true,
            maxlength : 150,
            trim : true
        },
        description:{
            type:String,
            required:true,
            maxlength:2000
        },
        price:{
            type:Number,
            required : true,
        },
        quantity:{
            type:Number
        },
        photo:{
            data:Buffer,
            contentType:String,
        },
        category:{
            type : ObjectId,
            ref  :'Category'
        },
        shipping:{
            type:Boolean,
            default:false,
            required : false,
        }
    }
,{timestamps: true})

module.exports = mongoose.model('Product',ProductSchema);