const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    subCategories:{
        type:String,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
        default:0,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    size:{
        type:String,
        enum:["S","M","XL","XXL"],
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1,
    },
   
    categories:{type: mongoose.Schema.Types.ObjectId,ref:"Category"}
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

module.exports = Product