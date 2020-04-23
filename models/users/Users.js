

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '../config/config.env'});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Enter your first name'],
    trim: true
  },
  lastName: {
      type: String,
      required: [true, 'Enter your last name'],
      trim: true
    },
  username: {
    type: String,
    required: [true, 'Enter your username'],
    trim: true,
    unique: [true, 'User name exists. Please try another username'],
    minlength: [5, 'Username should be over 5 characters'],
    match:[
      /^[\S]+$/,
      'Username should not have spaces'
    ]
  },
  email:{
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'Email exists'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Enter a valid email'],
    trim: true
  },
  phone:{
    type: String,
    required: [true, 'Enter a phone number']
  },
  password: {
    type: String,
    required:[true, 'Must have a password'],
    minlength: [6, 'Password must have more than 6 chatacters'],
    select: false
  }

});

userSchema.plugin(timestamps);

// hash the password
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

//method to decrypt and compare the Password
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
};

// getting the jwt token
userSchema.methods.getJwtToken = function(){
  // console.log(typeof process.env.JWT_SECRET);
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

module.exports = mongoose.model('user', userSchema);
