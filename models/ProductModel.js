const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: [Number],
        required: true
    },
    currency:{
      type: String,
      required: true,
      default: 'KZT'
    },
    ownerID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: 'good stuff for dead inside'
    },
    date: {
        type: [Date],
        default: Date.now
    },
    approved:{
        type: [Boolean],
        default: false
    },
    imgSrc:{
        type: String,
        default: ''
    }
});

const user = new mongoose.model('Products', ProductSchema);
module.exports = user;