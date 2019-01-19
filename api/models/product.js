const mongoose = require('mongoose');

//creates schema
const productSchema = mongoose.Schema({
    //what the product should have
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true}, //this will make sure that the name and price field are passed and are required
    price: {type: Number, require: true}
});

//export module of mongoose with the arguments variable and it's schema 
module.exports = mongoose.model('Product', productSchema);