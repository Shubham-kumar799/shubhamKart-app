const express = require('express');
const router  = express.Router();
const multer = require('multer');
const { Product } = require('../models/product')
const { Category } = require('../models/category')
const mongoose = require('mongoose')


const FILE_TYPE_MAP ={
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg',
}

// Configuring multer diskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        if(isValid){
            uploadError = null
        }
      cb(uploadError, './public/uploads')
    },
    filename: function (req, file, cb) {

      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })
  

// POst a product 
router.post(`/` , uploadOptions.single('image') ,async (req , res) => {

    const fileName = req.file.filename 
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
     try {
      await Category.findById(req.body.category)
        product = await product.save();
        res.send(product);
     } catch (error) {
        console.log('routes/products')
         res.status(500).send({
             success: false,
             message: "Some Error Occured"
         })
     }
    
 

})


// Get all product or product that belong to the same given categories
// You have not tested this api  (video 37)
router.get(`/` , async (req , res) => {
    let filter = {};
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }
    try{
        const productList = await Product.find(filter);
        res.status(200).send(productList)
    }catch(err) {
        console.log("router/product.js")
        console.log(err)
        res.status(500).send({
            error: err,
            success: false
        })
    }
    
})


// To get a single Product
router.get(`/:id` , async (req , res) => {
    try {
        mongoose.isValidObjectId(req.params.id)
        const product = await Product.findById(req.params.id).populate('category')
        res.status(200).send(product);
    } catch (error) {
        console.log('routes/product')
        res.status(500).json({
            success: false,
            message: "Some Error Occured"
        })
    }
    
})

// Update a product
router.put('/:id' , async (req, res) => {
    try{
        mongoose.isValidObjectId(req.params.id)
        await Category.findById(req.body.category)
        await Product.findOneAndUpdate({_id: req.params.id}, {$set: {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        }
    }, {
        returnOriginal: false,
        useFindAndModify: false,
    }, function(err,doc) {
            if (err) { throw err; }
            else {  
                res.status(201).send(doc)
            }
          });
    }catch(err){
        console.log('routes/product')
        res.status(404).json({
            success: false,
            message: "Some Error Occured"
        })
    }
  
    
})


// Delete a product
router.delete('/:id' , async (req, res) => {
    try{
        mongoose.isValidObjectId(req.params.id)
        const result = await Product.findByIdAndDelete(req.params.id);
        if(!result)
        {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product deleted"
        })
    }catch(err){
        console.log('routes/product');
        res.status(400).json({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Get the count of product
router.get('/get/count' , async (req, res) => {
    try {
        const productCount = await Product.countDocuments((count) => count);
        res.status(200).send({
            count : productCount
        })
    } catch (error) {
        console.log('routes/produts');
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Get the count of Featured products(YOu have not tested this api (video 36))
router.get('/get/featured/:count' , async (req, res) => {
    const count = req.params.count  ? req.params.count : 0
    try {
        const products = await Product.find({isFeatured: true}).limit(+count)
        res.status(200).send(products)
    } catch (error) {
        console.log('routes/produts');
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Uploading Image gallery for the product
router.put('/gallery/images/:id', uploadOptions.array('images' , 5) , async (req, res) => {
    try{
        mongoose.isValidObjectId(req.params.id)
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
        const files = req.files
        let imagesPaths = [];
        if(files){
            files.map(file => {
                console.log(file.filename)
                imagesPaths.push(`${basePath}${file.filename}`)
            })
        }
        await Product.findOneAndUpdate({_id: req.params.id}, {$set: {
            images : imagesPaths
        }
    }, {
        returnOriginal: false,
        useFindAndModify: false,
    }, function(err,doc) {
            if (err) { throw err; }
            else {  
                res.status(201).send(doc)
            }
          });
    }catch(err){
        console.log('routes/products')
        console.log(err)
        res.status(404).json({
            success: false,
            message: "Some Error Occured"
        })
    }
})

module.exports = router;