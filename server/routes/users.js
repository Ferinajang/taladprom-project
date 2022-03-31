const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const {Product} = require("../models/Product")

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        address:req.user.address,
        cart:req.user.cart,
        orderUser:req.user.orderUser,
        shopID:req.user.shopID,
        shopName:req.user.shopName,
        history : req.user.history,
        positionShop:req.user.positionShop,
        recomendedItem:req.user.recomendedItem,
        playerCharacter:req.user.playerCharacter

    });
    console.log("back1");
});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/addToCart" ,auth,(req,res) =>{
    User.find({_id:req.user._id}
        ,(err,userInfo)=>{
        let duplicate = false;

        userInfo[0].cart.forEach((cartInfo) => {
            if (cartInfo.id == req.query.productId) {
                duplicate = true;
            }
        })
        
        if(duplicate){
            User.findOneAndUpdate(
                { _id : req.user._id,"cart.id" : req.query.productId},
                { $inc: { "cart.$.quantity":1}},
                {new:true},
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(userInfo[0].cart)
                }
            )
        }else{
            User.findOneAndUpdate(
                {_id:req.user._id},
                {
                    $push:{
                        cart:{
                            id:req.query.productId,
                            quantity:1,
                            date: Date.now()
                        }
                    }
                },
                {new:true},
                (err,userInfo)=>{
                    if(err) return res.json({success:false , err});
                    return res.status(200).json(userInfo.cart)
                }

            )

        }
    })

})


router.post("/addOrderToUser",auth,(req,res) =>{
    User.find({_id:req.user._id}
        ,(err,userInfo)=>{
            User.findOneAndUpdate(
                {_id:req.user._id},
                {
                    $push:{
                        orderUser:{
                            id: req.body._id,
                        }
                    }
                },
                {new:true},
                (err,userInfo)=>{
                    if(err) return res.json({success:false , err});
                    return res.status(200).json(userInfo.orderUser)
                    
                }

            )


    })
})
router.put("/editProfile", auth, (req, res) => {
    const profile = new User(req.body)
    User.findByIdAndUpdate(req.body.id,
        {$set:req.body},
        (error,profile)=>{
            if(error){
                return req.status(400).send(err)
            }else{
                return res.status(200).json({success:true,profile})
            }
        }) 
});

router.get('/removeFromCart', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$pull":
                { "cart": { "id": req.query._id } }
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({ '_id': { $in: array } })
                .populate('writer')
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,
                        cart
                    })
                })
        }
    )
})

router.get('/userCartInfo',auth,(req,res)=>{
    User.findOne(
        {_id :req.user._id},
        (err,userInfo)=>{
            let cart = userInfo.cart;
            let array = cart.map(item =>{
                return item.id
            })

            Product.find({'_id':{$in : array}})
            .populate('writer')
            .exec((err,cartDetail)=>{
                if(err) return res.status(400).send(err);
                return res.status(200).json({success:true,cartDetail , cart})

            })
        }
    )
})

module.exports = router;
