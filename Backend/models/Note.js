const mongoose = require('mongoose');
const{Schema} = mongoose;

const NotesSchema = new Schema({
    //for linking a user with its own note...any other should not see that note
    user:{
            //In sql this is like foreign key
            type : mongoose.Schema.Types.ObjectId,//konsawala user idhar link kar raha hai..basically we are storing user id ..
            ref:'user'//reference model

    },
    title :{
        type:String,
         required : true
    },
    description:{
        type:String,
        required : true,
    },
    tag:{
        type:String,
        default:"General"  
    },
    Date:{
        type:Date,
        default:Date.now
        
    }
  });

  module.exports = mongoose.model('notes',NotesSchema);