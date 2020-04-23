const express = require('express');
const router = express.Router();

const {
  register
} = require('../controllers/auth');

router.route('/signup')
      .post(register)
      
module.exports = router;
