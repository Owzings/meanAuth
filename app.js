const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('You are connected to the databse'+config.database);
});

mongoose.connection.on('errror', (err) => {
    console.log('Error connecting to the databse'+err);
});


const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/users',users);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send('Invalid URL');
})

app.listen(port, () =>{
    console.log('Server starting on port '+ port);
})