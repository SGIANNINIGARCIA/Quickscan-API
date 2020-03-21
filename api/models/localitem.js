const mongoose = require('mongoose');

const LocalItemSchema = mongoose.Schema({
    
    STORE: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true
    },
    UPC: {
        type: String,
        required: true
    },
    PRICE: {
        type: Number,
        required: true
    },
    QUANTITY: {
        type: String,
        required: false
    },
    NAME: {
        type: String,
        required: true
    },
    DESCRIPTION: {
        type: String,
        required: false
    },
    MANUFACTURER: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LocalItem', LocalItemSchema);
