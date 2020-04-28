const asyncHandler = require('express-async-handler');

const Reviews = require('../models/users/Reviews');
const ErrorRes = require('../utilities/error');

// @desc    Create a review
// @desc    POST /api/v1/user/review
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


// @desc    Create a review
// @desc    PUT /api/v1/user/review/:id => review id
// @access  Private by User

exports.updateReview = asyncHandler(async(req, res, next)=>{

 // get the review using the find by id
 let review = await Reviews.findById(req.params.id);
 // check whether the review exists
 if(!review){
   return next(new ErrorRes('Review doesnt exist the review', 401));
 }

 // Update only if the correct user is logged inspect
 //Check whether the userid in the schema is equal to req.user
 // console.log( review.user.toString()===req.user.id);

 if (review.user.toString() !== req.user.id){
   return next(new ErrorRes(`User not authorized to make changes`, 401));
 }

 // update the review
 review = await Reviews.findByIdAndUpdate(req.params.id, req.body,{
   runValidators: true,
   new: true
 });

res.status(200).json({
  success: true,
  data: review
})

});

// @desc    Create a review
// @desc    DELETE /api/v1/user/review/:id => review id
// @access  Private by User

exports.deleteReview = asyncHandler(async(req, res, next)=>{

 // get the review using the find by id
 let review = await Reviews.findById(req.params.id);
 // check whether the review exists
 if(!review){
   return next(new ErrorRes('Review doesn\'t exist the review', 401));
 }

 // delete only if the correct user is logged inspect
 //Check whether the userid in the schema is equal to req.user

 if (review.user.toString() !== req.user.id){
   return next(new ErrorRes(`User not authorized to make changes`, 401));
 }

 // delete the review
 review.remove();

res.status(200).json({
  success: true,
  data: {}
})

});
