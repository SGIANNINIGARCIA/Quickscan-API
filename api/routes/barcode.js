const express = require('express');
const router = express.Router();

const Barcode = require('../models/barcode');

/*
The code below handles request 
for specific items in our store specific database 
(used for the todo list, and scan now feature).
It receives an UPK or ID and it should return a JSON file with the item name, price, and brand. 
*/ 
router.post('/', async (req, res, next) => {
    const barcode = new Barcode({
        barcodeNumber: req.body.barcodeNumber,
        price: req.body.price,
        items: req.body.items,
    });
    await barcode
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'barcode has been posted',
            createdBarcodePost: barcode,
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});  

/*
The code below handles get request 
for all barcodes in our database
(used admin purposes and testing).
It returns a JSON object array with all barcodes
*/ 
router.get('/', async (req, res, next) => {
    try {
	const allbarcodes = await Barcode.find();
        res.status(200).json(allbarcodes);
        console.log(allbarcodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

/*
The code below handles get request 
for a barcode in our database.
It returns a JSON object array with the requested barcode information
*/ 
router.get('/:barcodeNum', async (req, res, next) => {
    const barcodeNum = req.params.barcodeNum;
    try {
	const barcode = await Barcode.find({barcodeNumber: barcodeNum});
        res.status(200).json(barcode);
        console.log(barcode);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});


module.exports = router;
