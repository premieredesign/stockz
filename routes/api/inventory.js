const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Inventory = require('../../models/Inventory');

/*
    @Router GET api/inventory/all
    @desc get all stockZ inventory
    @private
 */
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = {};
    Inventory.find()
        .populate('user')
        .then((items) => {
            if (!items) {
                errors.noitemsininventory = 'No Items in Inventory';
                res.status(400).json(errors)
            }
            res.json(items);
        })
        .catch((e) => console.log({msg: 'Something went wrong'}))
});



module.exports = router;
