const express = require('express');
const router = express.Router();

const LocalItem = require('../models/localitem');

/*
 The code below handles request for comparing a list 
 of global products with our local item databases 
 to return the total price from both stores for comparin
 It receives a JSON array of products and it should return a 
 JSON file with the total price from all stores. 
*/ 
router.post('/', async (req, res, next) => {

    // retrieve items from both stores
    const Malarasa = await LocalItem.find({ STORE: "MALARASA" })
    const WallyWorld = await LocalItem.find({ STORE: "WALLY WORLD" })
    const items = req.body.items

    let malarasaPrice = 0;
    let WallyWorldPrice = 0;
        console.log(items);
    // itiriate through the requested items
    items.map((item) => {

        // compare with Malarasa items
        Malarasa.map(malarasaItem => {
            if (malarasaItem.NAME === item.name) {
                malarasaPrice = malarasaPrice + (malarasaItem.PRICE * item.quantity)
            }
	})
        // compare with WallyWorld items
        WallyWorld.map(WallyWorldItem => {
            if (WallyWorldItem.NAME === item.name) {
                WallyWorldPrice = WallyWorldPrice + (WallyWorldItem.PRICE * item.quantity)
            }
	})
    })
            res.status(200).json([
                {
                    store: "MALARASA",
                    finalPrice: malarasaPrice
                },
                {
                    store: "Wally World",
                    finalPrice: WallyWorldPrice
                }
            ])

});


module.exports = router;