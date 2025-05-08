const express = require("express")
const cors = require('cors');
const app = express()
app.use(cors());
const Category = require("./models/category.models")
const Product = require("./models/product.models")
const {initializeDatabase} = require("./db/db.connect")

initializeDatabase()


// addProducts
 const productData = {
    name:"Wooden Chair",
    price:1999,
    description:"Solid teak wood.",
    subCategories:"Furniture",
    rating:3,
    size:"S",
    imageUrl:"https://media.istockphoto.com/id/1168952666/photo/retro-vintage-wooden-chair-isolated-on-white-including-clipping-path.jpg?s=1024x1024&w=is&k=20&c=-elYqGcSe1HOqvJmdimh4WFWARZElPze9qBXJgjVibE=",
    categories:"6810a44e438dcee5a52ee572"
} 

const addProduct = async() => {
    try{
        const newProduct = new Product(productData)
        await newProduct.save()
        console.log(newProduct)
    }
    catch(error){
        throw error
    }
} 

//addProduct()
// readAllProducts
const readAllProducts = async() => {
    try{
        const allProducts = await Product.find().populate("categories")
        //console.log("products:",allProducts)
       //console.log({ data: { products: allProducts } });
       //console.log(JSON.stringify({ data: { products: allProducts } }, null, 2));

        return allProducts
    }
    catch(error){
        console.error("Error Fetching Products:", error);
        throw error
    }
}
//readAllProducts()

const readById = async(productId) => {
    try{
        const productbyId = await Product.findById(productId)
        console.log(productbyId)
        return productbyId
    }
    catch(error){
        throw error
    }
}
//readById("68103244536f8504669dd015")

app.get("/api/products",async (req,res)=>{
    //res.send("main hoon products")
    try{
        const products = await readAllProducts()
        if(products.length != 0){
            //res.json({data:{products:products}})
            res.json(products)
        }
        else{
            res.status(404).json({error:"no products found."})
        }
    }
    catch(error){
        res.status(500).json({error:"failed to fetch products."})
    }
})

app.get("/api/products/:productId",async (req,res)=>{
    try{
        const product = await readById(req.params.productId)
       if(product){
        res.json(product)
        //res.json({data:{products:product}})
       }
       else{
        res.json({error:"product not found."})
       }
    }
    catch(error){
        res.status(500).json({error:"faild to fetch products."})
    }
})
// addCategories
const categoryData = {
    name:"Furniture",
}
const addCategory = async() => {
    try{
        const newCategory = new Category(categoryData)
        await newCategory.save()
        console.log(newCategory)
    }
    catch(error){
        throw error
    }
} 
//addCategory()
// read all categories
const readAllCategories = async() => {
    try{
        const allCategory = await Category.find()
        //console.log(allCategory)
       // console.log("products:",allMovie)
       //console.log({ data: { products: allMovie } });
       //console.log(JSON.stringify({ data: { products: allMovie } }, null, 2));

        return allCategory
    }
    catch(error){
        throw error
    }
}
//readAllCategories()
app.get("/api/categories",async(req,res)=>{
    //res.send("main hoon category")
    try{
        const category = await readAllCategories()
        if(category.length != 0){
            //res.json({data:{products:products}})
            res.json(category)
        }
        else{
            res.status(404).json({error:"no products found."})
        }
    }
    catch(error){
        res.status(500).json({error:"failed to fetch products."})
    }
})
const readBycategoryId = async(categoryId) => {
    try{
        const categorybyId = await Category.findById(categoryId)
        //console.log(categorybyId)
        return categorybyId
    }
    catch(error){
        throw error
    }
}
// readBycategoryId("paste id here")
app.get("/api/categories/:categoryId",async (req,res)=>{
    try{
        const category = await readBycategoryId(req.params.categoryId)
       if(category){
        res.json(category)
        //res.json({data:{products:product}})
       }
       else{
        res.json({error:"category not found."})
       }
    }
    catch(error){
        res.status(500).json({error:"faild to fetch category."})
    }
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Hmlog ka server start ho gaya hai ${PORT} mai hai.`)
})

