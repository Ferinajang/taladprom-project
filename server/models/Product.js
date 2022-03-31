const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const productSchema = mongoose.Schema({
    writer :{
        type: Schema.Types.String,
        ref:'User'
    },
    writerName :{
        type: Schema.Types.String,
        ref:'User'
    },
    shopName:{
        type: Schema.Types.String,
        ref:'User'

    },
    shopID:{
        type: Schema.Types.String,
        ref:'User'
    },
    namePD:{
        type : String,
        maxlength :50
    },
    descripstionPD: {
        type: String,
    },
    pricePD: {
        type :Number,
        default:0
    },
    quantityPD:{
        type : Number,
        default:0
    },
    shippingCostPD :{
        type: Number,
        default:0
    },
    imagesPD1: {
        type:String,
    },
    imagesPD2: {
        type:String,
    },
    imagesPD3: {
        type:String,
    },
    imagesPD4: {
        type:String,
    },
    imagesPD5: {
        type:String,
    },
    imagesPD6: {
        type:String,
    },
    imagesPD7: {
        type:String,
    },
    imagesPD8: {
        type:String,
    },
    imagesPD9: {
        type:String,
    },
    imagesPD10: {
        type:String,
    },
    continentsPD:{
        type : Number,
        default:1
    },
    sold:{
        type :Number,
        maxlength: 100,
        default:0
    },
    views:{
        type: Number,
    },
    positionShop:{
        type:String,

    },
    recommended:{
        type:String,
    }
})

productSchema.index({
    namePD:'text',
    descripstionPD:'text'

},{
    weights:{
        namePD:5,
        descripstionPD:1,
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }