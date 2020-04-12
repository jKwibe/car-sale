

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const connectDatabase = async ()=>{
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
});

console.log(`[DB] Database connected`.cyan.underline);
}

module.exports = connectDatabase;
