const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    res.status(200).json({
        message:'GET request to /orders is working'
    });
});

router.post('/', checkAuth, (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message:'Order was created',
        order: order
    });
});

router.get('/:orderId', checkAuth, (req, res, next) => {
    res.status(200).json({
        message:'Order details',
        orderId: req.params.orderId
    });
});


router.delete('/:orderId', checkAuth, (req, res, next) => {
    res.status(200).json({
        message:'Order deleted'
    });
});

module.exports = router;