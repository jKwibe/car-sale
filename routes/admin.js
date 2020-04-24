
const express = require('express');
const router = express.Router();

const {protectedRoutes, authorizeRole} = require('../middleware/auth');

const {
 addCar,
 updateCar,
 deleteCar
} = require('../controllers/cars');

router.route('/')
      .post(protectedRoutes, authorizeRole('Admin'), addCar)
      .get();


router.route('/:id')
      .delete(protectedRoutes, authorizeRole('Admin'), deleteCar)
      .put(protectedRoutes, authorizeRole('Admin'), updateCar);

module.exports = router;
