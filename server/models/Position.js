const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const positionSchema = mongoose.Schema({
    shop1:{
        type : Boolean,
        default:false   
    },
    shop2: {
        type : Boolean,
        default:false   
    },
    shop3: {
        type : Boolean,
        default:false   
    },
    shop4: {
        type : Boolean,
        default:false   
    },
    shop5: {
        type : Boolean,
        default:false  
    },
    shop6: {
        type : Boolean,
        default:false   
    },
    shop7: {
        type : Boolean,
        default:false   
    },
    shop8: {
        type : Boolean,
        default:false   
    },
    shop9: {
        type : Boolean,
        default:false   
    },
    shop10: {
        type : Boolean,
        default:false   
    },
    shop11: {
        type : Boolean,
        default:false   
    },
    shop12: {
        type : Boolean,
        default:false   
    },



    
})


const Position = mongoose.model('Position', positionSchema);

module.exports = { Position }