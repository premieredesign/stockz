const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const inventory = require('./routes/api/inventory');

const app = express();

// Setup Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




// Setup MonogoDB
const db = require('./config/keys').mongoSRV;
mongoose
    .connect(db)
    .then(() => console.log('> Database: connected'))
    .catch((e) => console.error(e));




// Setup Passport
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);




// Routes setup
app.use('/api/users', users);
app.use('/api/inventory', inventory);


// Normal server startup
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('> Server: connected on', port)
});

