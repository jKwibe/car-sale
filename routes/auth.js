const express = require('express');
const router = express.Router();
const { protectedRoutes, authorizeRole } = require('../middleware/auth');
const {
  createReview,
  updateReview ,
  deleteReview
} = require('../controllers/reviews');

const {
  register,
  login,
  loggedUser
} = require('../controllers/auth');

router.route('/signup')
      .post(register)

router.route('/signin')
      .post(login);

router.route('/user')
      .get(protectedRoutes, authorizeRole('User'), loggedUser);

router.route('/reviews')
      .post(protectedRoutes, authorizeRole('User'), createReview)

router.route('/reviews/:id')
      .put(protectedRoutes, authorizeRole('User'), updateReview)
      .delete(protectedRoutes, authorizeRole('User'), deleteReview)

module.exports = router;
