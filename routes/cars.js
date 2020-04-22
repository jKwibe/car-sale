
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
        .post(addCar)

router.route('/:id')
      .get(getSingleCar)
      .delete(deleteCar)
      .put(updateCar)


module.exports = router;
