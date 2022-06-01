const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    productID: {
        type: [mongoose.Types.ObjectId],
        required: true,
    },
    ownerID: {
        type: [mongoose.Types.ObjectId],
        required: true,
    },
    date: {
        type: [Date],
        default: Date.now
    }
});

const user = new mongoose.model('Wishlists', wishlistSchema);
module.exports = user;