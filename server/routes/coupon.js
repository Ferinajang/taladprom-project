const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Coupon} = require("../models/Coupon")

const { auth } = require("../middleware/auth");
//===============================
//             shop
//=================================

router.post("/createCoupon", auth, (req, res) => {
    const coupon = new Coupon(req.body)
    coupon.save((err) =>{
        console.log("fff");
        if(err) return res.status(404).json({success:false,err})
        return res.status(200).json({success:true,coupon})
    })
});



router.post("/getCoupon", auth, (req, res) => {
    Coupon.find()
    .exec((err,coupon)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,coupon})
})
 });

 router.post("/getCouponUser", auth, (req, res) => {
    Coupon.find({OwnerID:req.body.OwnerID})
    .exec((err,coupon)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,coupon})
})
 });

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
        if(err) return req.status(400).send(err)
        return res.status(200).send(order)
    })
    
});

router.put("/addOwnerCoupon", auth, (req, res) => {
    const ownerCoupon = new Coupon(req.body)
    console.log("ffffffgf",req.body);
    Coupon.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,ownerCoupon)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,ownerCoupon})
            }
        }) 
});

router.put("/updateCouponUsed", auth, (req, res) => {
    const couponUsed = new Coupon(req.body)
    Coupon.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,couponUsed)=>{
            if(error){
                return res.status(400).json({success:false,err})
            }else{
                return res.status(200).json({success:true,couponUsed})
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
router.get("/order_by_id", auth, (req, res) => {
    let type = req.query.type
    let productIds = req.query.id
    let ids = req.query.id.split(',');
        orderIds = [];
        orderIds = ids.map(item => {
            return item
        })
    Order.find({'_id':{$in:orderIds}})
    .populate('writer')
    .exec((err, order)=>{
        if(err) return req.status(400).send(err)
        return res.status(200).send(order)
    })
    
});


module.exports = router;
