const mongoose = require('mongoose');

const GlobalItemsSchema = mongoose.Schema({
        UPC: {
                type: String,
                required: true
        },
        NAME:{ 
                type: String,
                required: true
        },
        DESCRIPTION: { 
                type: String,
                required: true
        },
        MANUFACTURER: { 
                type: String,
                required: true
        },
});

module.exports = mongoose.model('GlobalItems', GlobalItemsSchema);