const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/Notestash"

const connectToMongo =()=>{
    //CALL-BACK FUNCTION.   
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
}
//MONGOOSE RETURNS PROMISES 
module.exports = connectToMongo;
  