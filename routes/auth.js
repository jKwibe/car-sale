const express = require('express');
const router = express.Router();
const { protectedRoutes, authorizeRole } = require('../middleware/auth');
const { createReview } = require('../controllers/reviews');

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

module.exports = router;
