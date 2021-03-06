
const express = require('express');
const router = express.Router();

const {
  getAllCars,
  getSingleCar,
  addCar,
  deleteCar,
  updateCar
} = require('../controllers/cars');

router.route('/')
        .get(getAllCars)

router.route('/:id')
      .get(getSingleCar)


module.exports = router;
