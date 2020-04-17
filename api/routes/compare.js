const express = require('express');
const router = express.Router();

const LocalItem = require('../models/localitem'); 

router.post('/', async (req, res, next) => {
    
    // retrieve items from both stores
    const Malarasa = await LocalItem.find({STORE: "MALARASA"})
    const WallyWorld = await LocalItem.find({STORE: "WALLY WORLD"})

    const items = {
        items: req.body.items
    }

    let malarasaPrice = 0;
    let WallyWorldPrice = 0;

    // itiriate through the requested items
    items.items.map((item) => {
       
        // compare with Malarasa items
        Malarasa.map(malarasaItem => {
            if(malarasaItem.NAME === item.name){
                malarasaPrice += malarasaItem.PRICE
            }
        })
        // compare with WallyWorld items
        WallyWorld.map(WallyWorldItem => {
            if(WallyWorldItem.NAME === item.name){
                WallyWorldPrice += WallyWorldItem.PRICE
            }
        })
    })
    if(malarasaPrice < WallyWorldPrice){
        res.status(200).json({
            store: "MALARASA",
            finalPrice: malarasaPrice
        });
    } else {
        res.status(200).json({
            store: "Wally World",
            finalPrice: WallyWorldPrice
        });
    }
});  


module.exports = router;