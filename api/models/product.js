const mongoose = require('mongoose');

//creates schema
const productSchema = mongoose.Schema({
    //what the product should have
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

//export module of mongoose with the arguments variable and it's schema 
module.exports = mongoose.model('Product', productSchema);