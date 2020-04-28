const asyncHandler = require('express-async-handler');

const Reviews = require('../models/users/Reviews');
const ErrorRes = require('../utilities/error');

// @desc    Create a review
// @desc    POST /api/v1/user/:userid/review
// @access  Private by User

exports.createReview = asyncHandler(async(req, res, next)=>{
  // get the user-id from the req.user.id from the token
  req.body.user = req.user.id;

  // fetch information from the body
  const review = await Reviews.create(req.body);

  // add to database
  res.status(201).json({
    success: true,
    data: review
  })

});
