const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const shopSchema = mongoose.Schema({
    ownerID :{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    ownerName :{
        type: Schema.Types.String,
        ref:'User'
    },
    nameShop:{
        type : String,
        maxlength :50
    },
    descripstionShop: {
        type: String,
    },
    emailShop: {
        type: String,
    },
    phoneNumberShop: {
        type: String,
    },
    imagesShop: {
        type:String,
    },
    positionShop: {
        type:String,
    },
    
})


const Shop = mongoose.model('Shop', shopSchema);

module.exports = { Shop }