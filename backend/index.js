const express = require("express")
const cors = require('cors');
const app = express()
app.use(cors());
const Category = require("./models/category.models")
const Product = require("./models/product.models")
const {initializeDatabase} = require("./db/db.connect")

initializeDatabase()


const productData = {
    name:"Sofa",
    price:14999,
    description:"3 Seater Sofa set for Living Room Fabric.",
    subCategories:"Furniture",
    rating:3,
    size:"XL",
    imageUrl:"https://www.istockphoto.com/photo/poster-above-white-cabinet-with-plant-next-to-grey-sofa-in-simple-living-room-gm1031444360-276298364?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsofa&utm_medium=affiliate&utm_source=unsplash&utm_term=sofa%3A%3A%3A",
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

const readAllProducts = async() => {
    try{
        const allProducts = await Product.find().populate("categories")
       

        return allProducts
    }
    catch(error){
        console.error("Error Fetching Products:", error);
        throw error
    }
}


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


app.get("/api/products",async (req,res)=>{
   
    try{
        const products = await readAllProducts()
        if(products.length != 0){
           
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
       
       }
       else{
        res.json({error:"product not found."})
       }
    }
    catch(error){
        res.status(500).json({error:"faild to fetch products."})
    }
})

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

const readAllCategories = async() => {
    try{
        const allCategory = await Category.find()
        return allCategory
    }
    catch(error){
        throw error
    }
}

app.get("/api/categories",async(req,res)=>{
    try{
        const category = await readAllCategories()
        if(category.length != 0){
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
        return categorybyId
    }
    catch(error){
        throw error
    }
}
app.get("/api/categories/:categoryId",async (req,res)=>{
    try{
        const category = await readBycategoryId(req.params.categoryId)
       if(category){
        res.json(category)
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
    console.log(`Server is running on ${PORT} port.`)
})

