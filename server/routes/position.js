const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Position} = require("../models/Position")

const { auth } = require("../middleware/auth");
//===============================
//             shop
//=================================

router.post("/create", auth, (req, res) => {
    const position = new Position(req.body)
    position.save((err) =>{
        if(err) return res.status(404).json({success:false,err})
        return res.status(200).json({success:true,position})
    })
});



router.post("/getposition", auth, (req, res) => {
    Position.find()
    .exec((err,position)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,position})
})
 });

 router.put("/editPosition", auth, (req, res) => {
    const position = req.body;
    Position.findByIdAndUpdate("622fa7e4374d6e188407dc0f",
        {$set:req.body},
        (error,position)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,position})
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
