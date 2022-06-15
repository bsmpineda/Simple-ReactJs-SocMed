const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {type:String, required: true},
    username: {type:String, required:true},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true} 
})

mongoose.model("Post", PostSchema); //export this  model