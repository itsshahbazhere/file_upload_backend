const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL) //by default useNewParser and topology
    .then(console.log("MongoDB connected successfully"))
    .catch(err=>{
        console.log('error during DB connetion');
        console.error(err);
    })
}