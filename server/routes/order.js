const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Order} = require("../models/Order")

const { auth } = require("../middleware/auth");
//===============================
//             shop
//=================================

router.post("/createOrder", auth, (req, res) => {
    const order = new Order(req.body)
    order.save((err) =>{
        if(err) return res.status(404).json({success:false,err})
        return res.status(200).json({success:true,order})
    })
});



router.post("/getOrders", auth, (req, res) => {
    Order.find()
    .exec((err,orders)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,orders})
})
 });



router.put("/editConfirmOrder", auth, (req, res) => {
    const profile = new Order(req.body)
    Order.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,profile)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,profile})
            }
        }) 
});
router.put("/rejectOrder", auth, (req, res) => {
    const profile = new Order(req.body)
    Order.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,profile)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,profile})
            }
        }) 
});


 
// router.post("/getShopsById", auth, (req, res) => {
//     console.log(req.body);
//     Shop.findOne({ownerID: {$gte:req.body.id}})
//     .exec((err,shops)=>{
//         if(err) return res.status(400).json({success:false,err})
//         res.status(200).json({success:true,shops})
//         console.log(shops);
//     })
// });
// router.get("/order_by_id", auth, (req, res) => {
//     console.log('fdkl;kmfgpk');
//     let type = req.query.type
//     let productIds = req.query.id
//     let ids = req.query.id.split(',');
//         orderIds = [];
//         orderIds = ids.map(item => {
//             return item
//         })
//     Order.find({'_id':{$in:orderIds}})
//     .populate('writer')
//     .exec((err, order)=>{
//         if(err) return res.status(400).json({success:false,err})
//         return res.status(200).json({success:true,order})
//     })
    
// });

router.get("/order_by_id", auth, (req, res) => {
   let type = req.query.type
   let orderIds = req.query.id

     if (type === "array") {
       let ids = req.query.id.split(',');
       orderIds = [];
       orderIds = ids.map(item => {
           return item
       })
   }
   Order.find({'_id':{$in:orderIds}})
   .populate('writer')
   .exec((err, order)=>{
       if(err) return res.status(400).send(err)
       return res.status(200).send(order)
   })
   
});




// router.get("/shop_by_id", auth, (req, res) => {
//     let type = req.query.type
//     let shopIds = req.query.id
//     if(type === "array"){

//     }
//     Product.find({'_id':{$in:shopIds}})
//     .populate('writer')
//     .exec((err, product)=>{
//         if(err) return req.status(400).send(err)
//         return res.status(200).send(product)
//     })
    
// });

module.exports = router;
