
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    brand: {
        type: String ,
        required:[true, 'Must enter a car brand'],
        enum: [
            'Honda',
            'Jeep',
            'Toyota',
            'Dodge',
            'GMC',
            'Ford',
            'Mini',
            'BMW'
        ]
    },
    make: {
        type: String,
        required: [true, 'Add the make of the car']
    },
    price: {
        type: Number,
        required: [true, 'Must have a price']
    },
    madeYear:{
        type: Number,
        required: true
    },
    allWD:{
        type: Boolean,
        required: [true, '']
    },
    // shop:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'shop'
    // }
});

carSchema.plugin(timestamps);

module.exports = mongoose.model('car', carSchema);