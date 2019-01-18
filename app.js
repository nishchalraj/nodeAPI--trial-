//this file will spin the express framework that will make the handling the requests a bit easier

const express = require('express');
const app = express(); //this helps us to use the utilities that express provides
const morgan = require('morgan');

//tells where the main router files are
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//works as a middle-ware
app.use(morgan('dev')); //this will log everything before reaching for the main routes through morgan installed as depedencies
/*
app.use((req, res, next) => {
    //use res to send a response with status and json response
    res.status(200).json({
        //pass a javascript object which automatically be stringified
        message:'message is working'
    });
});
*/
//sends the request coming for specifi file to the specific router file
app.use('/products', productRoutes);
//now the same forwading for orders
app.use('/orders', orderRoutes);

//catch the errors that will not match the above routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    //the below setup is totally upto us
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;