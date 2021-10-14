const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


// Get the wholelist of category
router.get(`/`, async (req, res) =>{
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (error) {
        console.log("router/category")
        res.status(500).json({success: false})
    }
})


// Get a single category
router.get('/:id' , async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).send(category);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured"
        })
    }
    
})


// Save a category 
router.post('/' , async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        })
        category = await category.save();
        res.send(category)
    } catch (error) {
        console.log('routes/category');
        res.status(404).send("Error");
    }
})


// Update a category
router.put('/:id' , async (req, res) => {
    try{
        await Category.findOneAndUpdate({_id: req.params.id}, {$set: {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
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
        console.log('routes/categories')
        res.status(404).json({
            success: false,
            message: "Some Error Occured"
        })
    }
  
    
})


// Delete a category
router.delete('/:id' , async (req, res) => {
    try{
        const result = await Category.findByIdAndDelete(req.params.id);
        if(!result)
        {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Category deleted"
        })
    }catch(err){
        console.log('routes/categories');
        res.status(400).json({
            success: false,
            message: "Some Error Occured"
        })
    }
})

module.exports =router;