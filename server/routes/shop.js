const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Shop} = require("../models/Shop")

const { auth } = require("../middleware/auth");
console.log("dw");

//===============================
//             shop
//=================================

router.post("/uploadShop", auth, (req, res) => {
    const shop = new Shop(req.body)
    shop.save((err) =>{
        console.log("fff");
        if(err) return res.status(404).json({success:false,err})
        return res.status(200).json({success:true})
    })

});



router.post("/getShops", auth, (req, res) => {
    Shop.find()
    .exec((err,shops)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,shops})
    })

});
router.post("/getShopsById", auth, (req, res) => {
    console.log(req.body);
    Shop.findOne({ownerID: {$gte:req.body.id}})
    .exec((err,shops)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,shops})
        console.log(shops);
    })
});




router.get("/shop_by_id", auth, (req, res) => {
    let type = req.query.type
    let shopIds = req.query.id
    if(type === "array"){

    }
    Product.find({'_id':{$in:shopIds}})
    .populate('writer')
    .exec((err, product)=>{
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
    
});

module.exports = router;
