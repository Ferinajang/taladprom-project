const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const orderSchema = mongoose.Schema({
    customerName :{
        type: Schema.Types.String,
        ref:'User'
    },
    customerID :{
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
    namePD: {
        type: String,
    },
    pricePD: {
        type: String,
    },
    quantityPD: {
        type:String,
    },
    dateOrder: {
        type:String,
    },
    shippingCostPD: {
        type:String,
    },
    imagesPayment: {
        type:String,
    },
    totalPrice: {
        type:String,
    },
    status: {
        type:String,
    },
    trackingNumber: {
        type:String,
    }, 
    imagesPD1: {
        type:String,
    }, 
})


const Order = mongoose.model('Order', orderSchema);

module.exports = { Order }