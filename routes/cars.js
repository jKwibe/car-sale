
const express = require('express');
const router = express.Router();

const {indexController} = require('../controllers/cars');

router.route('/')
        .get(indexController)


module.exports = router;