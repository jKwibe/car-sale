

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const bcrypt = require('bcryptjs');
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
    select: false,
    minlength: [6, 'Password must have more than 6 chatacters']
  }

});

userSchema.plugin(timestamps);

// hash the password
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

module.exports = mongoose.model('user', userSchema);
