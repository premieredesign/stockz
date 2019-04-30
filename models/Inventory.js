const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Inventory Schema
const InventorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    shoeimage: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    upc: {
        type: Number,
        required: true
    }
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
