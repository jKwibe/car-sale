const express = require('express');
const router = express.Router();
const { protectedRoutes, authorizeRole } = require('../middleware/auth');
const {
  createReview,
  updateReview ,
  deleteReview
} = require('../controllers/reviews');

router.route('/:carId')
      .post(protectedRoutes, authorizeRole('User'), createReview)

router.route('/:carId/:id')
      .put(protectedRoutes, authorizeRole('User'), updateReview)
      .delete(protectedRoutes, authorizeRole('User'), deleteReview)

module.exports = router;
