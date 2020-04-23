
const express = require('express');
const dotenv  = require('dotenv');
const logger  = require('morgan');
const colors = require('colors');
const helmet = require('helmet');

const app     = express();

const errorHandler = require('./middleware/error');

dotenv.config({path: './config/config.env'});


//import the database connection
const databaseConnection = require('./config/db');

const carsRoutes =  require('./routes/cars');
const adminRoutes = require('./routes/admin');

const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet());

databaseConnection();


if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'))
}

app.use('/api/v1/cars',carsRoutes);
app.use('/api/v1/admin',adminRoutes);

//Error Handler
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server connected on ${process.env.NODE_ENV} on port ${PORT}`.yellow.inverse);
})
