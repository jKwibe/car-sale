
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');


const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title:{
    type: String,
    required: [true, 'Add a review title'],
    maxlength: [20, 'Should have not more than 20 characters']
  },
  description:{
    type: String,
    required: [true, 'Should have a description'],
    maxlength:[500, 'Should not be more than 500 characters']
  },
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  car:{
    type: mongoose.Schema.ObjectId,
    ref: 'car'
  }
});
reviewSchema.plugin(timestamps);


module.exports = mongoose.model('review', reviewSchema);
