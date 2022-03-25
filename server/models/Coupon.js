const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const couponSchema = mongoose.Schema({
    OwnerName :{
        type: Schema.Types.String,
        ref:'User'
    },
    OwnerID :{
        type: Schema.Types.String,
        ref:'User'
    },
    shopName:{
        type : String,
        maxlength :50
    },
    shopID: {
        type: String,
    },
    dateCoupon: {
        type:String,
    },
    dateTimeOut: {
        type:String,
    },
    typeCoupon: {
        type:String,
    },
    minimumCost: {
        type:Number,
    },
    status:{
        type:String
    },
    discount:{
        type:Number
    },
    nameCoupon:{
        type:String
    }
    
})


const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = { Coupon }