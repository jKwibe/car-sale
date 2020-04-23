
const express = require('express');
const router = express.Router();

const {
 addCar,
 updateCar,
 deleteCar
} = require('../controllers/cars');

router.route('/')
      .post(addCar);


router.route('/:id')
      .delete(deleteCar)
      .put(updateCar);

module.exports = router;
