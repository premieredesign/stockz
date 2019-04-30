const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Inventory Schema
const InventorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    add: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            item: {
                type: String
            }
        }
    ],
    remove: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            item: {
                type: String
            }
        }
    ],
    inventory: [
        {
            brand: {
                type: String,
                required: true
            },
            style: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            upc_id: {
                type: String,
                required: true
            },
        }
    ],
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);
