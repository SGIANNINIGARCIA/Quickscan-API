const mongoose = require('mongoose');

const barcodeSchema = mongoose.Schema({
    barcodeNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    items: {
        type: [Object],
        required: false
    }
});

module.exports = mongoose.model('Barcode', barcodeSchema);