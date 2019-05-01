const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const isEmpty = require('../../validation/is-empty');

// Load User Model
const User = require('../../models/User');

// Load Inventory Model
const Inventory = require('../../models/Inventory');

// Load Inventory Input Validation
const validateInventoryInput = require('../../validation/inventory');

/*
    @Router GET api/inventory/all
    @desc get all stockZ inventory
    @access private
 */
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = {};
    Inventory.find()
        .populate('user')
        .then((items) => {
            if (isEmpty(items)) {
                errors.noitemsininventory = 'No Items in Inventory';
                res.status(400).json(errors)
            }
            res.json(items);
        })
        .catch((e) => console.log({msg: 'Something went wrong'}))
});


/*
    @Router POST api/inventory
    @desc post/upload stockz inventory
    @access private
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateInventoryInput(req.body);

    if (!isValid) {
        res.status(400).json(errors)
    }

    const newInventory = new Inventory({
        brand: req.body.brand,
        style: req.body.style,
        size: req.body.size,
        upc: req.body.upc,
        shoeimage: req.body.shoeimage
    });
    newInventory.save()
        .then(() => {
            Inventory.find()
                .then((items) => {
                    res.json(items)
                })
        });

});


/*
    @Route POST api/posts/unlike/:id
    @desc unlike a post
    @access private
 */
router.post('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log('req', req.params.id);
    Inventory.findOneAndRemove({_id: req.params.id})
        .then(() => {
            Inventory.find()
                .then((items) => {
                    res.json(items)
                })
        });
});





module.exports = router;
