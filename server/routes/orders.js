const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();


// GEt the list of orders in the system
router.get(`/`, async (req, res) =>{
    try {
        const orderList = await Order.find().populate('user' , 'name').sort({'dateOrdered' : -1});
        res.send(orderList);
    } catch (error) {
        console.log('router/order')
        res.status(500).json({success: false})
    }
})

// Place an order
//  NOt tested this api (video 60)
router.post('/' , async (req, res) => {
    try {
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }))

        const orderItemsIdsResolved = await orderItemsIds

        const totalPrices = await Promise.all(orderItemsIdsResolved.map( async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate('product' , 'price')
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }))

        const totalPrice = totalPrices.reduce((a,b) => a+b,0);

        let order = new Order({
        orderItems: orderItemsIdsResolved ,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
        })
        order = await order.save();
        res.status(201).send(order)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Get a single order
// Not tested this api(video 57)
router.get(`/:id` , async (req , res) => {
    try {
        mongoose.isValidObjectId(req.params.id)
        const order = await Order.findById(req.params.id).populate('user' , 'name').populate({ path : 'orderItems' , populate: { path: "product" , populate: 'category'}})
        res.status(200).send(order);
    } catch (error) {
        console.log('routes/order')
        res.status(500).json({
            success: false,
            message: "Some Error Occured"
        })
    }
    
})

// Update the status of the order
// Not tested this api (video 58)
router.put('/:id' , async (req, res) => {
    try{
        mongoose.isValidObjectId(req.params.id)
        await Order.findOneAndUpdate({_id: req.params.id}, {$set: {
            status: req.body.status
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
        console.log('routes/order')
        res.status(404).json({
            success: false,
            message: "Some Error Occured"
        })
    }
})

// Delete an order
// NOt tested this api (video 58)
router.delete('/:id', (req, res)=>{
    Order.findByIdAndDelete(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success: true, message: 'the order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "order not found!"})
        }
    }).catch(err=>{
        console.log('routes/orders')
       return res.status(500).json({success: false, message: "Some Error Occured"}) 
    })
})


// Total Sales
// Not tested this api(video 61)
router.get('/get/totalsales' , async (req , res) => {
    try{
        const totalSales = await Order.aggregate([
            { $group : { _id: null, totalsales : { $sum : '$totalPrice'}} }
        ])
        res.status(200).send({totalSales : totalSales.pop().totalsales})
    }catch(err){
        console.log('routes/orders')
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
    
})


// GEt the count of the orders
router.get('/get/count' , async (req, res) => {
    try {
        const orderCount = await Order.countDocuments((count) => count);
        res.status(200).send({
            count : orderCount
        })
    } catch (error) {
        console.log('routes/order');
        res.status(500).send({
            success: false,
            message: "Some Error Occured"
        })
    }
})

module.exports =router;