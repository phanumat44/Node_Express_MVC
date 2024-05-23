const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    img_url: {
        type: String,
    }
}, { timestamps: true });


module.exports = mongoose.model("products", productSchema);