const mongoose = require("mongoose");

const products = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product", products)