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
      required: false,
      default: 'KZT'
    },
    ownerID: {
        type: [mongoose.Types.ObjectId],
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
        type: String,
        default: "false"
    },
    imgSrc:{
        data: Buffer,
        contentType: String
    }
});

const user = mongoose.model('Products', ProductSchema);
module.exports = user;