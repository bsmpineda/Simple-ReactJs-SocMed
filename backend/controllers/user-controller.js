const mongoose = require('mongoose');

const User = mongoose.model("User")

exports.findAllUsers = (req, res, next) => {
    User.find({},{_id:1, firstName:1, lastName:1, email:1},(err, users) => {
        if(!err) {
            res.send(users);
        }
    })
}


exports.findUserById = (req, res, next) => {
    if(!req.query.id){
        return res.send("No id provided")
    }

    User.findOne({_id: req.query.id}, (err, user) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(user);
        }
    })
}

exports.findByName = (req, res, next) => {
    if(!req.query.name){
        return res.send("No name provided")
    }

    User.find({$or: [{firstName: req.query.name}, {lastName: req.query.name}]}, (err, user) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(user);
        }
    })
}

