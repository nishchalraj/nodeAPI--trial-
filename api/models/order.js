const Order = require('../models/order'); //in case any other detail of the routes while making the proper controller comes up then import those other things too

exports.orders_get_all = (req, res, next) => {
    res.status(200).json({
        message:'GET request to /orders is working'
    });
}

exports.order_set_new =  (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message:'Order was created',
        order: order
    });
}

//do the same for all the routes of orders here and products in the separate file and hence out controller is done