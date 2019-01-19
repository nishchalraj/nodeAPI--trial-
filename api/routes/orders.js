const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

//import the controller of the routes
const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_set_new);

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