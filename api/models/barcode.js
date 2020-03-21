const mongoose = require('mongoose');

const barcodeSchema = mongoose.Schema({
    barcodeNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Barcode', barcodeSchema);