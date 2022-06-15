const mongoose = require('mongoose');

const Friendship = mongoose.model("Friendship")

exports.getFriends  = (req, res, next) => {
    if(!req.query.id){
        return res.send("No id provided")
    }

    var friendship = {
        friend: [],
        sentReq: [],
        receivedReq: []
    }

    Friendship.find({},(err, users) => {
        if(err){
            console.log(err);
        }
        else{
            users.map((u)=>{
                //if the friend request is already accepted
                if(u.status === 'accept'){
                    //store the friend's id
                    if(u.senderId === req.query.id){
                        friendship.friend.push(u.receiverId)
                    }else if(u.receiverId === req.query.id){
                        friendship.friend.push(u.senderId)
                    }
                }
                else if(u.senderId===req.query.id&&u.status==='pending'){ //if it the request is not accepted yet and the user is the sender
                    friendship.sentReq.push(u.receiverId); //store the friend's id to sentReq
                }
                else if(u.receiverId===req.query.id&&u.status==='pending'){ //the user is the one receiving the request
                    friendship.receivedReq.push(u.senderId);
                }
            })
            res.send(friendship);
        }
    })
}

//add new document to friendship collection. Status is automatically pending
exports.requestFriend = (req, res, next) => {
    const newReq = new Friendship({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        status: 'pending'
    })

    console.log("New friend request")

    newReq.save((err)=> {
        if(err){
            console.log(err)
            return res.send({success: false});
            
        }
        else{
            return res.send({success: true});
        }
    })
}

//edit status's value into 'accept'
exports.acceptFriend = (req, res, next) => {
    Friendship.findOneAndUpdate({ senderId: req.body.senderId, receiverId: req.body.receiverId}, {$set: {status: 'accept'}}, (err, friend) => {
        if (!err && friend) {
            res.send({success: true})
        }
        else {
          res.send(err, {success: false})
        }
      })
}

//delete document
exports.deleteRequest = (req, res, next) => {
    Friendship.findOneAndDelete({senderId: req.body.senderId, receiverId: req.body.receiverId}, (err, friend) => {
        if (!err && friend) {
          res.send({success: true})
        }
        else {
          res.send({success: false})
        }
      })
}