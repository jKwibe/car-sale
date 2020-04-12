
const express = require('express');
const router = express.Router();

const {
  getAllCars,
  getSingleCar
} = require('../controllers/cars');

router.route('/')
        .get(getAllCars)

router.route('/:id')
      .get(getSingleCar)


module.exports = router;
