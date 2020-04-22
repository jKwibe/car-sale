
const express = require('express');
const dotenv  = require('dotenv');
const logger  = require('morgan');
const colors = require('colors');

const app     = express();

dotenv.config({path: './config/config.env'});

//import the database connection
const databaseConnection = require('./config/db');

const carsRoutes = require('./routes/cars');

const PORT = process.env.PORT || 3000;
app.use(express.json());

databaseConnection();


if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'))
}

app.use(carsRoutes);



app.listen(PORT, ()=>{
    console.log(`Server connected on ${process.env.NODE_ENV} on port ${PORT}`.yellow.inverse);
})
