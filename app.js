//this file will spin the express framework that will make the handling the requests a bit easier

const express = require('express');
const app = express(); //this helps us to use the utilities that express provides
const morgan = require('morgan');
const bodyParser = require('body-parser'); //body parser
const mongoose = require('mongoose'); //database

//tells where the main router files are
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//connect to database with the password in the environment variable
mongoose.connect(
'mongodb://admin:' + 
   process.env.MONGO_ATLAS_PW + 
    '@nodeapi--trial--shard-00-00-4h3kh.mongodb.net:27017,nodeapi--trial--shard-00-01-4h3kh.mongodb.net:27017,nodeapi--trial--shard-00-02-4h3kh.mongodb.net:27017/test?ssl=true&replicaSet=nodeAPI--trial--shard-0&authSource=admin&retryWrites=true',
    {
        useMongoClient: true
    }
);

mongoose.Promise = global.Promise;

//works as a middle-ware
app.use(morgan('dev')); //this will log everything before reaching for the main routes through morgan installed as depedencies
app.use(bodyParser.urlencoded({extended: false})); //parser middle ware and it will parse urlencoded body
app.use(bodyParser.json()); //json type body-parser middle ware
app.use((req, res, next) => {
    //for the response header in the response
    res.header("Access-Control-Allow-Origin", "*"); //star shows that access is given to any origin of the request
    res.header("Access-Control-Allow-Header",
    "Origin,X-Requested-With, Content-Type, Authorization");
    if(req.method === 'OPTIONS')//'method' is for the http methods we have used
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //those methods which you want to support through the API
        res.status(200).json({});
    }
    next(); //this will not block the request in the middle ware and hence will pass the requests to the specific routers
});
/*
app.use((req, res, next) => {
    //use res to send a response with status and json response
    res.status(200).json({
        //pass a javascript object which automatically be stringified
        message:'message is working'
    });
});
*/
//sends the request coming for specific file to the specific router file
//routes which should handle requests
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