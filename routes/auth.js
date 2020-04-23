const express = require('express');
const router = express.Router();
const {protectedRoutes} = require('../middleware/auth');

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
      .get(protectedRoutes, loggedUser)

module.exports = router;
