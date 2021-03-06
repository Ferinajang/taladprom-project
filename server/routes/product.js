const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require("../models/Product")
const { auth } = require("../middleware/auth");
//===============================
//             Product
//=================================
router.post("/uploadImage", auth, (req, res) => {
    console.log("h");
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/uploadProduct", auth, (req, res) => {
    const product = new Product(req.body)
    product.save((err) =>{
        if(err) return res.status(404).json({success:false,err})
        return res.status(200).json({success:true})
    })

});

router.post("/getProducts", (req, res) => {
    let order = req.body.order ? req.body.order:"desc";
    let sortBy = req.body.sortBy ? req.body.sortBy:"_id";
    let skip = parseInt(req.body.skip);
    let findArg ={};
    let term = req.body.searchTerm;

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === "pricePD"){
                findArg[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }

            }else {
                findArg[key] = req.body.filters[key];
            }
        }
    }
    console.log(findArg);
    

    if(term){
        Product.find(findArg)
        .find({$text:{$search:term}})
        .populate("writer")
        .sort([[sortBy,order]])
        .skip(skip)
        .exec((err,products)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true,products})
        })    

    }else{
        Product.find(findArg)
        .populate("writer")
        .sort([[sortBy,order]])
        .skip(skip)
        .exec((err,products)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true,products})
        })
    }

});

//?id=${productId}&type=single
router.get("/product_by_id", auth, (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

      if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }
    Product.find({'_id':{$in:productIds}})
    .populate('writer')
    .exec((err, product)=>{
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
    
});


router.put("/update/:id", auth, (req, res) => {
    const product = new Product(req.body)
    console.log(req.params.id);
    Product.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        (error,product)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).send(product)
            }
        }) 
});
router.post("/getProductToGame", auth, (req, res) => {
    Product.find()
    .exec((err,product)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,product})
    })
});

router.put("/addRecommendedProduct", auth, (req, res) => {
    const recommendedProduct = new Product(req.body)
    Product.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,recommendedProduct)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,recommendedProduct})
            }
        }) 
});


router.put("/updateQuantityCancelOrder", auth, (req, res) => {
    const recommendedProduct = new Product(req.body)
    Product.findByIdAndUpdate({_id:req.body.id},
        {$set:req.body},
        (error,recommendedProduct)=>{
            if(error){
                return res.status(400).json({success:false,error})
            }else{
                return res.status(200).json({success:true,recommendedProduct})
            }
        }) 
});

router.put("/updateQuantityAdd", auth, (req, res) => {
    const product = new Product(req.body)
    Product.findByIdAndUpdate({_id:req.body.id},
        {$set:req.body},
        (error,product)=>{
            if(error){
                return res.status(400).json({success:false,error})
            }else{
                return res.status(200).json({success:true,product})
            }
        }) 
});

router.post("/getProductByID", auth, (req, res) => {
    Product.find({namePD:req.body.namePD})
    .exec((err,productOrder)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,productOrder})
})
 });

 router.post("/getProductByIDGamePDDetail", auth, (req, res) => {
    Product.find({id:req.body.id})
    .exec((err,product)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,product})
})
 });



 
router.put("/deleteProductByID", auth, (req, res) => {
    Product.findByIdAndDelete({_id:req.body.id},
        (error,product)=>{
            if(error){
                return res.status(400).json({success:false,error})
            }else{
                return res.status(200).json({success:true,product})
            }
        }) 
});

 router.post("/getProductByIDEdit", auth, (req, res) => {
    Product.find({_id:req.body.id})
    .exec((err,product)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,product})
})
 });





module.exports = router;
