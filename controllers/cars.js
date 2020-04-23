const asyncHandler = require('express-async-handler');

const Cars = require('../models/Cars');

const ErrorRes = require('../utilities/error');

// @desc    Fetch all cars
// @desc    GET /api/v1/car-sales/
// @access  Public

exports.getAllCars = async (req, res, next)=>{

  const allCars = await Cars.find()

  res.status(200).json({
    success: true,
    count: allCars.length,
    data: allCars
  });
};


// @desc    Fetch a single car
// @desc    GET /api/v1/car-sales/:id
// @access  Public

exports.getSingleCar = asyncHandler(async (req, res, next) => {
      const car = await Cars.findById(req.params.id);

      if (!car){
      return next(new ErrorRes(`Car not found with the id ${req.params.id}`, 400))
      }

      res.status(200).json({
        success: true,
        data: car
      });

});

// @desc    Add a car
// @desc    POST /api/v1/admin/car
// @access  Private

exports.addCar = asyncHandler(async (req, res, next) => {
  // request the body for content
  const carInfo = req.body;

    const cars = await Cars.create(carInfo);
    res.status(201).json({
      success: true,
      data: cars
    });

});

// @desc    Delete a car
// @desc    POST /api/v1/admin/car
// @access  Private

exports.deleteCar = asyncHandler(async(req, res, next)=>{

  const car = await  Cars.findById(req.params.id);

  if(!car){
    return next(new ErrorRes(`Car not found with the id ${req.params.id}`, 400))
  }
    car.remove()
    res.status(200).json({ success: true});
});

// @desc    Update a car
// @desc    PUT /api/v1/admin/car
// @access  Private

exports.updateCar = asyncHandler(async (req, res, next) =>{
  try {
    const car = await Cars.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    })

    if (!car){
      return next(new ErrorRes(`Car not found with the id ${req.params.id}`, 400))
    }
    res.status(200).json({success: true})
  } catch (error) {
    next(error)
  }
});
