const asyncHandler = require('express-async-handler');

const Users = require('../models/Users');
const ErrorRes = require('../utilities/error')

// @desc    Register User
// @desc    POST /api/v1/my-carmax/signup
// @access  Public

exports.register = asyncHandler (async (req, res, next)=>{
  const {firstName, lastName, userName, email, phone, password} = req.body;

  const user = await Users.create({
    firstName,
    lastName,
    email,
    userName,
    phone,
    password
  });

  res.status(201).json({
    success: true,
    data: user
  })
})
