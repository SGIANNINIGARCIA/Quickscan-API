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
    const items = {
        items: req.body.items
    }

    let malarasaPrice = 0;
    let WallyWorldPrice = 0;

    // itiriate through the requested items
    items.items.map((item) => {

        // compare with Malarasa items
        Malarasa.map(malarasaItem => {
            if (malarasaItem.NAME === item.name) {
                malarasaPrice += malarasaItem.PRICE
            }
        })
        // compare with WallyWorld items
        WallyWorld.map(WallyWorldItem => {
            if (WallyWorldItem.NAME === item.name) {
                WallyWorldPrice += WallyWorldItem.PRICE
            }
        })
    }).then(() => {
        (
            res.status(200).json([
                {
                    store: "MALARASA",
                    finalPrice: malarasaPrice
                },
                {
                    store: "Wally World",
                    finalPrice: WallyWorldPrice
                }
            ]))
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });

});


module.exports = router;