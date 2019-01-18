//this file will spin the express framework that will make the handling the requests a bit easier

const express = require('express');
const app = express(); //this helps us to use the utilities that express provides

//works as a middle-ware
app.use((req, res, next) => {
    //use res to send a response with status and json response
    res.status(200).json({
        //pass a javascript object which automatically be stringified
        message:'message is working'
    });
});

module.exports = app;