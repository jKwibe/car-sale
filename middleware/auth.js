
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const ErrorRes = require('../utilities/error');
const Users = require('../models/users/Users');


dotenv.config({path: '../config/config.env'})
// middle ware to protect the routes

exports.protectedRoutes = asyncHandler(async (req, res, next)=>{
  let token;
 // Check for the authorization header
 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
   token = req.headers.authorization.split(' ')[1];
 }
 // make sure that the token exists
 if(!token){
   return next(new ErrorRes('Not aurhorized', 401));
 }

 // extract payload from the jwt token
 try {
   const decoded = await jwt.verify(token, process.env.JWT_SECRET);
   console.log(decoded)
    req.user = await Users.findById(decoded.id);
    // console.log(req.user);
    next();
 } catch (error) {
     next(new ErrorRes('Not aurhorized', 401))
 }
})
