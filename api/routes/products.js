const express = require('express');

//helps to create the function inside the app that will handle the routes using the express framework
const router = express.Router();

//now we use the router to register different routes with different HTTP methods
router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'GET request to /products is working'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message:'POST request to /products is working'
    });
});

//in express for the variable we use collan
router.get('/:productId',(req, res, next) => {
    //going in more complex way, we can check for the id in the url
    const id = req.params.productId;
    if(id === 'special')
        res.status(200).json({
            message: 'Special product shown',
            id: id
        });
    else
        res.status(200).json({
            message:'There was some error'
        });
});

//helps to export the particular file(here: router) and this can be used now in other files after importing
module.exports = router;