const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const itemRoutes = require('./api/routes/Items');
const barcodeRoutes = require('./api/routes/barcode');
const compareRoutes = require('./api/routes/compare');



//DATABASE CONNECTION 
mongoose.connect('mongodb+srv://private@quickscan-sfjsg.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

////////////// SOME MIDDLEWARE //////////////// 
// Morgan logs when a request and a response has happened. //
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//might do the same as above
app.use(express.json());

// Route for items
app.use('/items', itemRoutes);
// Route for barcode
app.use('/barcode', barcodeRoutes);

app.use('/compare', compareRoutes);

// Error handling
app.use((req, res, next) =>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
        message: error.message
        }
    });
});

module.exports = app;
