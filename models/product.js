const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    countInStock: Number,
    countSmall: Number,
    countMedium: Number,
    countLarge: Number,
    countXL: Number
    });

module.exports = mongoose.model('Product', product);

