const ErrorRes = require('../utilities/error');

 const errorHandler = (err, req, res, next) => {
// create a variable that inherits all properties of err with spread operators
  let error = {...err};

  error.message = err.message;

    console.log(error);
    console.log(err.stack.red.bold);

    if (err.name == 'CastError'){
      error = new ErrorRes(`The resource id ${err.value} is not valid`, 400);
    }

    if (err.name == 'ValidationError'){
      message = Object.values(err.errors).map(val => val.message)
      error = new ErrorRes(message, 400);
    }

    if(err.code === 11000){
      value = Object.keys(err.keyValue).map(val => val)
      // message = Object.values(err.errors).map(val => val.message)
      error = new ErrorRes(`${value} already exist`, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
  }

  module.exports  = errorHandler;
