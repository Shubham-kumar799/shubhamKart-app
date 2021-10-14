const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


//GEt the list of users
router.get(`/`, async (req, res) =>{
    try {
        const userList = await User.find().select('name phone email isAdmin');
        res.send(userList);
    } catch (error) {
        res.status('router/user')
        res.status(500).json({
            success: false,
            message: 'Some Error Occured',
        })
    }
})


// GEt a single user
router.get('/:id' , async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('name phone email isAdmin');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some Error Occured"
        })
    }
    
})


// Create a  new User
router.post('/register' , async (req , res) => {
    try{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
        user = await user.save();
        res.status(200).send("User Created Successfully")
    }catch(err){
        console.log('routes/users');
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})


// LoggingIn a user
router.post('/login' , async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        if(!user){
            res.status(400).send({
                success: false,
                message: "User Not Found"
            })
        }else{
            if(bcrypt.compareSync(req.body.password , user.passwordHash)){
                const secret = process.env.SECRET
                const token = jwt.sign(
                    {
                        userId: user.id,
                        isAdmin: user.isAdmin
                    },
                    secret,
                    {
                        expiresIn: '1d'
                    }
                )
                res.status(200).send({
                    success: true,
                    message: "User Authenticated",
                    token: token
                })
            }
            else{
                res.status(400).send({
                    success: false,
                    message: "User Not Authenticated"
                });
            }
        }
        
    }catch(error){
        console.log("routes/users")
        res.status(400).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Getting the user count
router.get('/get/count' , async (req, res) => {
    try {
        const userCount = await User.countDocuments((count) => count);
        res.status(200).send({
            count : userCount
        })
    } catch (error) {
        console.log('routes/users');
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Delete a user
// Delete a product
router.delete('/:id' , async (req, res) => {
    try{
        mongoose.isValidObjectId(req.params.id)
        const result = await User.findByIdAndDelete(req.params.id);
        if(!result)
        {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    }catch(err){
        console.log('routes/users');
        res.status(400).json({
            success: false,
            message: "Some Error Occured"
        })
    }
})

module.exports =router;