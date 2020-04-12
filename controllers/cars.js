
// @desc    Fetch all cars
// @desc    GET /api/v1/car-sales/
// @access  Public

exports.getAllCars = (req, res, next)=>{

  res.status(200).json({
    success: true
  });
};


// @desc    Fetch a single car
// @desc    GET /api/v1/car-sales/:id
// @access  Public

exports.getSingleCar = (req, res, next) => {

  res.status(200).json({
    success: true
  });
};
