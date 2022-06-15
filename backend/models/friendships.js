const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    senderId: {type:String, required: true},
    receiverId: {type:String, required:true},
    status: {type: String, required: true},
})

mongoose.model("Friendship", FriendshipSchema); //export this  model