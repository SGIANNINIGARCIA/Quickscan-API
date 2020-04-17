const express = require('express');
const router = express.Router();

const LocalItem = require('../models/localitem');
const GlobalItems = require('../models/globalitem');


/*
The code below handles request 
for all items in our item database 
(used for the todo list).
It should return a JSON file with all the items, their UPC , name, and brand
*/
router.get('/', async (req, res, next) => {
    try {
        const globalItems = await GlobalItems.find();
        res.status(200).json(globalItems);
        console.log(globalItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
});

/*
The code below handles request 
for specific items in our store specific database 
(used for the todo list, and scan now feature).
It receives an UPK or ID and it should return a JSON file with the item name, price, and brand. 
*/
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    LocalItem.find({ID: id})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
           res.status(200).json(doc); 
        } else {
            res.status(404).json({
                message: "unable to find item with that id"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});  
/*
The code below handles request 
for items in our store specific database with UPC
(used for the todo list, and scan now feature).
It receives an UPC and it should return a JSON file with the all the items name, price, and brand. 
*/
router.get('/byupc/:productUPC', (req, res, next) => {
    const id = req.params.productUPC;
    LocalItem.find({UPC: id})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
           res.status(200).json(doc); 
        } else {
            res.status(404).json({
                message: "unable to find item with that upc"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

}); 


/*
The code below handles request 
for items in our store specific database with UPC
(used for the todo list, and scan now feature).
It receives an UPC and it should return a JSON file with the all the items name, price, and brand. 
*/
router.get('/bystore/:STORENAME', (req, res, next) => {
    const id = req.params.STORENAME;
    LocalItem.find({STORE: id})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
           res.status(200).json(doc); 
        } else {
            res.status(404).json({
                message: "unable to find item with that upc"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

}); 


/*
The code below handles post request 
to add a global item to the database
(used admin purposes and testing).
*/ 
router.post('/addglobalitem', async (req, res) => {
    const globalitem = new GlobalItems({
      UPC: req.body.UPC,
      NAME: req.body.NAME,
      DESCRIPTION: req.body.DESCRIPTION,
      MANUFACTURER: req.body.MANUFACTURER
    })
    await globalitem
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'globalitem has been posted',
            createdglobalitemPost: globalitem,
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
The code below handles post request 
to add a local item to the database
(used admin purposes and testing).
*/ 
router.post('/addlocallitem', async (req, res) => {
    const localitem = new LocalItem({
        STORE: req.body.STORE,
        ID: req.body.ID,
        UPC: req.body.UPC,
        PRICE: req.body.PRICE,
        QUANTITY: req.body.QUANTITY,
        NAME: req.body.NAME,
        DESCRIPTION: req.body.DESCRIPTION,
        MANUFACTURER: req.body.MANUFACTURER
    })
    await localitem
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'globalitem has been posted',
            createdlocalitemPost: localitem,
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
});  

module.exports = router;