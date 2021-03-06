const asyncHandler = require('express-async-handler');

const Users = require('../models/users/Users');
const ErrorRes = require('../utilities/error')

// @desc    Register User
// @desc    POST /api/v1/my-carmax/signup
// @access  Public

exports.register = asyncHandler (async (req, res, next)=>{
  const {firstName, lastName, username, email, phone, password} = req.body;

  const user = await Users.create({
    firstName,
    lastName,
    email,
    username,
    phone,
    password
  });

  const token = user.getJwtToken()

  res.status(201).json({
    success: true,
    message: 'signed up',
    token
  });
});

// @desc    Login User
// @desc    POST /api/v1/my-carmax/signin
// @access  Public

exports.login = asyncHandler(async (req, res, next)=>{
  const {email, password} = req.body;

  // Check whether the user or the password was entered
  if(!email || !password){
    return next (new ErrorRes(`provide the user or password`, 400));
  }

  // Find the user with the email
  const user = await Users.findOne({email}).select('password');
// console.log(user);

  // check if the user exists
  if (!user){
    return next( new ErrorRes(`provide the correct email or password`, 401));
  }

  // match the password entered with the database hashed password
  const isMatch = await user.matchPassword(password);

// console.log(isMatch);

// check if the passwords match
  if(!isMatch){
    return  next (new ErrorRes(`provide the correct email or password`, 401));
  }
  const token = user.getJwtToken()
  res.status(200).json({
    success: true,
    token
  })
});

// @desc    User page
// @desc    GET /api/v1/my-carmax/user
// @access  Private

exports.loggedUser = asyncHandler(async(req, res, next)=>{
 const user = await Users.findById(req.user.id);

 res.status(200).json({
   success: true,
   message: 'logged in',
   data: user
 })
})
