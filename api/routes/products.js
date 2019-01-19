const express = require('express');

//helps to create the function inside the app that will handle the routes using the express framework
const router = express.Router();

const mongoose = require('mongoose');

//import the model files for the products
const Product = require('../models/product');

//now we use the router to register different routes with different HTTP methods
router.get('/', (req, res, next) => {
    Product.find(/**nothing means, all here */)
        .exec()
        .then(docs => {
            console.log(docs);
            // if (docs.length >=0){
                res.status(200).json(docs);
            // }
            // else {
            //     res.status(404).json({message: 'No entries found'});
            // }            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); 
});

router.post('/', (req, res, next) => {
    /* 
    const product = {
         //this will check from the request body
         name: req.body.name, //now this 'name' is as per we want the api user to send the requests and this should be there in the documentation
         price: req.body.price
     };
 */
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product //this format is 'promise'
        .save() //mongoose built-in saveing function for the database
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'POST request to /products is working',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

//in express for the variable we use collan
router.get('/:productId',(req, res, next) => {
    //going in more complex way, we can check for the id in the url
    const id = req.params.productId;
/*    if(id === 'special')
        res.status(200).json({
            message: 'Special product shown',
            id: id
        });
    else
        res.status(200).json({
            message:'There was some error'
        });*/
        Product
            .findById(id)
            .exec()
            .then(doc => {
                console.log(doc);
                if (doc) {
                    //the response status return is here because all the methods of Product runs asynchronously
                res.status(200).json(doc/**though you can add here body of the object */);
                }
                else {
                    res.status(404).json({message: 'No valid entry found'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
});

router.patch('/:productId', (req, res, next) => { //this method an only update the existing values and can't add some new values
    // res.status(200).json({
    //     message:'UPDATED the id'
    // });
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    //if you want to send another response in the same method, you can do it here as below, but you need to use 'return' for the first one
    /* 
     res.status(400).json({
        message: 'another response in patch request'
     }); 
    */

});

router.delete('/:productId', (req, res, next) => {
/*    res.status(200).json({
        message:'DELETEd the id'
    });
*/
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//helps to export the particular file(here: router) and this can be used now in other files after importing
module.exports = router;