const ErrorRes = require('../utilities/error');

 const errorHandler = (err, req, res, next) => {
// create a variable that inherits all properties of err with spread operators
  let error = {...err};

  error.message = err.message;

    console.log(error);
    // console.log(err.stack.red.bold);

    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
  }
  
  module.exports  = errorHandler;