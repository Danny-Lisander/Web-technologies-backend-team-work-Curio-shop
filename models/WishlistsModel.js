const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
    },
    date: {
        type: [Date],
        default: Date.now
    }
});

const user = mongoose.model('Wishlists', wishlistSchema);
module.exports = user;